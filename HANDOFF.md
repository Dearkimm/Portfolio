# HANDOFF — Jenna's Portfolio Site

> **새 Claude가 가장 먼저 읽어야 할 문서.** 코드만 봐서는 알 수 없는 사용자 선호도 + 의사결정 히스토리 + 프로젝트 현황을 한곳에 정리.

---

## 0. Quick start

```bash
git clone https://github.com/Dearkimm/Portfolio
cd Portfolio
npm install
npm run dev   # http://localhost:3000
```

이 파일(`HANDOFF.md`)을 끝까지 읽은 뒤 작업을 이어가세요. 디자인 톤·문구 컨벤션이 trial-and-error로 정착됐기 때문에 모르고 깨면 사용자에게 다시 지적당합니다.

---

## 1. 사용자 프로필

- **김정민 / Jenna** (서울)
- **소속**: (주)밀버스 (Salesforce 파트너사) DX2본부, **BI Data Analyst 3년차**
- **사이트 목적**: 대기업 + 데이터/BI 팀 채용 담당자에게 노출할 개인 포트폴리오
- **언어**: 한국어 우선, 영어는 자연스러울 때만. 답변은 **간결하게** 선호
- **작업 스타일**:
  - 큰 변경(디자인 overhaul, 데이터 모델 변경, 다수 파일 일괄 수정)은 **"먼저 미리보기 → 동의 → commit"** 패턴
  - 한 번에 여러 항목을 묶어 검토/지시하므로 todo로 나눠 처리
  - 자기 의견과 다르면 직설적으로 말함 ("그거 구려", "이상해", "롤백" 등). 상처받지 말고 다듬으면 됨

---

## 2. 기술 스택 & 배포

| 항목 | 내용 |
|---|---|
| Framework | Next.js **16.2.4** (App Router, Turbopack) — *training data 기준 NOT the version you know. 새 API/규약 있을 수 있음 (AGENTS.md 참고)* |
| React | 19.2.4 |
| Styling | Tailwind CSS **v4** (`@theme inline` for design tokens in `globals.css`) |
| Fonts | **Manrope** (영문 display+body) / **Pretendard** (한글, `<link>` for v4 호환) / **Geist Mono** (code) |
| Code 하이라이트 | `prism-react-renderer` (vsDark theme) |
| 이미지 처리 | `next/image` (썸네일) + 일반 `<img>` (lightbox에서 원본 해상도 로딩) |
| Repo | https://github.com/Dearkimm/Portfolio (main → Vercel auto-deploy) |
| Live | https://portfolio-pi-cyan-fzcirn5lpo.vercel.app |
| 로컬 경로 | `C:\Users\milvus-jenna\Desktop\Jenna\0. Jenna 개인 폴더\개인 Blog\portfolio` |
| Node | `C:\Program Files\nodejs\node.exe` — PowerShell 세션에선 PATH 명시 필요할 수 있음 |
| Git author | GitHub noreply 이메일 (Vercel Hobby plan deploy auth 통과 위해 설정됨; 그대로 둘 것) |

---

## 3. 디자인 컨벤션 (HARD-EARNED — 위반 금지)

이 항목들은 **사용자의 명시적 지시 또는 반복 피드백**으로 굳어진 룰입니다.

1. **순백+검정 모노크롬**. **NEVER 크림/누리끼리/웜 베이지**. (초기 cream 디자인 강하게 거부당함.)
2. **Accent #0071E3은 hover/click 상태에서만**. 정적 노출 금지.
3. **한글 컨테이너에 `break-keep`** 클래스 (단어 중간에 줄바꿈 방지).
4. **단문 한국어 끝 마침표 제거**. ("마침표가 어색"). 복수 문장 narrative(Lessons body 등)는 내부 마침표 OK.
5. **`role` 필드는 사이드바에 렌더 안 됨**. 데이터엔 남아있음. 모든 프로젝트가 "BI Data Analyst"라 노이즈로 판단해 제거됨.
6. **사이드바 라벨 순서**: `PERIOD → TEAM → STACK → DATA → DOMAIN`.
7. **`stack` vs `data` 구분**: stack = 도구(Tableau, SQL, Python), data = 데이터 출처/원천 시스템(Oracle DB, ERP 전사, GA4, CRM, SalesOn, Excel 등).
8. **카드 시맨틱**: `title` = `thumbnail.label` = **고객사명** / `category` = **프로젝트명** / 이 분리는 사용자가 직접 표로 명시.
9. **summary 필드는 단일 문자열**. ` — `(em-dash)가 들어있으면 `[slug]` 페이지에서 split해서 헤드라인(큰 글씨) + lede(작고 muted)로 렌더. 데이터 모델 변경 없이 시각적 위계만 분리.
10. **편집체/미니멀** 미감 선호 (httpster.net이 레퍼런스). 박스 강조·boxing 거부 → text emphasis + subtle accent로 표현.

---

## 4. 4개 narrative section의 역할 분담 (중복 회피)

각 프로젝트의 본문은 다음 4개 축으로 정보를 분산:

| 섹션 | 역할 | 메트릭 숫자? |
|---|---|---|
| **Cards** ("주요 역할"/"핵심 역할") | 분야별 행동 (HOW) | ❌ Cards에선 행동만 |
| **KPIs** ("Key Output") | 숫자 임팩트 (WHAT) | ✅ 여기에 모음 |
| **PAR** (Problem-Action-Result) | 의사결정 스토리 (WHY-HOW-IMPACT) | ✅ Result에 등장 OK |
| **Lessons** ("Lessons Learned") | 성장 관점 (multi-sentence narrative) | 거의 없음 |

**중요**: commit `a37bbd2`에서 Cards bullet들의 메트릭(`4.8→1.3초`, `46본`, `72%`, `80개+`, `236명`, `14본`, `91.6%`, `10개`, `6본`, `3단계` 등)을 **명시적으로 제거**해서 KPIs/PAR과 중복을 줄였습니다. 동일 사실을 한 페이지에 3번 반복하지 말 것.

---

## 5. 프로젝트 데이터 모델

`src/lib/projects.ts`가 single source of truth.

### Exports

- `projects: Project[]` — 메인 프로젝트 6개 (배열 순서 유지: **쌍용 → GTF → 아식스 → 현대차 → 아모레 → 대상**)
- `pocs: PoC[]` — 홈 하단 "샘플 대시보드" 5개 항목 (굿네이버스는 사용자가 삭제 결정함)

### `Section` discriminated union (kind 필드 기준)

```
heading | text | code | image | gallery | cards | kpis | par | lessons | process
```

각 type 정의는 `src/lib/projects.ts` 상단 참고.

---

## 6. 파일 맵

```
src/app/
  layout.tsx                  // 루트 레이아웃, 헤더 네비, 폰트 로딩
  page.tsx                    // 홈 (hero + 프로젝트 그리드 + PoC 리스트)
  about/page.tsx              // About (hero, capabilities 4개, career, skills, credentials)
  contact/page.tsx            // Contact (email + LinkedIn 카드)
  projects/[slug]/page.tsx    // 프로젝트 상세 (헤더 + 사이드바 + summary + sections + next-project)
  globals.css                 // Tailwind v4 + @theme tokens

src/components/
  ProjectCard.tsx             // 홈 그리드 카드
  ProjectSections.tsx         // Section[] 렌더 (switch on kind)
  Gallery.tsx                 // 클라이언트 컴포넌트: 썸네일 그리드 + 라이트박스 (휠 줌 + 드래그 팬)
  ProcessSection.tsx          // 클라이언트 컴포넌트: 인터랙티브 step 타임라인 (현재 쌍용에서만 사용)
  CodeBlock.tsx               // VS Code Dark+ 테마 SQL 블록

src/lib/projects.ts           // Project + PoC + Section 정의 + 6개 프로젝트 데이터

public/projects/<slug>/       // 프로젝트별 대시보드 이미지 (총 28+ 파일)

scripts/trim_daesang.py       // PIL 자동 trim 스크립트 (대상 웰라이프 회색 패딩 제거용)

CLAUDE.md                     // 단순히 "@AGENTS.md" import
AGENTS.md                     // "This is NOT the Next.js you know" 경고
```

---

## 7. 프로젝트별 현황

| Slug | 한국어 | 상태 | 비고 |
|---|---|---|---|
| `ssangyong-ce` | 쌍용 C&E | ✅ 완성 | 전체 섹션 + 5장 이미지 (실데이터 3장 포함) + 인터랙티브 process timeline. period 2025.05–2026.04 |
| `global-tax-free` | Global Tax Free | ✅ 완성 | 전체 섹션 + 7장 이미지 (실데이터 3장은 사용자가 직접 사전 블러처리). category 끝이 "프로젝트"인 건 의도 |
| `asics-ecommerce` | 아식스 코리아 | ✅ 완성 | 전체 섹션 + 3장 이미지 (전부 디자인 시안) |
| `hyundai-india-dc4m` | 현대자동차 인도 | ⚠️ 부분 | 갤러리 위주 (Cards/KPIs/PAR/Lessons 없음). 6장. summary는 em-dash split 적용됨. label 짧게: "현대자동차 인도" |
| `amorepacific-osan-warroom` | 아모레퍼시픽 | 🚧 placeholder | 본문에 "(상세 내용 추후 추가)" 잔여. 사용자 선언: **"아직 내용 뭘 넣을지 못 정함, 조만간 채우겠음"** → 먼저 묻지 말고 사용자 주도로 두기 |
| `daesang-welllife` | 대상 웰라이프 | ✅ 완성 | 전체 섹션 + 7장 이미지 (Python 스크립트로 회색 패딩 자동 trim 처리됨). data에 Salesforce Data Cloud 포함 |

---

## 8. 알려진 미완 / 향후 작업

- **아모레 프로젝트 본문** — 사용자가 직접 결정 후 채울 예정. 묻지 않기.
- **5월 CLAUDE.md state document** — 사용자 메모: "5월에 상태 문서 만들어두면 됨". 지금이 5월이면 사용자가 알려줄 것.
- 그 외 알려진 TODO 없음.

---

## 9. 사용자 선호도 / 학습된 패턴

- **롤백은 미리 묻기**: 큰 디자인 변경 후 사용자가 마음에 안 들 수 있음. 옵션을 제시하고 동의 받은 뒤 진행.
- **시각 리듬 민감**: 6개 그리드에서 두 카드가 비슷한 톤이면 즉시 지적 ("아식스랑 현대차 색이 비슷해보여"). diversity 유지.
- **브랜드 팔레트 우선** thumbnail: 쌍용 red/gray, GTF orange, 아식스 deep navy/blue, 현대차 slate/gray, 아모레 pink, 대상 violet.
- **편집체/미니멀** 톤 (httpster.net 레퍼런스). boxing 강한 디자인 거부.
- **한글 카피**: 자연스러움 / 광고톤 거부 / 마케팅스러운 표현 거부. 사용자가 직접 다듬은 표현 우선.
- **Tagline**:
  - 홈 hero: "Turning data into decisions — from pipeline to dashboard."
  - About hero: "프로젝트를 안정적으로 이끄는 분석가"

---

## 10. Gotchas / 흔한 함정

- **한글 파일명을 URL에 쓰지 말 것**. 이미지는 영문 ASCII로 rename해서 `public/projects/`에 배치 (이미 모두 처리됨).
- **Windows LF/CRLF 경고**: `git commit` 시 자동 변환 경고 무시 OK.
- **Tailwind v4 `@import "tailwindcss"`** 다음에 다른 `@import` 두면 에러. Pretendard는 `<link>` 태그로 layout.tsx head에서 로드.
- **next/image** 썸네일에선 OK, **lightbox에선 plain `<img>`** 사용 (휠 줌 시 원본 해상도 로딩 위해). ESLint `@next/next/no-img-element` 룰은 `// eslint-disable-next-line` 코멘트로 덮어둠.
- **PowerShell 세션**에서 `npx` not found이면 `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH` 한 줄 prepend.
- **Vercel deploy auth**: Hobby plan에서 commit author와 Vercel team member 이메일이 일치해야 deploy. GitHub noreply 형식(`<id>+Dearkimm@users.noreply.github.com`) 으로 git config 되어있음. 변경 금지.

---

## 11. 작업 패턴 (사용자가 기대하는 흐름)

1. 사용자가 여러 항목 묶어서 지시 → todo로 분해해 처리.
2. 큰 변경은 **미리보기/제안 → 동의 → commit**.
3. **build 검증** (`npm run build`) 후 commit.
4. **commit message**는 descriptive하게 작성하고 다음 trailer 포함:
   ```
   Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
   ```
5. **commit 후 즉시 push** (사용자가 따로 요청하지 않아도 OK; 이미 패턴화됨).
6. **destructive 작업 (force push, hard reset, 대량 파일 삭제 등)은 명시 동의 받기**.

---

## 12. 최근 commit 하이라이트 (a37bbd2 기준 직전 ~12건)

```
a37bbd2  Cards de-duplication + wheel zoom in lightbox
d8bd151  Apply hiring-manager review fixes (capability tone, career period, credential)
a4df2bc  Tighten categories, drop client header repeat, add lightbox zoom
220ecd0  Refactor card semantics + summary rendering + thumbnail palette
5c343f6  Korean titles for Hyundai and Amorepacific projects
e5d295c  Apply brand color thumbnails + add Salesforce Data Cloud to Daesang data
09f7922  Drop Role from project sidebar
3890c67  Add Data sidebar section, separate sources from stack, wire LinkedIn
1fbbcbe  Refresh GTF blurred images, fix PAR line, update Hyundai project
2a84f80  Polish gallery: blur real GTF data, trim Daesang padding, fix KPI overflow
fcb3531  Add real dashboard images + galleries with security disclaimers
94084c6  Refine workflow active state, fill PoC bodies, compact PoC list
```

전체 히스토리는 `git log --oneline -30`.

---

## 13. (선택) 개인 메모리 / 대화 로그 이전

새 머신에 사용자의 자동 메모리(개인 선호 등)를 그대로 옮기고 싶다면:

| 무엇 | 어디서 | 어디로 |
|---|---|---|
| 메모리 폴더 | `C:\Users\milvus-jenna\.claude\projects\C--Users-milvus-jenna\memory\` | 새 머신 동일 경로 (또는 새 사용자 홈 기준 `~/.claude/projects/<encoded-path>/memory/`) |
| 권한 설정 | `C:\Users\milvus-jenna\.claude\settings.json` | 새 머신 `~/.claude/settings.json` |
| 대화 로그 (verbatim) | `C:\Users\milvus-jenna\.claude\projects\C--Users-milvus-jenna\*.jsonl` | 일반적으로 **이전 불필요**. 이 HANDOFF.md로 충분 |

대부분의 경우 HANDOFF.md만 새 Claude에 읽히면 매끄러운 continuation이 됩니다. JSONL을 옮기면 컨텍스트가 너무 커져 오히려 비효율.

---

**문서 버전**: 2026-04-30 / commit `a37bbd2` 시점.
이후 큰 변경 있으면 이 문서도 같이 업데이트해주세요 (특히 7번 프로젝트별 현황 + 9번 사용자 선호도 + 12번 commit 하이라이트).
