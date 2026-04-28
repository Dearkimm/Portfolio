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
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
                Proof of Concept
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                실험과 검증
              </h2>
            </div>
            <span className="text-xs text-muted tabular-nums font-medium">
              {String(pocs.length).padStart(2, "0")}
            </span>
          </div>
          <ul className="border-t border-foreground">
            {pocs.map((p, i) => (
              <li
                key={p.title}
                className="group grid grid-cols-12 gap-3 md:gap-6 items-baseline py-7 border-b border-border-subtle hover:bg-subtle/30 transition-colors break-keep"
              >
                <span className="col-span-2 md:col-span-1 text-xs font-bold tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.period && (
                  <p className="col-span-10 md:col-span-2 text-xs text-muted font-medium tabular-nums tracking-wider">
                    {p.period}
                  </p>
                )}
                <div className={p.period ? "col-span-12 md:col-span-7" : "col-span-10 md:col-span-9"}>
                  <h3 className="text-base md:text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">{p.category}</p>
                  <p className="text-sm text-foreground/80 mt-2 leading-relaxed max-w-2xl">
                    {p.body}
                  </p>
                </div>
                {p.stack && (
                  <p className="col-span-12 md:col-span-2 text-xs text-muted text-left md:text-right">
                    {p.stack.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
