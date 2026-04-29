import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-border-subtle group-hover:ring-accent transition-all duration-500"
        style={{ background: project.thumbnail.bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.04]">
          <span
            className="text-3xl md:text-4xl font-bold tracking-tight px-6 text-center"
            style={{ color: project.thumbnail.fg }}
          >
            {project.thumbnail.label}
          </span>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          {project.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md"
              style={{ color: project.thumbnail.fg }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-lg"
            style={{ color: project.thumbnail.fg }}
          >
            →
          </span>
        </div>
      </div>
      <div className="mt-4 px-1 flex items-baseline justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h3 className="text-lg font-semibold tracking-tight truncate group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted line-clamp-2 leading-snug">{project.category}</p>
        </div>
        <span className="text-xs text-muted tabular-nums shrink-0">
          {project.period.split(" — ")[0]}
        </span>
      </div>
    </Link>
  );
}
