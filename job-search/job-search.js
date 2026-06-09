// scripts/job-search.js
// 사용법: node scripts/job-search.js
// 결과: scripts/job-report.html (브라우저 자동 오픈)

const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

chromium.use(StealthPlugin());

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

// -- Jenna 직무 적합도 스코어링 --
// 기준: 데이터 분석가 + BI툴(Tableau) 사용 포지션
// DE 파이프라인/인프라 구축 업무는 가산점 없음

// 대상 직무 (이 중 하나라도 있어야 통과)
const TARGET_ROLES = [
  'bi 분석가', 'bi analyst', 'bi 엔지니어', 'bi engineer',
  'analytics engineer', 'data analytics engineer',
  '데이터 분석가', 'data analyst', '비즈니스 분석가',
  '비즈니스 인텔리전스', '데이터 분석',
];

// BI 툴 (Tableau = 핵심, 나머지도 가산)
const BI_TOOLS_PRIMARY = ['tableau'];
const BI_TOOLS_SECONDARY = ['power bi', 'looker', 'superset', 'metabase', 'qlik', 'microstrategy'];

// DA 실무 키워드 (분석가가 실제로 하는 일)
const DA_WORK = [
  'dashboard', '대시보드', '시각화', 'visualization',
  'kpi', '지표', 'reporting', '보고서', '리포트',
  '인사이트', 'insight', '비즈니스 분석', 'sql',
  'a/b test', 'ab테스트', '통계', '데이터 기반',
];

// 보너스 (Jenna 경험과 겹침)
const BONUS = [
  'tableau prep', 'tabpy', 'python',
  'salesforce', 'ga4', 'google analytics', 'crm', 'erp',
  'data mart', '데이터 마트',
];

// 제외 (명확하게 다른 직군)
const EXCLUDE_KEYWORDS = [
  '신입 전용', '인턴',
  '머신러닝 엔지니어', 'ml engineer', 'ai 엔지니어',
  '프론트엔드', '백엔드', '안드로이드', 'ios',
  '인프라 엔지니어', '보안', '네트워크 엔지니어',
  'devops', 'mlops',
];

function scoreJob(title, tags = [], extra = '') {
  const text = [title, ...tags, extra].join(' ').toLowerCase();
  if (EXCLUDE_KEYWORDS.some(kw => text.includes(kw))) return 0;

  const allText = text;
  const hasBITool = [...BI_TOOLS_PRIMARY, ...BI_TOOLS_SECONDARY].some(kw => allText.includes(kw));
  const hasDAKeyword = DA_WORK.some(kw => allText.includes(kw));
  const hasBonus = BONUS.some(kw => allText.includes(kw));

  // ★★★: 데이터 분석가 / BI 분석가 - 핵심 타겟
  const tier3 = [
    '데이터 분석가', 'data analyst', '비즈니스 분석가',
    'bi analyst', 'bi 분석가', '비즈니스 인텔리전스',
  ];
  if (tier3.some(kw => allText.includes(kw))) {
    if (hasBITool || hasDAKeyword || hasBonus) return 7;
    return 4; // BI툴 미표기도 ★★★ (분석가 직함 자체가 핵심)
  }

  // ★★: Analytics Engineer / BI Engineer - 분석 역량 요구하는 엔지니어링 포지션
  const tier2 = [
    'analytics engineer', 'data analytics engineer',
    'bi 엔지니어', 'bi engineer', 'bi developer', 'bi 개발자',
  ];
  if (tier2.some(kw => allText.includes(kw))) return 3;

  // ★: TARGET_ROLES에 포함되는 기타 분석 관련 직무
  if (TARGET_ROLES.some(kw => allText.includes(kw))) return 1;

  return 0;
}

function getStars(score) {
  if (score >= 4) return '★★★'; // 데이터 분석가 / BI 분석가
  if (score >= 3) return '★★';  // Analytics Engineer / BI Engineer
  if (score >= 1) return '★';   // 기타 분석 관련
  return null;
}
function isExpired(deadlineText) {
  if (!deadlineText) return false;
  const t = deadlineText.trim();
  if (/상시|채용시|수시|미정|공고 종료시/.test(t)) return false;
  if (/마감완료|채용완료|접수마감/.test(t)) return true;
  if (/D-?DAY|D-0/i.test(t)) return false;
  const dMatch = t.match(/D-(\d+)/i);
  if (dMatch) return parseInt(dMatch[1]) < 0;

  const fullDate = t.match(/(\d{4})[.\-\/](\d{1,2})[.\-\/](\d{1,2})/);
  if (fullDate) {
    const d = new Date(+fullDate[1], +fullDate[2] - 1, +fullDate[3]);
    return d < TODAY;
  }
  const shortDate = t.match(/(\d{1,2})[.\-\/](\d{2})/);
  if (shortDate) {
    let d = new Date(TODAY.getFullYear(), +shortDate[1] - 1, +shortDate[2]);
    if (d < TODAY) d.setFullYear(TODAY.getFullYear() + 1);
    return d < TODAY;
  }
  return false;
}

// ── 브라우저 공통 설정 ─────────────────────────────────────────────────────
async function launchBrowser() {
  // 설치된 Chrome 우선, 없으면 Playwright Chromium 사용
  const options = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--lang=ko-KR',
    ],
  };
  try {
    return await chromium.launch({ ...options, channel: 'chrome' });
  } catch {
    return await chromium.launch(options);
  }
}

async function newPage(browser) {
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ko-KR',
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8' },
  });
  return ctx.newPage();
}

async function safeFetch(page, url, waitMs = 3000) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(waitMs);
  // 스크롤로 lazy-load 트리거
  await page.evaluate(async () => {
    for (let i = 0; i < 4; i++) {
      window.scrollBy(0, window.innerHeight * 0.8);
      await new Promise(r => setTimeout(r, 600));
    }
  });
  await page.waitForTimeout(1000);
}

function normalizeKey(j) {
  if (j.link) {
    // 사람인 relay URL → rec_idx만 추출
    const recIdx = j.link.match(/rec_idx=(\d+)/);
    if (recIdx) return `saramin_${recIdx[1]}`;
    // 잡코리아, 기타 → 쿼리 제거
    return j.link.replace(/[?#].*/, '').replace(/\/$/, '');
  }
  const co = j.company.replace(/\(주\)|\(유\)|주식회사|㈜/g, '').trim().toLowerCase().slice(0, 12);
  const ti = j.title.replace(/\[.+?\]/g, '').trim().toLowerCase().slice(0, 20);
  return `${co}__${ti}`;
}

function dedup(jobs) {
  const seen = new Set();
  return jobs.filter(j => {
    const key = normalizeKey(j);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 전체 통합 dedup (소스 간 중복 제거)
function dedupCross(jobs) {
  const seen = new Set();
  return jobs.filter(j => {
    // 괄호·법인 표기 제거 후 앞 8자 + 직무 앞 18자로 크로스소스 dedup
    const co = j.company
      .replace(/\(주\)|\(유\)|주식회사|㈜|\(.+?\)|\[.+?\]/g, '')
      .trim().toLowerCase().slice(0, 8);
    const ti = j.title.replace(/\[.+?\]/g, '').trim().toLowerCase().slice(0, 18);
    const key = `${co}__${ti}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── 원티드 ─────────────────────────────────────────────────────────────────
async function scrapeWanted(browser) {
  const page = await newPage(browser);
  const results = [];
  const urls = [
    'https://www.wanted.co.kr/wdlist/518/1022',
    'https://www.wanted.co.kr/search?query=Analytics+Engineer&tab=position',
    'https://www.wanted.co.kr/search?query=Tableau+%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B6%84%EC%84%9D%EA%B0%80&tab=position',
  ];

  for (const url of urls) {
    try {
      await safeFetch(page, url);

      const cards = await page.evaluate(() => {
        // 원티드는 Next.js — 카드 컨테이너를 다양하게 시도
        const found = (sels) => {
          for (const s of sels) {
            const els = document.querySelectorAll(s);
            if (els.length > 0) return Array.from(els);
          }
          return [];
        };
        const items = found([
          'li[class*="JobCard"]',
          'div[class*="JobCard"]',
          '[class*="job-card"]',
          '[class*="position-list"] li',
          '[class*="job_list"] > li',
          'li[class*="List_item"]',
          'ul > li:has(a[href*="/wd/"])',
        ]);

        return items.map(card => {
          const linkEl = card.querySelector('a[href*="/wd/"]');
          const texts = Array.from(card.querySelectorAll('span, strong, p, h2, h3'))
            .map(el => el.textContent.trim()).filter(Boolean);
          return {
            title: texts[0] || '',
            company: texts[1] || '',
            location: texts[2] || '',
            deadline: texts.find(t => /마감|D-|상시/.test(t)) || '',
            link: linkEl ? 'https://www.wanted.co.kr' + linkEl.getAttribute('href') : '',
            tags: texts.slice(3, 9),
          };
        }).filter(j => j.title && j.link);
      });

      results.push(...cards);
    } catch (e) {
      console.error(`원티드[${url.split('?')[0].split('/').pop()}] 오류: ${e.message.split('\n')[0]}`);
    }
  }

  await page.context().close();
  return dedup(results);
}

// ── 사람인 ─────────────────────────────────────────────────────────────────
async function scrapeSaramin(browser) {
  const page = await newPage(browser);
  const results = [];
  const terms = ['BI 엔지니어', 'Analytics Engineer', 'Tableau 데이터분석가'];

  for (const term of terms) {
    const url = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(term)}&recruitPage=1&recruitSort=relation&recruitPageCount=40`;
    try {
      await safeFetch(page, url);

      const cards = await page.evaluate(() => {
        const items = document.querySelectorAll(
          '.item_recruit, [class*="item_recruit"], .list_item_wrap > li, [class*="recruit-item"]'
        );
        return Array.from(items).map(item => {
          const titleEl = item.querySelector('.job_tit a, [class*="job_tit"] a, .tit a');
          const companyEl = item.querySelector('.corp_name a, [class*="corp_name"] a');
          const deadlineEl = item.querySelector('.job_date .date, [class*="job_date"] .date, .date');
          const condEl = item.querySelector('.job_condition, [class*="job_cond"]');
          const tagEls = item.querySelectorAll('.job_sector span, .sector span, [class*="job_tag"] span');
          // 날짜/숫자 패턴이 아닌 텍스트만 태그로 사용
          const tags = Array.from(tagEls)
            .map(t => t.textContent.trim())
            .filter(t => t && !/^\d|수정일|등록일|마감/.test(t));

          return {
            title: titleEl?.textContent?.trim() || '',
            company: companyEl?.textContent?.trim() || '',
            location: condEl?.textContent?.replace(/\s+/g, ' ').trim() || '',
            deadline: deadlineEl?.textContent?.trim() || '',
            link: titleEl?.href || (titleEl ? 'https://www.saramin.co.kr' + titleEl.getAttribute('href') : ''),
            tags,
          };
        }).filter(j => j.title && j.company);
      });

      results.push(...cards);
    } catch (e) {
      console.error(`사람인[${term}] 오류: ${e.message.split('\n')[0]}`);
    }
  }

  await page.context().close();
  return dedup(results);
}

// ── 잡코리아 ───────────────────────────────────────────────────────────────
async function scrapeJobkorea(browser) {
  const page = await newPage(browser);
  const results = [];
  const terms = ['BI 엔지니어', 'Analytics Engineer', 'Tableau 데이터분석'];

  for (const term of terms) {
    const url = `https://www.jobkorea.co.kr/Search/RecruitList?stext=${encodeURIComponent(term)}&Page_No=1&ord=1`;
    try {
      await safeFetch(page, url, 4000);

      const cards = await page.evaluate(() => {
        const items = document.querySelectorAll('li.list-post');
        if (items.length === 0) return [{ _debug: 'li.list-post not found' }];

        return Array.from(items).map(item => {
          const companyEl = item.querySelector('.post-list-corp a.name');
          const titleEl = item.querySelector('.post-list-info a.title');
          // 마감일: .date 또는 조건 텍스트에서 날짜 패턴 추출
          const condEl = item.querySelector('.post-list-recruit, .recruit-info-detail, .post-list-info-etc');
          const condText = condEl?.textContent?.replace(/\s+/g, ' ').trim() || '';
          const dateMatch = condText.match(/~?(\d{2}\/\d{2}|\d{4}\.\d{2}\.\d{2}|\d{2}\.\d{2})[^\d]*(마감|까지|~)?|상시채용|채용시/);
          const tagEls = item.querySelectorAll('.chip-information-piece, [class*="chip"], .post-list-info-etc span');

          return {
            title: titleEl?.getAttribute('title') || titleEl?.textContent?.trim() || '',
            company: companyEl?.getAttribute('title') || companyEl?.textContent?.trim() || '',
            deadline: dateMatch ? dateMatch[0].trim() : '상시채용',
            link: titleEl?.href || (titleEl?.getAttribute('href')
              ? 'https://www.jobkorea.co.kr' + titleEl.getAttribute('href')
              : ''),
            tags: Array.from(tagEls).map(t => t.textContent.trim()).filter(t => t && t.length < 30).slice(0, 8),
          };
        }).filter(j => j.title && j.company);
      });

      if (cards.length === 1 && cards[0]._debug) {
        console.error(`잡코리아[${term}] 디버그: ${cards[0]._debug}`);
        continue;
      }

      results.push(...cards);
    } catch (e) {
      console.error(`잡코리아[${term}] 오류: ${e.message.split('\n')[0]}`);
    }
  }

  await page.context().close();
  return dedup(results);
}

// ── 리멤버 (직접 API 호출, Playwright 불필요) ───────────────────────────────
async function scrapeRemember() {
  // 데이터 분석가 카테고리 ID: 345
  // sort=starts_at_desc → 최신순, 2페이지 × 50건 = 100건
  async function fetchPage(page) {
    return new Promise((resolve) => {
      const body = JSON.stringify({
        sort: 'starts_at_desc',
        search: { include_applied_job_posting: false, job_category_ids: [345] },
        page, per: 50,
        meta: { device_uid: 'aa112233-bb44-cc55-dd66-ee7788990011' },
      });
      const options = {
        hostname: 'career-api.rememberapp.co.kr',
        path: '/job_postings/search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Referer': 'https://career.rememberapp.co.kr/',
          'Content-Length': Buffer.byteLength(body),
        },
      };
      const req = https.request(options, res => {
        let data = '';
        res.on('data', c => (data += c));
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch { resolve(null); }
        });
      });
      req.on('error', () => resolve(null));
      req.write(body);
      req.end();
    });
  }

  const results = [];
  for (const pg of [1, 2]) {
    const r = await fetchPage(pg);
    const items = r?.data || r?.job_postings || [];
    for (const j of items) {
      const company = j.organization?.name || j.company?.name || '';
      const title = j.title || '';
      if (!title || !company) continue;

      // ISO deadline → YYYY.MM.DD (isExpired 함수 호환)
      let deadline = '상시채용';
      if (j.ends_at) {
        const d = new Date(j.ends_at);
        if (!isNaN(d)) {
          deadline = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
        }
      }

      results.push({
        title,
        company,
        deadline,
        link: `https://career.rememberapp.co.kr/job/postings/${j.id}`,
        tags: (j.job_categories || []).map(c => c.level2).filter(Boolean),
        location: (j.addresses || []).map(a => a.city || a.district).filter(Boolean).join(' ') || '',
      });
    }
    if (items.length < 50) break; // 마지막 페이지면 중단
  }

  return dedup(results);
}

// ── HTML 출력 ─────────────────────────────────────────────────────────────
function cardHTML(j) {
  const deadlineClass = /상시|채용시|수시|미정/.test(j.deadline || '') ? 'deadline-always' : 'deadline-date';
  const deadline = j.deadline || '상시채용';
  const tags = j.tags?.length
    ? `<div class="tags">${j.tags.slice(0, 6).map(t => `<span class="tag">${t}</span>`).join('')}</div>`
    : '';
  const loc = j.location ? `<span>📍 ${j.location}</span>` : '';
  const link = j.link ? `<a class="link-btn" href="${j.link}" target="_blank">공고 보기 →</a>` : '';
  return `<div class="card">
    <div class="card-header">
      <div>
        <div class="company">${j.company}</div>
        <div class="job-title">${j.title}</div>
      </div>
      <span class="source-badge">${j.source}</span>
    </div>
    <div class="meta">${loc}<span class="deadline-badge ${deadlineClass}">${deadline}</span></div>
    ${tags}${link}
  </div>`;
}

function sectionHTML(jobs, stars, label) {
  const body = jobs.length ? jobs.map(cardHTML).join('\n') : '<div class="empty">해당 없음</div>';
  const cnt = jobs.length ? ` — ${jobs.length}건` : '';
  return `<section class="stars-${stars}">
  <div class="section-title">${'★'.repeat(stars)} ${label}${cnt}</div>
  ${body}
</section>`;
}

function generateHTML(t3, t2, t1, w, s, jk, rm, scored, dateStr) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>잡 리포트 — ${dateStr}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Apple SD Gothic Neo', sans-serif; background: #f4f6fb; color: #1e1e2e; padding: 32px 16px; }
    header { max-width: 820px; margin: 0 auto 32px; }
    header h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 6px; }
    header p { font-size: 0.85rem; color: #666; }
    .summary-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
    .badge { background: #fff; border: 1px solid #e0e0e0; border-radius: 20px; padding: 4px 14px; font-size: 0.8rem; color: #444; }
    .badge strong { color: #3b5bdb; }
    section { max-width: 820px; margin: 0 auto 28px; }
    .section-title { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #e9ecef; }
    .stars-3 .section-title { border-color: #f59f00; color: #f59f00; }
    .stars-2 .section-title { border-color: #3b5bdb; color: #3b5bdb; }
    .stars-1 .section-title { border-color: #868e96; color: #868e96; }
    .empty { font-size: 0.85rem; color: #aaa; padding: 12px 0; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e9ecef; padding: 18px 20px; margin-bottom: 12px; transition: box-shadow 0.15s; }
    .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .source-badge { font-size: 0.7rem; background: #eef2ff; color: #3b5bdb; border-radius: 4px; padding: 2px 7px; white-space: nowrap; flex-shrink: 0; }
    .company { font-size: 0.8rem; color: #888; margin-bottom: 3px; }
    .job-title { font-size: 1rem; font-weight: 600; }
    .meta { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; font-size: 0.78rem; color: #666; align-items: center; }
    .deadline-badge { padding: 2px 8px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
    .deadline-always { background: #ebfbee; color: #2f9e44; }
    .deadline-date { background: #fff3bf; color: #e67700; }
    .tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { background: #f1f3f5; color: #495057; border-radius: 4px; padding: 2px 8px; font-size: 0.73rem; }
    .link-btn { display: inline-block; margin-top: 12px; font-size: 0.78rem; color: #3b5bdb; text-decoration: none; border: 1px solid #3b5bdb; border-radius: 6px; padding: 4px 12px; transition: background 0.15s; }
    .link-btn:hover { background: #3b5bdb; color: #fff; }
    footer { max-width: 820px; margin: 0 auto; font-size: 0.75rem; color: #aaa; text-align: right; padding-top: 16px; border-top: 1px solid #e9ecef; }
  </style>
</head>
<body>
<header>
  <h1>잡 리포트</h1>
  <p>${dateStr} 기준</p>
  <div class="summary-bar">
    <span class="badge">원티드 <strong>${w.length}</strong>건</span>
    <span class="badge">사람인 <strong>${s.length}</strong>건</span>
    <span class="badge">잡코리아 <strong>${jk.length}</strong>건</span>
    <span class="badge">리멤버 <strong>${rm.length}</strong>건</span>
    <span class="badge">유효 <strong>${scored.length}</strong>건</span>
  </div>
</header>
${sectionHTML(t3, 3, '강력 추천')}
${sectionHTML(t2, 2, '추천')}
${sectionHTML(t1, 1, '참고')}
<footer>생성: ${new Date().toLocaleString('ko-KR')}</footer>
</body>
</html>`;
}

// ── 메인 ───────────────────────────────────────────────────────────────────
(async () => {
  const dateStr = TODAY.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  console.log(`\n잡 검색 시작 — ${dateStr}\n`);

  const browser = await launchBrowser();

  const [w, s, jk, rm] = await Promise.all([
    scrapeWanted(browser).then(r => { console.log(`원티드: ${r.length}건 수집`); return r; }),
    scrapeSaramin(browser).then(r => { console.log(`사람인: ${r.length}건 수집`); return r; }),
    scrapeJobkorea(browser).then(r => { console.log(`잡코리아: ${r.length}건 수집`); return r; }),
    scrapeRemember().then(r => { console.log(`리멤버: ${r.length}건 수집`); return r; }),
  ]);

  await browser.close();

  const all = dedupCross([
    ...w.map(j => ({ ...j, source: '원티드' })),
    ...s.map(j => ({ ...j, source: '사람인' })),
    ...jk.map(j => ({ ...j, source: '잡코리아' })),
    ...rm.map(j => ({ ...j, source: '리멤버' })),
  ]).filter(j => !isExpired(j.deadline));

  const scored = all
    .map(j => ({ ...j, score: scoreJob(j.title, j.tags) }))
    .filter(j => getStars(j.score) !== null)
    .sort((a, b) => b.score - a.score);

  const t3 = scored.filter(j => getStars(j.score) === '★★★');
  const t2 = scored.filter(j => getStars(j.score) === '★★');
  const t1 = scored.filter(j => getStars(j.score) === '★');

  const html = generateHTML(t3, t2, t1, w, s, jk, rm, scored, dateStr);
  const out = path.join(__dirname, 'job-report.html');
  fs.writeFileSync(out, html, 'utf-8');
  console.log(`\n저장: ${out}`);
  console.log(`★★★ ${t3.length}건 / ★★ ${t2.length}건 / ★ ${t1.length}건\n`);

  if (!process.env.CI) exec(`start "" "${out}"`);
})();
