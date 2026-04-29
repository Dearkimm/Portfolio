import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectSections from "@/components/ProjectSections";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 break-keep">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent mb-12 fade-in-up"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
        All work
      </Link>

      <header
        className="grid grid-cols-12 gap-6 items-end mb-12 fade-in-up"
        style={{ animationDelay: "60ms" }}
      >
        <div className="col-span-12 md:col-span-9">
          <p className="text-sm font-medium text-muted mb-3">
            Project {String(idx + 1).padStart(2, "0")}
          </p>
          <h1 className="text-[clamp(48px,8vw,112px)] font-semibold leading-[0.95] tracking-[-0.04em]">
            {project.title}
          </h1>
          <p className="mt-3 text-xl text-muted">{project.category}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-full border border-border-subtle bg-white text-foreground/70 text-xs font-semibold tracking-tight hover:border-accent hover:bg-accent-soft hover:text-accent transition-colors cursor-default"
              >
                <span className="opacity-50 mr-0.5">#</span>
                {t.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div
        className="aspect-[16/8] rounded-3xl overflow-hidden mb-16 ring-1 ring-border-subtle fade-in-up flex items-center justify-center"
        style={{ background: project.thumbnail.bg, animationDelay: "120ms" }}
      >
        <span
          className="text-5xl md:text-7xl font-bold tracking-tight px-6 text-center"
          style={{ color: project.thumbnail.fg }}
        >
          {project.thumbnail.label}
        </span>
      </div>

      <section className="grid grid-cols-12 gap-6 mb-16">
        <aside className="col-span-12 md:col-span-3">
          <dl className="space-y-5 md:sticky md:top-24">
            <Meta label="Period" items={[project.period]} />
            <Meta label="Team" items={[project.team]} />
            <Meta label="Stack" items={project.stack} />
            {project.data && project.data.length > 0 && (
              <Meta label="Data" items={project.data} />
            )}
            {project.domain && project.domain.length > 0 && (
              <Meta label="Domain" items={project.domain} />
            )}
          </dl>
        </aside>
        <div className="col-span-12 md:col-span-9 md:col-start-5">
          {(() => {
            const [headline, ...rest] = project.summary.split(/\s+—\s+/);
            const lede = rest.join(" — ").trim();
            return (
              <div className="mb-12 max-w-3xl space-y-3">
                <p className="text-2xl md:text-3xl font-medium leading-snug tracking-tight">
                  {headline}
                </p>
                {lede && (
                  <p className="text-base md:text-lg text-foreground/65 leading-relaxed">
                    {lede}
                  </p>
                )}
              </div>
            );
          })()}
          <ProjectSections sections={project.sections} />
        </div>
      </section>

      <Link
        href={`/projects/${next.slug}`}
        className="block group rounded-3xl border border-border-subtle p-8 md:p-10 hover:border-accent transition-colors mt-20"
      >
        <p className="text-sm font-medium text-muted mb-2">
          Next project
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight group-hover:text-accent transition-colors">
            {next.title}
          </h3>
          <span className="text-2xl group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
        <p className="text-muted mt-2">{next.category}</p>
      </Link>
    </div>
  );
}

function Meta({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-2">
        {label}
      </dt>
      <dd className="space-y-1">
        {items.map((item) => (
          <p key={item} className="text-sm font-medium">
            {item}
          </p>
        ))}
      </dd>
    </div>
  );
}
