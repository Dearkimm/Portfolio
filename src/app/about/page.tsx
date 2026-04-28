const capabilities = [
  {
    title: "처음부터 끝까지 직접 구현합니다",
    body: "데이터 정의, SQL, 대시보드 구현, 검증까지 전 과정을 분리하지 않고 직접 수행합니다.",
  },
  {
    title: "빠르게 만들고 반복 개선합니다",
    body: "초기 구현 이후 피드백을 즉시 반영하며, 짧은 사이클로 완성도를 높입니다.",
  },
  {
    title: "데이터 레벨에서 검증합니다",
    body: "지표 결과를 신뢰하지 않고, RAW 데이터 기준으로 직접 비교 검증합니다.",
  },
  {
    title: "사용 환경까지 고려해 구현합니다",
    body: "대시보드를 만드는 데서 끝내지 않고, 실제 사용 흐름과 운영 방식까지 반영해 구현합니다.",
  },
];

const career = [
  {
    period: "2023.06 — 재직중",
    company: "(주)밀버스",
    role: "DX2본부 프로 · BI Analyst",
    note: "Salesforce 파트너사. 고객사 Tableau 대시보드 설계와 SQL 데이터 마트 개발을 담당.",
  },
  {
    period: "2023.01 — 2023.03",
    company: "(주)메가존클라우드",
    role: "DBC 인턴",
    note: "Data Engineering 직무 인턴. ETL 파이프라인과 운영 환경의 데이터 흐름을 학습.",
  },
];

const skills = [
  "Tableau",
  "Oracle Database",
  "MySQL",
  "TabPy",
  "Python",
  "Figma",
  "Notion",
];

const credentials = [
  "숙명여자대학교 컴퓨터과학과 졸업",
  "Salesforce Certified Tableau Consultant",
  "Salesforce Certified AI Specialist",
  "경영정보시각화능력 1회차",
  "AWS Certified Cloud Practitioner",
  "정보처리기사",
  "TOEIC 900점",
  "컴퓨터활용능력 1급",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 break-keep">
      <section className="grid grid-cols-12 gap-6 md:gap-10 mb-24 md:mb-32 fade-in-up">
        <div className="col-span-12 md:col-span-8 space-y-7">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
            About
          </p>
          <h1 className="text-[clamp(40px,7vw,96px)] font-semibold leading-[0.95] tracking-[-0.04em]">
            김정민<span className="text-muted font-light"> · Jenna</span>
          </h1>
          <h2 className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] tracking-[-0.03em] max-w-3xl">
            프로젝트를 안정적으로 이끄는 분석가
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
            새로운 환경에서도 필요한 정보를 빠르게 파악하고, 기준에 따라
            정리하여 프로젝트가 마무리될 때까지 책임감 있게 수행합니다.
          </p>
          <div className="grid grid-cols-2 gap-12 max-w-md pt-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1.5">
                Year
              </p>
              <p className="text-base font-medium">3rd year</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold mb-1.5">
                Born
              </p>
              <p className="text-base font-medium tabular-nums">
                1999. 05. 11
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end gap-5 md:pt-12">
          <div
            className="h-44 w-44 md:h-56 md:w-56 rounded-full ring-8 ring-white shadow-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #e4e4e7 0%, #f4f4f5 60%, #fafafa 100%)",
            }}
            aria-label="Profile photo placeholder"
            title="추후 프로필 사진 적용 예정"
          >
            <svg
              className="h-20 w-20 md:h-24 md:w-24 text-zinc-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <p className="text-sm text-muted font-medium">📍 Seoul, KR</p>
        </div>
      </section>

      <section className="mb-24 md:mb-32">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
            Capabilities
          </p>
          <span className="text-xs text-muted tabular-nums font-medium">
            {String(capabilities.length).padStart(2, "0")}
          </span>
        </div>
        <div className="border-t border-foreground">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className="group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-border-subtle hover:bg-subtle/30 transition-colors duration-500"
            >
              <span className="col-span-2 md:col-span-1 text-xs font-bold tabular-nums tracking-[0.18em] pt-2 text-muted group-hover:text-accent transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-11">
                <h3 className="text-2xl md:text-4xl font-bold leading-[1.2] tracking-[-0.02em] max-w-3xl transition-colors duration-300 group-hover:text-accent">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 mb-20">
        <section
          className="md:col-span-6 fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              Career
            </p>
            <span className="text-xs text-muted tabular-nums font-medium">
              {String(career.length).padStart(2, "0")} roles
            </span>
          </div>
          <div className="relative">
            {career.map((c, i) => (
              <div
                key={c.period}
                className="relative pl-7 pb-10 last:pb-0 group"
              >
                {i < career.length - 1 && (
                  <div className="absolute left-[5px] top-4 bottom-0 w-px bg-border-subtle" />
                )}
                <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-white ring-2 ring-foreground/30 group-hover:ring-accent group-hover:scale-125 transition-all" />
                <p className="text-xs text-muted font-semibold tabular-nums tracking-wider group-hover:text-accent transition-colors">
                  {c.period}
                </p>
                <p className="mt-2 text-xl font-bold tracking-tight">
                  {c.company}
                </p>
                <p className="text-sm text-muted mt-1">{c.role}</p>
                {c.note && (
                  <p className="mt-3 text-sm text-foreground/75 leading-relaxed max-w-md">
                    {c.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-6 space-y-12">
          <div className="fade-in-up" style={{ animationDelay: "200ms" }}>
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-6">
              Skills
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <li
                  key={s}
                  className="px-4 py-2 rounded-full border border-border-subtle bg-white text-sm font-medium hover:border-accent hover:bg-accent-soft hover:text-accent hover:scale-[1.04] hover:shadow-sm transition-all cursor-default"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in-up" style={{ animationDelay: "280ms" }}>
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
                Credentials
              </p>
              <span className="text-xs text-muted tabular-nums font-medium">
                {String(credentials.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              {credentials.map((c, i) => (
                <li
                  key={c}
                  className="flex items-baseline gap-3 leading-relaxed group"
                >
                  <span className="text-[10px] text-muted tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="group-hover:text-accent transition-colors">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
