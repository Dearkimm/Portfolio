export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <section className="grid grid-cols-12 gap-6 items-end mb-16 fade-in-up">
        <div className="col-span-12 md:col-span-9">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-4">
            Contact
          </p>
          <h1 className="text-[clamp(48px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Say
            <span className="text-muted font-light"> hello.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            새로운 프로젝트 협업 또는 데이터·BI 관련 문의는 이메일로 연락
            주세요.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="mailto:auspiciousmin@gmail.com"
          className="group rounded-3xl border border-border-subtle p-8 md:p-10 hover:border-accent transition-all hover:-translate-y-1 fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-4">
            Email
          </p>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors break-all">
            auspiciousmin@gmail.com
          </p>
          <p className="mt-3 text-sm text-muted flex items-center gap-2">
            Send an email
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </p>
        </a>

        <a
          href="https://www.linkedin.com/in/%EA%B9%80%EC%A0%95%EB%AF%BCjenna"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl border border-border-subtle p-8 md:p-10 hover:border-accent transition-all hover:-translate-y-1 fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-4">
            LinkedIn
          </p>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors break-all">
            linkedin.com/in/김정민jenna
          </p>
          <p className="mt-3 text-sm text-muted flex items-center gap-2">
            Visit profile
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </p>
        </a>
      </div>
    </div>
  );
}
