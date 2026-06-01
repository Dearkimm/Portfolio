import Image from "next/image";
import CodeBlock from "@/components/CodeBlock";
import Gallery from "@/components/Gallery";
import ProcessSection from "@/components/ProcessSection";
import SequenceDiagram from "@/components/SequenceDiagram";
import type { Section } from "@/lib/projects";

export default function ProjectSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-24 break-keep">
      {sections.map((s, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  meta,
}: {
  eyebrow?: string;
  title?: string;
  meta?: string;
}) {
  if (!eyebrow && !title) return null;
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.03em]">
            {title}
          </h3>
        )}
      </div>
      {meta && (
        <span className="text-xs text-muted tabular-nums font-medium">
          {meta}
        </span>
      )}
    </div>
  );
}

function SectionRenderer({ section }: { section: Section }) {
  switch (section.kind) {
    case "heading":
      return (
        <div className="space-y-2">
          {section.eyebrow && (
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              {section.eyebrow}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {section.text}
          </h2>
        </div>
      );

    case "text":
      return (
        <p className="text-foreground/85 leading-relaxed whitespace-pre-line">
          {section.body}
        </p>
      );

    case "code":
      return (
        <CodeBlock
          code={section.body}
          language={section.language}
          filename={section.filename}
        />
      );

    case "image":
      return (
        <figure className="space-y-3">
          <Image
            src={section.src}
            alt={section.alt ?? ""}
            width={1600}
            height={1000}
            className="w-full h-auto rounded-2xl ring-1 ring-border-subtle"
          />
          {section.caption && (
            <figcaption className="text-sm text-muted text-center">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "gallery":
      return (
        <Gallery
          images={section.images}
          eyebrow={section.eyebrow}
          title={section.title}
          note={section.note}
        />
      );

    /* CARDS — editorial vertical list (no static accent on items)
       hover-only: title color + left accent bar slides in */
    case "cards":
      return (
        <div>
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            meta={`${String(section.items.length).padStart(2, "0")} areas`}
          />
          <div className="border-t border-foreground">
            {section.items.map((c, i) => {
              const num = c.number ?? String(i + 1).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-border-subtle hover:bg-subtle/30 transition-colors duration-500"
                >
                  <span className="col-span-2 md:col-span-1 text-xs font-bold tabular-nums tracking-[0.18em] pt-2 text-muted group-hover:text-accent transition-colors">
                    {num}
                  </span>
                  <h4 className="col-span-10 md:col-span-5 text-2xl md:text-[clamp(28px,3.2vw,44px)] font-bold tracking-[-0.03em] leading-[1.15] transition-colors duration-300 group-hover:text-accent">
                    {c.title}
                  </h4>
                  <ul className="col-start-3 md:col-start-7 col-span-10 md:col-span-6 space-y-3 self-center">
                    {c.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 inline-block h-1 w-1 rounded-full bg-muted shrink-0" />
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );

    /* KPIS — 2x2 grid, monochrome numbers, accent only on hover */
    case "kpis":
      return (
        <div>
          <SectionHeader
            eyebrow="Output"
            title={section.label ?? "Key Output"}
            meta={`${String(section.items.length).padStart(2, "0")} metrics`}
          />
          <div className="border-t border-foreground pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-14">
              {section.items.map((k, i) => (
                <div key={i} className="group relative min-w-0 overflow-hidden">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-bold tabular-nums mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[clamp(40px,5.5vw,72px)] font-extrabold text-foreground tabular-nums tracking-[-0.04em] leading-[0.95] break-keep group-hover:text-accent group-hover:tracking-[-0.05em] transition-all duration-500">
                    {k.value}
                  </p>
                  <div className="mt-5 h-[2px] w-12 bg-foreground/30 group-hover:bg-accent group-hover:w-24 transition-all duration-500" />
                  <p className="mt-5 text-base text-foreground/75 leading-relaxed max-w-md">
                    {k.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    /* P-A-R — vertical narrative per case, all neutral, accent on case hover */
    case "par":
      return (
        <div>
          <SectionHeader
            eyebrow="Framework"
            title="Problem · Action · Result"
            meta={`${String(section.rows.length).padStart(2, "0")} cases`}
          />
          <div className="border-t border-foreground">
            {section.rows.map((row, i) => (
              <div
                key={i}
                className="py-10 md:py-14 border-b border-border-subtle group hover:bg-subtle/30 transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-bold tabular-nums tracking-[0.18em] group-hover:text-accent transition-colors">
                    Case {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-border-subtle" />
                </div>
                <ol className="space-y-7 relative pl-0">
                  <NarrativeStep label="Problem" body={row.problem} showLine />
                  <NarrativeStep label="Action" body={row.action} showLine />
                  <NarrativeStep label="Result" body={row.result} />
                </ol>
              </div>
            ))}
          </div>
        </div>
      );

    case "sequence-diagram":
      return (
        <SequenceDiagram
          eyebrow={section.eyebrow}
          title={section.title}
          note={section.note}
          participants={section.participants}
          messages={section.messages}
        />
      );

    /* PROCESS — interactive stepper: click step to highlight matching detail */
    case "process":
      return (
        <ProcessSection
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
          startLabel={section.startLabel}
          endLabel={section.endLabel}
          steps={section.steps}
        />
      );

    /* LESSONS — top short bar + Note label (all muted), accent on hover */
    case "lessons":
      return (
        <div>
          <SectionHeader
            eyebrow="Reflection"
            title="Lessons Learned"
            meta={`${String(section.items.length).padStart(2, "0")} notes`}
          />
          <div className="border-t border-foreground pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
              {section.items.map((l, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-10 bg-foreground/30 group-hover:bg-accent group-hover:w-16 transition-all duration-500" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted font-bold tabular-nums group-hover:text-accent transition-colors">
                      Note {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-[28px] font-bold tracking-[-0.02em] mb-5 leading-[1.25] group-hover:text-accent transition-colors">
                    {l.title}
                  </h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {l.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
  }
}

function NarrativeStep({
  label,
  body,
  showLine = false,
}: {
  label: string;
  body: string;
  showLine?: boolean;
}) {
  return (
    <li className="grid grid-cols-12 gap-4 relative">
      <div className="col-span-12 md:col-span-2 flex md:flex-col gap-3 md:gap-4 items-start relative">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-foreground/40 shrink-0" />
          <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted">
            {label}
          </p>
        </div>
        {showLine && (
          <div
            className="hidden md:block absolute left-[4.5px] top-3.5 h-[calc(100%+1rem)] w-px bg-border-subtle"
            aria-hidden
          />
        )}
      </div>
      <p className="col-span-12 md:col-span-10 text-base leading-relaxed text-foreground/85 max-w-3xl">
        {body}
      </p>
    </li>
  );
}
