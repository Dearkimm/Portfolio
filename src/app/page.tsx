import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <section className="grid grid-cols-12 gap-6 items-end mb-16 md:mb-20 fade-in-up">
        <div className="col-span-12 md:col-span-9">
          <p className="text-sm font-medium text-accent mb-4 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Selected work · 2023 — Present
          </p>
          <h1 className="text-[clamp(48px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Turning data
            <br />
            into <span className="text-accent">decisions</span>
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
            <span className="text-accent font-medium">Available</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {projects.map((p, i) => (
          <div key={p.slug} className="fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </section>
    </div>
  );
}
