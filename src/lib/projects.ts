export type GalleryImage = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Section =
  | { kind: "heading"; text: string; eyebrow?: string }
  | { kind: "text"; body: string }
  | { kind: "code"; language?: string; filename?: string; body: string }
  | { kind: "image"; src: string; alt?: string; caption?: string }
  | { kind: "gallery"; eyebrow?: string; title?: string; images: GalleryImage[] }
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
    slug: "ssangyong-ce",
    title: "쌍용 C&E",
    client: "쌍용 C&E",
    category: "차세대 ERP BI 구축",
    period: "2025.05 — 2026.03",
    year: "2025",
    role: "BI Data Analyst",
    team: "5명",
    stack: ["Tableau", "Oracle SQL", "TabPy"],
    data: ["재무·관리 회계", "영업물류", "생산품질 관리", "인사 조직"],
    tags: ["ERP 운영 데이터", "BI 시스템 구축", "운영 자동화"],
    domain: ["ERP 운영 데이터", "BI 시스템 구축·운영 자동화"],
    summary:
      "Java 기반 통합정보시스템의 108개 화면을 BI 관점에서 재정의하고, 80여 개 배치 프로시저 자동화와 집계 테이블 기반 아키텍처 전환으로 대시보드 로딩 속도를 절반 이하로 단축한 차세대 ERP BI 구축 프로젝트.",
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
              "80여 개 배치 프로시저 설계·개발 + TabPy 연계 비정기 재적재 기능 구현",
              "PK 오류·데이터 적재 실패 등 주요 이슈 로그 분석 및 수정",
            ],
          },
          {
            number: "03",
            title: "대시보드 개발",
            bullets: [
              "전체 155개 중 46개 화면 설계 및 개발",
              "메인 대시보드 로딩 4.8초 → 1.3초로 단축 (불필요한 동작 제거, 계산 로직 튜닝, CONTEXT 필터)",
              "내부 화면을 임베딩 방식으로 분리하여 필요 시점에만 로드되도록 변경",
              "Tableau 그룹 기반 사용자 236명 런타임 권한 체계 설계",
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
        kind: "gallery",
        eyebrow: "Reference",
        title: "Dashboard Screens",
        images: [
          {
            src: "/projects/ssangyong-ce/01.svg",
            alt: "쌍용 C&E 대시보드 1",
            caption: "메인 대시보드 — 일일 생산 지표",
          },
          {
            src: "/projects/ssangyong-ce/02.svg",
            alt: "쌍용 C&E 대시보드 2",
            caption: "재고 / 출하 현황",
          },
          {
            src: "/projects/ssangyong-ce/03.svg",
            alt: "쌍용 C&E 대시보드 3",
            caption: "영업물류 모니터링",
          },
          {
            src: "/projects/ssangyong-ce/04.svg",
            alt: "쌍용 C&E 대시보드 4",
            caption: "인사·조직 분석",
          },
        ],
      },
      {
        kind: "code",
        language: "sql",
        filename: "mart_daily_revenue.sql",
        body: `-- 일별 매출/판매 마트 (집계 테이블 기반)
SELECT
  TRUNC(s.sale_dt)               AS sale_d,
  s.region_cd,
  p.product_grp,
  SUM(s.amount)                  AS revenue,
  SUM(s.qty)                     AS qty,
  COUNT(DISTINCT s.customer_id)  AS customers
FROM   sales s
JOIN   products p ON p.product_id = s.product_id
WHERE  s.sale_dt >= TRUNC(SYSDATE) - 365
GROUP  BY TRUNC(s.sale_dt), s.region_cd, p.product_grp;`,
      },
      {
        kind: "par",
        rows: [
          {
            problem:
              "기존 JAVA 기반 시스템 108개 화면을 BI로 전환 필요 / 초기 PK 설계 미흡으로 적재 오류·반복 재작업",
            action:
              "분석 전용 계층으로 마트 재설계, PK·인덱스 최적화, 전 단계 수치 검증 체계 구축",
            result:
              "전사 155개 대시보드 안정적 운영 환경 구축 및 데이터 정합성 확보",
          },
          {
            problem:
              "메인 대시보드에 임원용 화면이 통합되어 백그라운드 연산 지속 (로딩 4.8초 이상)",
            action:
              "내부 화면을 임베딩 방식으로 완전 분리 + 불필요한 동작 제거 + CONTEXT 필터 적용",
            result:
              "메인 대시보드 로딩 4.8초 → 1.3초 (72%) 개선으로 조회 시 응답 지연 문제 해소",
          },
          {
            problem:
              "요구사항이 빈번하게 변경되는 환경에서 변경·검증·신규 개발을 동시에 진행해야 하는 상황",
            action:
              "구현 가능 범위 제안 방식으로 조율, 오류 발생 시 1차 자가 해결 후 협업 요청",
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
      },
    ],
  },
  {
    slug: "global-tax-free",
    title: "Global Tax Free",
    client: "Global Tax Free",
    category: "세무 환급 대시보드 구축",
    period: "2024.12 — 2025.03",
    year: "2025",
    role: "Solo",
    team: "1명",
    stack: ["Tableau", "MySQL"],
    data: ["환급 트랜잭션", "여권/국적 데이터"],
    tags: ["Tax Refund", "Operational BI"],
    summary:
      "외국인 여행객 대상 세금 환급 데이터를 국가·여권·매장 단위로 집계해 운영팀이 매일 트래픽과 환급 패턴을 추적할 수 있는 대시보드를 구축.",
    thumbnail: {
      bg: "linear-gradient(135deg, #047857 0%, #34d399 100%)",
      fg: "#ffffff",
      label: "Global Tax Free",
    },
    sections: [
      {
        kind: "text",
        body: "환급 트랜잭션을 일/주/월 단위로 집계하고, 국가·여권·매장 차원의 드릴다운을 제공하는 대시보드 구성. (상세 내용 추후 추가)",
      },
    ],
  },
  {
    slug: "asics-ecommerce",
    title: "ASICS",
    client: "아식스코리아",
    category: "이커머스 대시보드 구축",
    period: "2024.09 — 2024.11",
    year: "2024",
    role: "Lead",
    team: "3명",
    stack: ["Tableau", "Oracle SQL"],
    data: ["주문/상품/회원 데이터", "프로모션 로그"],
    tags: ["E-commerce", "Sales Analytics"],
    summary:
      "이커머스 주문/상품/회원 데이터를 통합해 카테고리·SKU·프로모션 단위로 매출과 전환을 분석하는 운영 대시보드.",
    thumbnail: {
      bg: "linear-gradient(135deg, #1d4ed8 0%, #f97316 100%)",
      fg: "#ffffff",
      label: "ASICS",
    },
    sections: [
      {
        kind: "text",
        body: "프로모션 단위 매출 기여도, 카테고리별 회전율, 신규/복귀 회원의 구매 패턴을 분석할 수 있도록 구성. (상세 내용 추후 추가)",
      },
    ],
  },
  {
    slug: "daesang-welllife",
    title: "Daesang Welllife",
    client: "대상 웰라이프",
    category: "영양식 사업 대시보드 구축",
    period: "2023.10 — 2024.01",
    year: "2023",
    role: "Solo",
    team: "1명",
    stack: ["Tableau", "MySQL"],
    data: ["B2B 영업 데이터", "병원 단위 거래"],
    tags: ["Healthcare", "B2B Sales"],
    summary:
      "환자 영양식 B2B 영업 데이터를 병원·제품·영업담당 단위로 분석하는 대시보드 구축.",
    thumbnail: {
      bg: "linear-gradient(135deg, #65a30d 0%, #d9f99d 100%)",
      fg: "#0a0a0a",
      label: "대상 웰라이프",
    },
    sections: [
      {
        kind: "text",
        body: "병원 단위 매출, 제품 라인별 점유, 영업담당 KPI를 한 화면에서 추적할 수 있도록 구성. (상세 내용 추후 추가)",
      },
    ],
  },
];

export type OtherProject = {
  title: string;
  client: string;
  category: string;
  period: string;
  year: string;
  role: string;
  team: string;
  stack: string[];
  note?: string;
};

export const otherProjects: OtherProject[] = [
  {
    title: "Hyundai India · DC4M",
    client: "현대자동차 인도 법인",
    category: "DC4M Tableau 대시보드 구축",
    period: "2024.05 — 2024.08",
    year: "2024",
    role: "Lead",
    team: "4명",
    stack: ["Tableau", "Oracle SQL"],
  },
  {
    title: "Amorepacific · Osan",
    client: "아모레퍼시픽",
    category: "오산 디지털 워룸 대시보드 개발",
    period: "2024.02 — 2024.04",
    year: "2024",
    role: "Solo",
    team: "1명",
    stack: ["Tableau"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
