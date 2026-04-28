import ProjectCard from "@/components/ProjectCard";
import { pocs, projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <section className="grid grid-cols-12 gap-6 items-end mb-16 md:mb-20 fade-in-up">
        <div className="col-span-12 md:col-span-9">
          <p className="text-sm font-medium text-muted mb-4">
            Selected work · 2023 — Present
          </p>
          <h1 className="text-[clamp(48px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Turning data
            <br />
            into decisions
            <span className="text-muted font-light"> — from pipeline</span>
            <br />
            <span className="text-muted font-light">to dashboard.</span>
          </h1>
        </div>
        <div className="col-span-12 md:col-span-3 text-sm text-muted space-y-2 pb-3">
          <div className="flex justify-between border-b border-border-subtle pb-2">
            <span>Projects</span>
            <span className="tabular-nums font-medium text-foreground">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex justify-between border-b border-border-subtle pb-2">
            <span>Status</span>
            <span className="font-medium text-foreground">Available</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </section>

      {pocs.length > 0 && (
        <section className="mt-24 md:mt-32">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
                Proof of Concept
              </p>
              <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight">
                샘플 대시보드
              </h2>
            </div>
            <span className="text-xs text-muted tabular-nums font-medium">
              {String(pocs.length).padStart(2, "0")}
            </span>
          </div>
          <ul className="border-t border-border-subtle">
            {pocs.map((p, i) => (
              <li
                key={p.title}
                className="grid grid-cols-12 gap-x-3 md:gap-x-6 gap-y-1 items-baseline py-3.5 border-b border-border-subtle hover:bg-subtle/30 transition-colors break-keep"
              >
                <span className="col-span-2 md:col-span-1 text-[11px] font-bold tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="col-span-3 md:col-span-2 text-[11px] text-muted font-medium tabular-nums tracking-wider">
                  {p.period}
                </p>
                <h3 className="col-span-7 md:col-span-3 text-sm md:text-[15px] font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="col-start-3 md:col-start-auto col-span-10 md:col-span-6 text-xs md:text-[13px] text-foreground/65 leading-snug">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
