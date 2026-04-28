import ProjectCard from "@/components/ProjectCard";
import { otherProjects, projects } from "@/lib/projects";

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
            <span>Featured</span>
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

      <section className="mt-24 md:mt-32">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
            Other Work
          </p>
          <span className="text-xs text-muted tabular-nums font-medium">
            {String(otherProjects.length).padStart(2, "0")}
          </span>
        </div>
        <ul className="border-t border-foreground">
          {otherProjects.map((p, i) => (
            <li
              key={p.title}
              className="group grid grid-cols-12 gap-3 md:gap-6 items-baseline py-6 border-b border-border-subtle hover:bg-subtle/30 transition-colors break-keep"
            >
              <span className="col-span-2 md:col-span-1 text-xs font-bold tabular-nums text-muted">
                {String(projects.length + i + 1).padStart(2, "0")}
              </span>
              <p className="col-span-10 md:col-span-2 text-xs text-muted font-medium tabular-nums tracking-wider">
                {p.period}
              </p>
              <div className="col-span-12 md:col-span-5">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-muted mt-0.5">{p.category}</p>
              </div>
              <p className="col-span-6 md:col-span-2 text-xs text-muted">
                {p.role} · {p.team}
              </p>
              <p className="col-span-6 md:col-span-2 text-xs text-muted text-right">
                {p.stack.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
