export type GalleryImage = {
  src: string;
  alt?: string;
  caption?: string;
  blur?: boolean;
};

export type Section =
  | { kind: "heading"; text: string; eyebrow?: string }
  | { kind: "text"; body: string }
  | { kind: "code"; language?: string; filename?: string; body: string }
  | { kind: "image"; src: string; alt?: string; caption?: string }
  | { kind: "gallery"; eyebrow?: string; title?: string; note?: string; images: GalleryImage[] }
  | {
      kind: "cards";
      eyebrow?: string;
      title?: string;
      items: { number?: string; title: string; accent?: boolean; bullets: string[] }[];
    }
  | {
      kind: "kpis";
      label?: string;
      items: { value: string; description: string }[];
    }
  | {
      kind: "par";
      rows: { problem: string; action: string; result: string }[];
    }
  | {
      kind: "lessons";
      items: { title: string; body: string }[];
    }
  | {
      kind: "sequence-diagram";
      eyebrow?: string;
      title?: string;
      note?: string;
      participants: { id: string; label: string; sublabel?: string; color?: string }[];
      messages: { num: number; from: string; to: string; label: string; dashed?: boolean }[];
      groupBox?: { label: string; fromNum: number; toNum: number; participantId: string };
    }
  | {
      kind: "process";
      eyebrow?: string;
      title?: string;
      intro?: string;
      startLabel?: string;
      endLabel?: string;
      steps: {
        number: string;
        stage: string;
        detail?: {
          title?: string;
          bullets: string[];
        };
      }[];
    };

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  period: string;
  year: string;
  role: string;
  team: string;
  stack: string[];
  data: string[];
  tags: string[];
  domain?: string[];
  summary: string;
  cover?: { src: string; alt?: string };
  thumbnail: {
    bg: string;
    fg: string;
    label: string;
  };
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: "worldvision-agenticanalytics",
    title: "월드비전 코리아",
    client: "월드비전 코리아",
    category: "월드비전 에이전트 데모",
    period: "2026.05 — 2026.06",
    year: "2026",
    role: "BI Data Analyst",
    team: "개인",
    stack: ["Python", "Flask", "Cloud Run", "BigQuery", "Gemini API"],
    data: ["HR/F2F 샘플 데이터"],
    tags: ["NGO", "AI 에이전트", "NL→SQL", "BigQuery"],
    domain: ["NGO 인사·후원 데이터 분석", "생성형 AI · 데이터 에이전트"],
    summary:
      "월드비전 HR·F2F 데이터를 자연어로 분석하는 AI 에이전트 개인 데모 — Gemini API와 BigQuery를 연결해 자연어→SQL 자동화와 할루시네이션 방지 체계를 직접 설계·구현",
    thumbnail: {
      bg: "linear-gradient(135deg, #1A73E8 0%, #12B3A8 100%)",
      fg: "#ffffff",
      label: "월드비전 코리아",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Project Overview",
        title: "핵심 역할",
        items: [
          {
            number: "01",
            title: "분석 파이프라인",
            bullets: [
              "자연어 질문 → 도메인 판별 → SQL 생성 → BigQuery 실행 → 분석 보고서까지 전체 처리 흐름 설계",
              "데이터 스키마와 업무 용어집을 프롬프트로 구조화하여 내부 용어 기반 분석 지원",
              "마크다운 리포트·차트·PDF 내보내기를 한 화면에서 확인할 수 있도록 결과 표시 구조 구성",
            ],
          },
          {
            number: "02",
            title: "프롬프트 설계",
            accent: true,
            bullets: [
              "테이블 스키마 주입 · 카테고리 실제 값 자동 수집 · 0건 자기교정, 3단계 방어 구조로 SQL 할루시네이션 방지",
              "카테고리성 컬럼의 실제 값을 SELECT DISTINCT로 자동 수집하여 프롬프트에 반영 — WHERE 조건 값 불일치 예방",
              "SQL 결과 0건 반환 시 해당 컬럼의 실제 값을 재조회하고 SQL을 자동 재생성하는 자기교정 루프 구현",
            ],
          },
          {
            number: "03",
            title: "서비스 구조",
            bullets: [
              "질문 키워드 기반으로 HR 인사·급여 / F2F 후원·캠페인 도메인을 자동 라우팅",
              "환경변수 하나로 배포용·테스트 서비스를 분리 운영하는 안전한 실험 환경 구성",
            ],
          },
        ],
      },
      {
        kind: "sequence-diagram",
        eyebrow: "System Architecture",
        title: "AI 에이전트 처리 플로우",
        note: "※ 자연어 질문부터 분석 보고서 출력까지 서비스 간 API 호출 흐름",
        participants: [
          { id: "UI", label: "웹 UI", sublabel: "index.html" },
          { id: "CR", label: "Cloud Run", sublabel: "Backend API", color: "#1A73E8" },
          { id: "Meta", label: "GCP 외부 API", sublabel: "Agent / Schema", color: "#12B3A8" },
          { id: "Gemini", label: "Gemini API", sublabel: "Gemini 3.5 Flash", color: "#1A73E8" },
          { id: "BQ", label: "BigQuery", color: "#12B3A8" },
        ],
        groupBox: { label: "백엔드 내부 처리", fromNum: 2, toNum: 3, participantId: "CR" },
        messages: [
          { num: 1, from: "UI", to: "CR", label: "분석 질문 전송 (POST /chat)" },
          { num: 2, from: "CR", to: "CR", label: "도메인 자동 판별 (detect_domain)" },
          { num: 3, from: "CR", to: "CR", label: "에이전트 설정 로드" },
          { num: 4, from: "CR", to: "Meta", label: "분석 가이드라인 · 스키마 조회 요청" },
          { num: 5, from: "Meta", to: "CR", label: "시스템 프롬프트 + 스키마 정보 반환", dashed: true },
          { num: 6, from: "CR", to: "Gemini", label: "SQL 생성 요청 (스키마 + 질문)" },
          { num: 7, from: "Gemini", to: "CR", label: "최적화된 SQL 쿼리 반환", dashed: true },
          { num: 8, from: "CR", to: "BQ", label: "SQL 쿼리 실행 요청" },
          { num: 9, from: "BQ", to: "CR", label: "쿼리 결과 데이터(JSON) 반환", dashed: true },
          { num: 10, from: "CR", to: "Gemini", label: "분석 보고서 · 차트 생성 요청" },
          { num: 11, from: "Gemini", to: "CR", label: "마크다운 리포트 + 시각화 JSON 반환", dashed: true },
          { num: 12, from: "CR", to: "UI", label: "최종 응답 전송 (분석결과 + SQL + 차트)" },
          { num: 13, from: "UI", to: "UI", label: "결과 렌더링 및 PDF 내보내기" },
        ],
      },
      {
        kind: "kpis",
        label: "Key Output",
        items: [
          { value: "파일럿 수주", description: "AI 에이전트 데모 제안을 통해 후속 파일럿 프로젝트 선정" },
          { value: "3단계 방어", description: "스키마 주입 + 카테고리 실제 값 자동 수집 + 0건 반환 시 자기교정으로 SQL 할루시네이션 방지" },
          { value: "1h 캐싱", description: "스키마·카테고리 값 인메모리 캐싱으로 반복 BQ 메타 조회 제거" },
        ],
      },
      {
        kind: "par",
        rows: [
          {
            problem:
              "LLM이 실제 DB에 없는 컬럼명·값을 추측하여 SQL 생성 — 예: '재직자 현황 알려줘' 질문 시 존재하지 않는 컬럼명 status, 값 'active'를 사용",
            action:
              "BigQuery 메타데이터(테이블 스키마 + 카테고리성 컬럼의 실제 값)를 런타임에 SELECT DISTINCT로 자동 조회하여 프롬프트에 주입하는 방어 구조 설계",
            result:
              "실제 컬럼명 '재직상태'와 실제 값 '재직'을 정확히 사용하는 SQL 생성으로 컬럼·값 할루시네이션 방지",
          },
          {
            problem:
              "SQL 실행은 성공하지만 WHERE 조건 값이 실제 DB 값과 미세하게 불일치하여 결과 0건 반환 (예: '미지급 현황' → WHERE 수당유형 = '미지급'으로 생성되지만 실제 값은 '미지급수당')",
            action:
              "0건 반환 시 해당 컬럼의 실제 DISTINCT 값을 재조회하고, 실제 값 목록을 포함하여 Gemini에 SQL 재생성 요청하는 자기교정 루프 구현",
            result:
              "사용자가 재질문 없이도 시스템이 올바른 값('미지급수당')을 자동으로 찾아 정확한 결과 반환",
          },
          {
            problem:
              "현업 담당자가 사용하는 내부 용어와 실제 DB 컬럼·값 명칭 간 차이로 SQL 변환 오류 가능 (예: '부서별 인원' → 실제 컬럼명은 '부서코드'가 아닌 '부서명')",
            action:
              "도메인별 업무 용어·분석 가이드라인·데이터 스키마를 시스템 프롬프트로 구조화하여 AI가 내부 용어 체계를 참조하도록 설계",
            result:
              "SQL을 모르는 현업 담당자가 내부 용어 그대로 질문해도 정확한 SQL 변환 및 분석 결과 제공",
          },
        ],
      },
      {
        kind: "lessons",
        items: [
          {
            title: "프롬프트 설계와 도메인 지식",
            body: "동일한 AI 모델이라도 스키마 구조, 카테고리 값, 도메인 가이드라인을 어떻게 제공하느냐에 따라 결과가 크게 달라진다는 것을 경험했습니다. 도메인 지식을 바탕으로 AI가 이해할 수 있는 형태로 정보를 구조화하는 과정의 중요성을 체감했으며, 더 다양한 플랫폼과 비즈니스 도메인에 대한 이해가 필요함을 배웠습니다.",
          },
          {
            title: "에이전트 파이프라인 구현 경험",
            body: "자연어 질의부터 SQL 생성, BigQuery 실행, 분석 보고서 출력까지 이어지는 AI 기반 파이프라인을 직접 설계하고 구현했습니다. 데모 환경이었지만 AI 오케스트레이션의 전체 흐름을 경험하며, 각 단계를 연결하고 제어하는 방식에 대한 이해를 넓힐 수 있었습니다.",
          },
        ],
      },
      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "서비스 화면",
        note: "※ 샘플 데이터를 기반으로 구축한 개인 데모 프로젝트입니다.",
        images: [
          {
            src: "/projects/worldvision-agenticanalytics/screen-main.png",
            alt: "홈 화면 — 분석 시작 페이지",
            caption: "홈 화면 — 분석 시작 페이지",
          },
          {
            src: "/projects/worldvision-agenticanalytics/screen-query.png",
            alt: "질문 입력 화면 — 자연어 질문 입력",
            caption: "질문 입력 화면 — 자연어 질문 입력",
          },
          {
            src: "/projects/worldvision-agenticanalytics/screen-answer.png",
            alt: "분석 결과 화면 — 차트 및 보고서 출력",
            caption: "분석 결과 화면 — 차트 및 보고서 출력",
          },
        ],
      },
    ],
  },
  {
    slug: "ssangyong-ce",
    title: "쌍용 C&E",
    client: "쌍용 C&E",
    category: "차세대 ERP 시스템 구축",
    period: "2025.05 — 2026.04",
    year: "2025",
    role: "BI Data Analyst",
    team: "5명",
    stack: ["Tableau", "Oracle SQL", "TabPy"],
    data: ["Oracle Database", "ERP 전사"],
    tags: ["ERP 운영 데이터", "BI 시스템 구축", "운영 자동화"],
    domain: ["ERP 운영 데이터", "BI 시스템 구축·운영 자동화"],
    summary:
      "Java 기반 ERP 시스템을 차세대 BI 환경으로 전환한 프로젝트 — In-House·SAP 통합 마트 설계와 배치 자동화 구축, 재무·영업·생산·인사 등 전사 부서별 대시보드 개발",
    thumbnail: {
      bg: "linear-gradient(135deg, #1f2937 0%, #ef4444 100%)",
      fg: "#ffffff",
      label: "쌍용 C&E",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Project Overview",
        title: "수행 영역",
        items: [
          {
            number: "01",
            title: "기획",
            bullets: [
              "기존 108개 화면을 BI 관점에서 재정의하고 부서별 화면 구조 설계",
              "인사·영업·생산 등 각 현업 부서와의 개별 인터뷰로 요구사항 및 기획 방향 확정",
              "요구사항 불명확·변경 시 구현 가능 범위 제시 및 대안 제안 방식으로 조율",
              "Figma·PPT 등 시각 자료를 활용하여 요구사항 이해도 개선",
            ],
          },
          {
            number: "02",
            title: "데이터",
            accent: true,
            bullets: [
              "운영 DB View 구조를 분석 전용 계층으로 재설계, PK·인덱스 최적화",
              "집계 테이블 중심 아키텍처로 전환하여 대용량 데이터 성능 개선",
              "배치 프로시저 설계·개발 + TabPy 연계 비정기 재적재 기능 구현",
              "PK 오류·데이터 적재 실패 등 주요 이슈 로그 분석 및 수정",
            ],
          },
          {
            number: "03",
            title: "대시보드 개발",
            bullets: [
              "재무·영업·생산·인사 등 주요 도메인 영역 화면 설계 및 개발",
              "메인 대시보드 로딩 최적화 — 불필요한 동작 제거, 계산 로직 튜닝, CONTEXT 필터",
              "내부 화면을 임베딩 방식으로 분리하여 필요 시점에만 로드되도록 변경",
              "Tableau 그룹 기반 런타임 권한 체계 설계",
            ],
          },
          {
            number: "04",
            title: "검증 및 커뮤니케이션",
            bullets: [
              "IN-HOUSE 쿼리 → 1차 가공 쿼리 → 적재 테이블 → 대시보드 전 단계 수치 비교 기반 데이터 정합성 검증",
              "매일 배치 프로시저 실행 로그 확인으로 적재 오류 조기 감지",
              "반복 QA 및 피드백 실시간 반영으로 일정 지연 최소화",
              "임원 주간 보고 및 부서 간 요구사항 커뮤니케이션 참여",
            ],
          },
        ],
      },
      {
        kind: "process",
        eyebrow: "Workflow",
        title: "End to End 수행 과정",
        intro:
          "BI 시스템에서 사용하는 데이터는 인하우스(오라클)에서 태블로 데이터 마트로 1차 적재를 진행한 후, 태블로 서버에서 2차 적재를 합니다.",
        startLabel: "착수",
        endLabel: "안정화",
        steps: [
          {
            number: "01",
            stage: "요구사항 수집 및 분석",
            detail: {
              title: "인터뷰",
              bullets: ["모듈별 현업 인터뷰 계획 및 설문서 작성"],
            },
          },
          {
            number: "02",
            stage: "데이터 마트 설계 및 구축",
            detail: {
              title: "설계 및 구축",
              bullets: [
                "분석 목적에 맞춘 데이터 마트 명세서 작성 (PK·인덱스 설계)",
                "명세서 기반 CRUD 스크립트로 테이블 생성",
              ],
            },
          },
          {
            number: "03",
            stage: "대용량 배치 프로세스 개발",
            detail: {
              title: "배치 프로세스 개발",
              bullets: [
                "데이터 적재용 프로시저 개발 (월/연/FULL)",
                "오라클 스케줄러를 통한 일/월/Hourly 배치 구성",
              ],
            },
          },
          {
            number: "04",
            stage: "대시보드 개발",
            detail: {
              title: "태블로 대시보드 개발",
              bullets: [
                "단일 MAIN 대시보드 내 약 150개 전사 대시보드 임베딩 구조 설계",
                "Lv1~Lv4 메뉴 네비게이션 바 구성으로 부서별 화면 분리 및 권한 제어",
              ],
            },
          },
          {
            number: "05",
            stage: "피드백 및 고도화",
            detail: {
              title: "사용자 검증 및 이슈 관리",
              bullets: [
                "오픈 전 현업 및 IT팀 대상 사용자 테스트 진행",
                "BI 이슈·요청사항 공유 시트 기반 피드백 반영",
              ],
            },
          },
        ],
      },
      {
        kind: "kpis",
        label: "Key Output",
        items: [
          { value: "46본", description: "주요 도메인 화면 직접 설계·개발" },
          { value: "72% 단축", description: "메인 대시보드 로딩 속도 4.8초 → 1.3초" },
          { value: "80개+", description: "배치 프로시저 구현으로 데이터 자동화" },
          { value: "236명", description: "Tableau 그룹 기반 권한 설계로 구조 단순화" },
        ],
      },

      {
        kind: "code",
        language: "sql",
        filename: "export_sales_unified.sql",
        body: `-- SAP 전환(2025-11) 전후 데이터를 단일 마트로 통합 적재
-- P_TARGET_DT: Oracle Scheduler가 호출하는 프로시저 입력 파라미터 (월별/일별 적재)
-- 전환 시점 기준으로 In-House · SAP Oracle 테이블을 UNION ALL로 결합

SELECT A.SALE_DT, A.SITE_NM, A.PROD_NM,
       A.SALE_QTY, A.SALE_AMT, A.RCPT_AMT,
       -- SAP 전환 후 환차손익은 분개 테이블에서 별도 집계
       NVL(A.FX_GAIN_AMT, 0) + NVL(A.FX_LOSS_AMT, 0) AS FX_AMT
FROM (

  -- ① 기존 ERP 데이터 (~ 2025-10)
  SELECT T2.SALE_DT, T1.SITE_NM, T1.PROD_NM,
         T2.SALE_QTY, T2.SALE_AMT,
         NVL(T4.RCPT_AMT, 0) AS RCPT_AMT,
         0 AS FX_GAIN_AMT, 0 AS FX_LOSS_AMT
  FROM   ERP.SALES_REQ T1
         INNER JOIN ERP.SALES_DETAIL T2
                 ON T1.REQ_NO = T2.REQ_NO
                AND T2.SALE_DT < '20251101'
                AND T2.SALE_DT BETWEEN P_TARGET_DT||'01' AND P_TARGET_DT||'31'
         LEFT JOIN ERP.RECEIPT T4 ON T1.OFFER_NO = T4.OFFER_NO

  UNION ALL

  -- ② SAP 전환 데이터 (2025-11 ~)
  --    JOIN 키 변경: REQ_NO → SAP_REQ_NO
  --    환차손익: SAP 분개 테이블(T5)에서 계정코드 기준 별도 집계
  SELECT T2.SALE_DT, T1.SITE_NM, T1.PROD_NM,
         T2.SALE_QTY, T2.SALE_AMT,
         0 AS RCPT_AMT,
         NVL(T5.FX_GAIN_AMT, 0), NVL(T5.FX_LOSS_AMT, 0)
  FROM   ERP.SALES_REQ T1
         INNER JOIN SAP.SALES_DETAIL T2
                 ON T1.SAP_REQ_NO = T2.SAP_REQ_NO
                AND T2.SALE_DT >= '20251101'
                AND T2.SALE_DT BETWEEN P_TARGET_DT||'01' AND P_TARGET_DT||'31'
         LEFT JOIN SAP.FX_LEDGER T5
                ON T4.RCPT_DT = T5.SLIP_DT
                AND T5.ACCT_CD IN ('11030151', '55310101', '67450101')

) A`,
      },
      {
        kind: "par",
        rows: [
          {
            problem:
              "기존 통합정보시스템은 화면별로 쿼리가 산재되어 있고, Java에서 동적 매개변수(${DT}, ${FACT_CD} 등)로 기간·필터를 처리하는 구조 — Tableau BI 환경에는 그대로 사용 불가",
            action:
              "화면별 쿼리를 도메인 단위 통합 마트로 재설계하고, 동적 매개변수를 제거하여 필터 대상 필드를 SELECT 절에 노출, PK·인덱스 표준화 및 프로시저별 정합성 검증 체계 구축",
            result:
              "전사 155개 대시보드 안정적 운영 환경 구축 및 데이터 정합성 확보",
          },
          {
            problem:
              "메인 대시보드 내에 생산·출하 실적 화면이 포함되어, 다른 메뉴 조작 시에도 해당 화면의 연산이 백그라운드에서 지속 수행 (로딩 4.8초 이상)",
            action:
              "실적 화면을 별도 페이지로 독립 임베딩하여 로딩 부하 분리, 불필요한 연산 동작 제거, 일반 필터를 CONTEXT 필터로 전환하여 데이터 사전 필터링",
            result:
              "메인 대시보드 로딩 4.8초 → 1.3초 (72%) 개선으로 조회 시 응답 지연 문제 해소",
          },
          {
            problem:
              "80개+ 프로시저의 적재 정합성 검증 필요 — PK 중복, 집계값 불일치, 삭제 조건 오류 등 다양한 이슈 산재",
            action:
              "프로시저별 적재 건수와 In-House 원본 건수 대조, PK 무결성 확보로 중복 데이터 제거, 삭제 조건(일/월 단위) 불일치 수정 등 프로시저 단위 정합성 검증 수행",
            result:
              "배치 자동화 및 오류 대응 구조를 통해 품질과 운영 안정성 동시 확보",
          },
        ],
      },
      {
        kind: "lessons",
        items: [
          {
            title: "ETL 설계 경험",
            body: "배치 프로시저 설계와 ORACLE SCHEDULER 구현까지 직접 수행하며, 데이터가 수집되고 가공되어 적재되는 전 과정의 흐름을 몸소 경험했습니다. ETL 구조를 실무에서 직접 만들어본 경험을 통해, 데이터 적재부터 시각화까지 전 과정을 이해하는 분석가로 성장할 수 있었습니다.",
          },
          {
            title: "요구사항 변경 대응",
            body: "완성된 화면에 수시로 변경 요청이 들어오는 환경에서 변경·검증·신규 개발을 동시에 진행하는 경험을 했습니다. 구현 가능 범위를 제시하고 대안을 제안하면서, 고객이 수용할 수 있는 방향으로 요구사항을 조율하는 방법을 배웠습니다.",
          },
          {
            title: "데이터 이슈 직접 대응",
            body: "매일 프로시저 배치 로그를 확인하고, 오류 발생 시 수동 재적재와 프로시저 수정을 직접 수행하는 루틴을 반복하면서, 문제를 발견하고 원인을 추적해 해결하는 방식을 익혔습니다.",
          },
        ],
      },      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        note: "※ 실데이터는 보안을 위해 블러처리 하였습니다. ※ 일부 이미지는 기획 단계 Figma 시안으로 더미 데이터를 사용하였습니다.",
        images: [
          {
            src: "/projects/ssangyong-ce/01-main-production-real.png",
            alt: "쌍용 C&E 메인 대시보드 — 생산·출하 실적",
            caption: "메인 대시보드 — 생산·출하 실적 (실데이터)",
          },
          {
            src: "/projects/ssangyong-ce/02-hr-headcount-real.png",
            alt: "쌍용 C&E 인사총무 인원현황",
            caption: "인사총무 — 인원현황 (실데이터)",
          },
          {
            src: "/projects/ssangyong-ce/03-executive-design.jpg",
            alt: "쌍용 C&E 메인 대시보드 디자인 — 임원용",
            caption: "메인 대시보드 디자인 — 생산 주요 관리지표 (임원용)",
          },
          {
            src: "/projects/ssangyong-ce/04-tabpy-real.png",
            alt: "TabPy 활용 수동 비정기 적재 대시보드",
            caption: "TabPy 활용 — 수동 비정기 적재 (실데이터)",
          },
          {
            src: "/projects/ssangyong-ce/05-cement-trend.png",
            alt: "시멘트 생산 THC·TPC·순환자원 Trend",
            caption: "시멘트 생산 — THC·TPC·순환자원 Trend",
          },
        ],
      },
    ],
  },
  {
    slug: "global-tax-free",
    title: "Global Tax Free",
    client: "Global Tax Free",
    category: "데이터 플랫폼 구축 프로젝트",
    period: "2024.12 — 2025.03",
    year: "2025",
    role: "BI Data Analyst",
    team: "2명",
    stack: ["Tableau", "Figma"],
    data: ["Excel", "PostgreSQL"],
    tags: ["외국인 소비 분석", "다국가 데이터", "보고서형 대시보드"],
    domain: ["외국인 소비 분석", "다국가 보고·고객 행동 분석"],
    summary:
      "외국인 관광객 환급 데이터를 국적·상권·업종 관점에서 분석한 14본 글로벌 대시보드 — 경영진 월간 보고와 상권 기반 마케팅 인사이트 도출 지원",
    thumbnail: {
      bg: "linear-gradient(135deg, #C45D10 0%, #F47D30 50%, #FBBF87 100%)",
      fg: "#ffffff",
      label: "Global Tax Free",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Project Overview",
        title: "핵심 역할",
        items: [
          {
            number: "01",
            title: "기획",
            bullets: [
              "경영 / 마케팅 / 지도 분석 등 목적별 화면 구조 정의",
              "Figma를 활용해 화면 구조 및 요구사항 정의서 작성·전달",
              "고객 요구사항을 데이터 특성에 맞게 재해석하여 시각화 방식 제안 (예: 정규분포 형태 요청 → 성능과 가독성을 고려해 평균 지표 기반 테이블 구조로 대체)",
            ],
          },
          {
            number: "03",
            title: "대시보드 개발",
            bullets: [
              "보고서형 글로벌 Tableau 대시보드 개발 참여 — 태블로 Desktop 언어 전환 한계로 영문 버전 전체 재제작",
              "대용량 데이터 필터 성능 문제 → 팝업 기반 필터 구조로 개선",
              "연월 필터 및 PDF·PPT 다운로드 기능 전 화면 적용 (월간 보고 체계 대응)",
              "지도 드릴다운 (시도 → 시군구) 기반 외국인 소비 집중 상권 시각화",
            ],
          },
          {
            number: "04",
            title: "커뮤니케이션",
            bullets: [
              "구현 불가 요구사항에 대해 대안을 제시하며 고객사와 방향 조율",
              "진행 상황 및 이슈를 명확히 공유하여 일정 안정성 확보",
              "프로젝트 종료 후 고객사 대상 Tableau 핸즈온 세션에 보조 진행자로 참여",
            ],
          },
        ],
      },
      {
        kind: "kpis",
        label: "Key Output",
        items: [
          { value: "14본", description: "목적별 세분화 대시보드 개발" },
          {
            value: "글로벌 환경",
            description: "동일 구조의 이중 언어(한·영) 보고 환경 구축",
          },
          {
            value: "91.6% 긍정",
            description: "Tableau 핸즈온 세션 만족도 조사 긍정 응답",
          },
        ],
      },

      {
        kind: "par",
        rows: [
          {
            problem:
              "고객사의 Excel 피벗 테이블·기본 차트 기반 수기 보고 운영",
            action:
              "Tableau 기반 목적별 대시보드로 전환, 연월 필터 및 PDF·PPT 다운로드 전 화면 구현",
            result:
              "경영·마케팅·현장 각 목적에 맞는 보고 체계를 구축하여 데이터 기반 의사결정 환경 제공",
          },
          {
            problem:
              "국적별 소비 특성과 상권 집중 패턴을 연결하는 분석 체계 부재",
            action:
              "지도 드릴다운(시도-시군구) 시각화 + 팝업 기반 필터 구조로 성능 문제 구조적 해결",
            result:
              "국적별 소비 특성과 상권별 소비 집중 패턴 확인 → 마케팅 타겟 도출 지원",
          },
          {
            problem:
              "한국어·영문 두 언어 화면에서 동일 품질 보고서 제공 필요",
            action:
              "한국어 버전 대시보드 완성 후 동일 구조 영문 대시보드 전체 재제작",
            result:
              "글로벌 보고 환경 대응 + 재제작 과정에서 지표 정의 및 UI 전면 재점검으로 완성도 향상",
          },
        ],
      },
      {
        kind: "lessons",
        items: [
          {
            title: "사용자 관점 설계",
            body: "Excel 기반 수기 보고 체계를 BI 대시보드로 전환하는 과정에서, 고객의 요구사항에서 한 발 더 나아가 사용자가 더 직관적으로 내용을 받아들일 수 있도록 표현 방식을 먼저 고민하는 경험을 했습니다.",
          },
          {
            title: "구조 기반 성능 개선",
            body: "대용량 필터로 인한 성능 저하 문제를 해결하면서, 데이터 원본뿐만 아니라 화면 구조에서도 꼼꼼하게 원인을 찾아야 한다는 것을 배웠습니다. 팝업 기반 필터 구조로 전환한 경험을 통해 성능 문제에 접근하는 시야가 넓어졌습니다.",
          },
          {
            title: "후속 지원을 통한 신뢰 구축",
            body: "핸즈온 세션에 참여한 현업 담당자들은 BI를 처음 접하는 분들이었습니다. 질문이 들어올 때마다 빠르고 친절하게 응대하며 툴에 잘 적응할 수 있도록 지원했고, 이는 프로젝트 종료 이후에도 개인 문의가 지속되는 신뢰 관계 형성으로 이어졌습니다.",
          },
        ],
      },      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        note: "※ 실데이터는 보안을 위해 블러처리 하였습니다. ※ 일부 이미지는 기획 단계 Figma 시안으로 더미 데이터를 사용하였습니다.",
        images: [
          {
            src: "/projects/global-tax-free/01-marketing-internal-real.png",
            alt: "내부 분석용 마케팅 보고서",
            caption: "내부 분석용 마케팅 보고서 (실데이터)",
          },
          {
            src: "/projects/global-tax-free/02-map-nation-real.png",
            alt: "지도 지표 분석 보고서 — 전국",
            caption: "지도 지표 분석 — 전국 (실데이터)",
          },
          {
            src: "/projects/global-tax-free/03-map-region-real.png",
            alt: "지도 지표 분석 보고서 — 지역",
            caption: "지도 지표 분석 — 지역 (실데이터)",
          },
          {
            src: "/projects/global-tax-free/04-summary-design.jpg",
            alt: "요약 대시보드 디자인",
            caption: "요약 대시보드",
          },
          {
            src: "/projects/global-tax-free/05-executive-sales-design.jpg",
            alt: "경영진 매출 동향 디자인",
            caption: "경영진 매출 동향",
          },
          {
            src: "/projects/global-tax-free/06-marketing-external-design.jpg",
            alt: "외부 분석용 마케팅 보고서 디자인",
            caption: "외부 분석용 마케팅 보고서",
          },
          {
            src: "/projects/global-tax-free/07-medical-sales-design.jpg",
            alt: "의료 매출 보고서 디자인",
            caption: "의료 매출 보고서",
          },
        ],
      },
    ],
  },
  {
    slug: "asics-ecommerce",
    title: "아식스 코리아",
    client: "아식스 코리아",
    category: "이커머스 마케팅 대시보드 구축",
    period: "2024.09 — 2024.11",
    year: "2024",
    role: "BI Data Analyst",
    team: "2명",
    stack: ["Tableau", "MySQL", "Python"],
    data: ["MySQL", "GA4", "ERP"],
    tags: ["리테일 데이터", "이커머스 분석", "마케팅 성과 분석"],
    domain: ["리테일", "이커머스 분석·마케팅 성과 분석"],
    summary:
      "주 고객층인 2030세대의 구매 행동 특성을 분석하여 타겟 마케팅 및 고객 관리를 위한 마케팅 대시보드를 구축한 프로젝트",
    thumbnail: {
      bg: "linear-gradient(135deg, #011E62 0%, #2D52B8 100%)",
      fg: "#ffffff",
      label: "아식스 코리아",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Project Overview",
        title: "수행 영역",
        items: [
          {
            number: "01",
            title: "기획",
            bullets: [
              "단순 매출 집계가 아닌 마케팅 실행에 직결되는 분석 구조 기획",
              "신발 카테고리 특성(긴 재구매 주기)을 반영한 분석 방향 설정",
              "고객사의 모호한 요구사항(\"어떤 상품이 함께 팔리는지 보고 싶다\")을 세부 카테고리 간 교차 구매 TOP 5 분석 구조로 구체화",
            ],
          },
          {
            number: "02",
            title: "데이터",
            bullets: [
              "핵심 지표 중심 사용자 정의 SQL 기반 분석 마트 설계",
              "주문 내 복수 카테고리 처리 로직 구현 (주문 이력 내 MAX 매출 카테고리 대표값으로 선정하여 레코드 수 문제 해결)",
              "데이터 분포를 고려해 R·F·M 각 기준값을 고객사와 협의 후 확정, RFM 점수 산출 및 세그먼트 분류 로직 설계",
            ],
          },
          {
            number: "03",
            title: "대시보드 개발",
            bullets: [
              "A-R-R 분석 기반 신규·재구매 회원 전환 흐름 시각화",
              "구매수/구매액, 일별/월별 등 지표별 선택 버튼 전면 구성 (사용자가 원하는 관점으로 즉시 전환 가능하도록 설계)",
              "성능·가독성을 확보한 TOP N 조회 + 더보기 팝업 구조 구현 (기본 TOP N만 표시, 더보기 클릭 시 전체 조회)",
            ],
          },
          {
            number: "04",
            title: "검증 및 커뮤니케이션",
            bullets: [
              "단계별 요구사항 협의 및 지표 정의 반복",
              "Python으로 ERP Raw Data 1차 정제 후, Raw Data → 데이터 마트 → 대시보드 수치 간 단계적 1:1 값 검증 수행",
              "이슈 발생 시 원인 및 수정 내용을 구조화하여 메일로 전달, 고객사와 정합성 공동 확인",
            ],
          },
        ],
      },
      {
        kind: "kpis",
        label: "Key Output",
        items: [
          {
            value: "+ 2건",
            description: "신규 DC 프로젝트 포함 추가 수주 성공",
          },
          { value: "10개", description: "RFM 기반 고객 세그먼트 정의" },
          {
            value: "추가 협업",
            description: "고객사로부터 이후 프로젝트 참여 직접 요청",
          },
          { value: "2본", description: "Tableau 핵심 화면 직접 담당" },
        ],
      },

      {
        kind: "par",
        rows: [
          {
            problem:
              "고객사가 '어떤 상품이 함께 팔리는지 보고 싶다'는 요구를 했지만, 구체적인 분석 기준이 없는 상태",
            action:
              "카테고리 순서 조합(1차→2차→3차 구매)과 직전·현재 상품 조합 두 축으로 구체화, 한 주문 내 복수 카테고리는 매출 기준 대표값으로 처리",
            result:
              "상품 기획 및 프로모션 설계에 직접 활용 가능한 교차 구매 분석 구조 마련",
          },
          {
            problem:
              "RFM 기반 고객 세그먼트 부재 / 기존 Monetary 기준(40만~300만 구간)은 대부분 고객이 1점에 편중되는 문제",
            action:
              "실제 매출 분위수를 분석하여 Monetary 기준값을 재설계, Frequency는 같은 날 중복 주문 이슈를 발견하여 구매일자 기준으로 변경 — 고객사와 협의하여 10개 세그먼트 확정",
            result:
              "세그먼트별 쿠폰 배포 전략 수립 및 VIP 내 리셀러 식별에 활용",
          },
          {
            problem:
              "ERP 원천 데이터와 Tableau 대시보드 수치 간 정확한 검증 및 신뢰도 확보 필요",
            action:
              "파이썬으로 ERP 1차 정제 후 Raw Data → 마트 → 대시보드 단계적 1:1 검증 수행",
            result:
              "정확한 데이터 제공을 통해 고객사 신뢰도 확보 → 추가 수주 및 협업 요청으로 연결",
          },
        ],
      },
      {
        kind: "lessons",
        items: [
          {
            title: "도메인 이해 기반 설계",
            body: "신발 카테고리의 특성을 이해하고, 긴 재구매 주기와 교차 구매 패턴을 마케팅의 핵심 신호로 반영해 분석 구조를 설계했습니다. 이 과정에서 도메인 이해가 분석 방향을 결정짓는 핵심 요소임을 확인했습니다.",
          },
          {
            title: "단계별 수치 검증",
            body: "Raw Data와 데이터 마트, 대시보드 결과 값을 단계적으로 비교·검증하며 수치의 근거를 명확히 하는 과정을 반복했습니다. 이 과정을 통해 데이터 검증을 습관으로 만드는 경험을 했습니다.",
          },
          {
            title: "신뢰 형성 커뮤니케이션",
            body: "고객사와의 소통 과정에서 개인의 응대 방식이 곧 회사의 신뢰도로 이어진다는 인식을 갖고 프로젝트에 임했습니다. 요구사항의 맥락을 정확히 파악하고, 이슈 발생 시 원인·결과·수정 내용을 구조화해 전달하는 커뮤니케이션 방식의 중요성을 배웠습니다.",
          },
        ],
      },      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        note: "※ 모든 이미지는 기획 단계 Figma 시안으로 더미 데이터를 사용하였습니다.",
        images: [
          {
            src: "/projects/asics-ecommerce/01-arr-analysis.jpg",
            alt: "A-R-R Analysis 대시보드",
            caption: "A-R-R Analysis — 신규·재구매 회원 전환 흐름",
          },
          {
            src: "/projects/asics-ecommerce/02-rfm-analysis.jpg",
            alt: "RFM Analysis 대시보드",
            caption: "RFM Analysis — 10개 세그먼트 분류",
          },
          {
            src: "/projects/asics-ecommerce/03-sub-categories.jpg",
            alt: "세부 카테고리 분석",
            caption: "세부 카테고리 — 교차 구매 TOP 5",
          },
        ],
      },
    ],
  },
  {
    slug: "hyundai-india-dc4m",
    title: "현대자동차 인도",
    client: "현대자동차 인도 법인",
    category: "DC4M 태블로 대시보드 구축",
    period: "2024.05 — 2024.08",
    year: "2024",
    role: "BI Data Analyst",
    team: "4명",
    stack: ["Tableau"],
    data: ["Excel", "Salesforce Data Cloud"],
    tags: ["Automotive", "글로벌 BI 자동화"],
    domain: ["글로벌 자동차 영업·VoC 분석", "Excel → BI 자동화"],
    summary:
      "인도 법인의 Excel 중심 보고 체계를 Tableau BI 환경으로 자동화한 프로젝트 — Salesforce Data Cloud 기반 데이터 마트로 Sales·VoC 데이터를 통합해 글로벌 경영 의사결정 체계 구축",
    thumbnail: {
      bg: "linear-gradient(135deg, #0f172a 0%, #94a3b8 100%)",
      fg: "#ffffff",
      label: "현대자동차 인도",
    },
    sections: [
      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        note: "※ 모든 이미지는 더미 데이터를 사용하였습니다.",
        images: [
          {
            src: "/projects/hyundai-india-dc4m/01-ebr-day-wise.png",
            alt: "EBR Report — Day-wise dashboard",
            caption: "EBR Report — Day-wise",
          },
          {
            src: "/projects/hyundai-india-dc4m/02-ebr-source-wise.png",
            alt: "EBR Report — Source-wise dashboard",
            caption: "EBR Report — Source-wise",
          },
          {
            src: "/projects/hyundai-india-dc4m/03-survey-overall.png",
            alt: "Survey Report — Overall Summary",
            caption: "Survey Report — Overall Summary",
          },
          {
            src: "/projects/hyundai-india-dc4m/04-survey-delight.png",
            alt: "Survey Report — Delight analysis",
            caption: "Survey Report — Delight analysis",
          },
          {
            src: "/projects/hyundai-india-dc4m/05-survey-diagnostic.png",
            alt: "Survey Report — Diagnostic",
            caption: "Survey Report — Diagnostic",
          },
          {
            src: "/projects/hyundai-india-dc4m/06-survey-rating.png",
            alt: "Survey Report — Diagnostic (Rating Question)",
            caption: "Survey Report — Diagnostic (Rating Question)",
          },
        ],
      },
    ],
  },
  {
    slug: "daesang-welllife",
    title: "대상 웰라이프",
    client: "대상 웰라이프",
    category: "마케팅 플랫폼 구축",
    period: "2023.10 — 2024.01",
    year: "2023",
    role: "BI Data Analyst",
    team: "2명",
    stack: ["Tableau", "PostgreSQL", "Figma"],
    data: ["GA4", "CRM", "SalesOn", "Salesforce Data Cloud"],
    tags: ["건강식품 커머스", "CRM 마케팅", "고객 여정 분석"],
    domain: ["건강기능식품 커머스", "CRM 마케팅·고객 여정 분석"],
    summary:
      "자사몰·콜센터 분산 데이터를 통합한 CRM 마케팅 대시보드 — 고객 생애 주기 인사이트 도출과 콜센터 운영 효율 개선 동시 확보",
    thumbnail: {
      bg: "linear-gradient(135deg, #4A3F8A 0%, #695FBF 50%, #9B91DC 100%)",
      fg: "#ffffff",
      label: "대상 웰라이프",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Project Overview",
        title: "핵심 역할",
        items: [
          {
            number: "01",
            title: "기획",
            bullets: [
              "글로벌 컨설팅펌과 협업을 통해 Figma 기반 화면 기획안 구체화",
              "구매 이력부터 장바구니 전환까지 고객 여정 전반을 한 화면에서 파악할 수 있는 구조 설계",
              "콜센터 직원이 직접 사용하는 조회 화면 / 관리자의 상담원 실적 모니터링 화면 분리 기획",
            ],
          },
          {
            number: "03",
            title: "대시보드 개발",
            bullets: [
              "고객·제품·여정·캠페인·상담원 등 도메인 전 영역 대시보드 담당",
              "상담원·현업·임원 역할 기반 접근 권한 체계 구현",
              "각 데이터 원본을 Tableau의 '관계' 기능으로 회원 번호·주문번호 기준 논리적 조인",
              "특정 지표 클릭 시 전체 화면이 해당 기준으로 연동 필터링되는 인터랙티브 구조 구현",
            ],
          },
          {
            number: "04",
            title: "검증 및 커뮤니케이션",
            bullets: [
              "단계별 요구사항 협의 및 수정사항 반복 반영",
              "주요 지표에 대해 SQL 쿼리 작성 후 대시보드 수치와 1:1 대조 검증",
            ],
          },
        ],
      },
      {
        kind: "kpis",
        label: "Key Output",
        items: [
          { value: "6본", description: "고객·제품·콜센터 등 도메인 전 영역 참여" },
          { value: "3단계 권한", description: "상담원·현업·임원 역할별 접근 범위 분리" },
          { value: "연동 필터링", description: "Tableau '관계' 기능 기반 전 화면 필터 연동 구조" },
          { value: "추가 수주", description: "높은 완성도와 신뢰도로 Tableau 신규 프로젝트 연결" },
        ],
      },

      {
        kind: "par",
        rows: [
          {
            problem:
              "자사몰·콜센터·GA 등 분산된 데이터 소스로 통합 분석 불가",
            action:
              "각 데이터 원본을 Tableau '관계' 기능으로 고객 번호·주문번호 기준 논리적 조인",
            result:
              "지표 클릭 시 전체 화면 연동 필터링되는 통합 분석 환경 구축",
          },
          {
            problem:
              "콜센터 상담원 실적을 데이터 기반으로 관리하는 체계 부재",
            action:
              "상담원 전용 고객 조회 화면과 관리자용 실적 모니터링 화면 분리 구축",
            result:
              "상담원 업무 편의성 개선 및 관리자의 성과 모니터링 가능",
          },
          {
            problem:
              "임원부터 현장 직원까지 역할별 정보 접근 범위 통제 필요",
            action:
              "상담원·현업·임원 3단계 역할 기반 접근 권한 설계",
            result:
              "역할 기반 권한 설계를 통해 개인정보 보호와 업무 효율 동시 확보, 추가 수주로 연결",
          },
        ],
      },
      {
        kind: "lessons",
        items: [
          {
            title: "실무 체계 적응",
            body: "이론으로만 배웠던 WBS, 이슈관리대장 등 프로젝트 관리 체계를 처음으로 실무에 적용하면서 현장에서 어떻게 작동하는지 직접 경험했습니다. 고객사의 도메인 용어와 세세한 로직을 이해하는 데 시간이 걸렸지만, 빠른 구현과 반복적인 리뷰를 통해 완성도를 높이며 실무자로서의 기초를 다질 수 있었습니다.",
          },
          {
            title: "자기주도적 문제 해결",
            body: "막히는 상황에서 질문에 의존하기보다 스스로 문제를 파악하고 해결 방안을 찾는 과정을 반복하면서, 맡은 영역을 끝까지 책임지고 완성하는 태도를 갖게 된 프로젝트였습니다.",
          },
        ],
      },      {
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        note: "※ 모든 이미지는 기획 단계 Figma 시안으로 더미 데이터를 사용하였습니다.",
        images: [
          {
            src: "/projects/daesang-welllife/01-integrated-customer.jpg",
            alt: "통합 고객 Profile",
            caption: "통합 고객 Profile",
          },
          {
            src: "/projects/daesang-welllife/02-mall-customer.jpg",
            alt: "자사몰 고객 Profile",
            caption: "자사몰 고객 Profile",
          },
          {
            src: "/projects/daesang-welllife/03-mall-product.jpg",
            alt: "자사몰 제품 Profile",
            caption: "자사몰 제품 Profile",
          },
          {
            src: "/projects/daesang-welllife/04-mall-journey.jpg",
            alt: "자사몰 여정 모니터링 — 방문 분석",
            caption: "자사몰 여정 모니터링 — 방문 분석",
          },
          {
            src: "/projects/daesang-welllife/05-campaign.jpg",
            alt: "캠페인 통합 관리",
            caption: "캠페인 통합 관리",
          },
          {
            src: "/projects/daesang-welllife/06-agent-dashboard.jpg",
            alt: "상담원 대시보드",
            caption: "상담원 대시보드",
          },
          {
            src: "/projects/daesang-welllife/07-agent-performance.jpg",
            alt: "상담원 실적 관리",
            caption: "상담원 실적 관리",
          },
        ],
      },
    ],
  },
];

export type PoC = {
  title: string;
  category: string;
  period?: string;
  year?: string;
  stack?: string[];
  body: string;
};

export const pocs: PoC[] = [
  {
    title: "레이어 (LAYER)",
    category: "샘플 · 패션 커머스 트렌드 분석",
    period: "2026.04",
    year: "2026",
    body: "무신사·29CM 크롤링 데이터 기반 실시간 검색·소비 트렌드 샘플 대시보드 설계",
  },
  {
    title: "LG S&I 코퍼레이션",
    category: "샘플 · 부동산 운영 모니터링",
    period: "2025.04",
    year: "2025",
    body: "부동산 서비스 운영 데이터 기반 주간 재무·수주 현황 모니터링 샘플 대시보드 설계",
  },
  {
    title: "Samsung Developer",
    category: "샘플 · 개발자 활동 분석",
    period: "2024.12",
    year: "2024",
    body: "개발자 활동 데이터(GA + 내부 로그) 기반 캠페인 유입·파일 다운로드 분석 샘플 대시보드 시각화",
  },
  {
    title: "삼화",
    category: "샘플 · K-뷰티 패키징 영업 KPI",
    period: "2024.08",
    year: "2024",
    body: "K-뷰티 패키징 기업 영업·출고·매출 데이터 기반 주간 보고용 KPI 샘플 대시보드 설계",
  },
  {
    title: "대원미디어 (POP MART)",
    category: "샘플 · 캐릭터 IP 커머스 분석",
    period: "2023.08",
    year: "2023",
    body: "캐릭터 IP 기반 커머스 데이터 KPI 및 캠페인 성과 샘플 대시보드 시각화",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
