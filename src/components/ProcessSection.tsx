"use client";

import { useState } from "react";

type ProcessSectionProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  startLabel?: string;
  endLabel?: string;
  steps: {
    number: string;
    stage: string;
    detail?: {
      title?: string;
      bullets: string[];
    };
  }[];
};

export default function ProcessSection({
  eyebrow,
  title,
  intro,
  startLabel,
  endLabel,
  steps,
}: ProcessSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggle = (i: number) =>
    setActiveIdx((prev) => (prev === i ? null : i));

  return (
    <div>
      {(eyebrow || title) && (
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
          <span className="text-xs text-muted tabular-nums font-medium">
            {String(steps.length).padStart(2, "0")} steps
          </span>
        </div>
      )}

      {intro && (
        <p className="text-base text-foreground/75 leading-relaxed mb-10 md:mb-14 max-w-3xl">
          {intro}
        </p>
      )}

      <div className="hidden md:block mb-12">
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-2.5 h-px bg-border-subtle"
            aria-hidden
          />
          <div
            className="grid relative"
            style={{
              gridTemplateColumns: `auto repeat(${steps.length}, 1fr) auto`,
            }}
          >
            <div className="flex flex-col items-center pr-3">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30 mt-2" />
              <span className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">
                {startLabel ?? "Start"}
              </span>
            </div>
            {steps.map((s, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  type="button"
                  key={s.number}
                  onClick={() => toggle(i)}
                  aria-pressed={isActive}
                  className="flex flex-col items-center text-center px-2 group cursor-pointer bg-transparent border-0 p-0"
                >
                  <div
                    className={`h-3 w-3 rounded-full ring-2 transition-colors ${
                      isActive
                        ? "bg-accent ring-accent"
                        : "bg-white ring-foreground group-hover:ring-accent"
                    }`}
                  />
                  <span
                    className={`mt-3 text-[10px] uppercase tracking-[0.22em] font-bold tabular-nums transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-foreground/60 group-hover:text-accent"
                    }`}
                  >
                    {s.number}
                  </span>
                  <span
                    className={`mt-1 text-xs font-semibold leading-tight max-w-[12ch] transition-colors ${
                      isActive ? "text-accent" : ""
                    }`}
                  >
                    {s.stage}
                  </span>
                </button>
              );
            })}
            <div className="flex flex-col items-center pl-3">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30 mt-2" />
              <span className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">
                {endLabel ?? "Done"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-10 md:gap-8"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
        }}
      >
        {steps.map((s, i) => {
          const isActive = activeIdx === i;
          return (
            <button
              type="button"
              key={s.number}
              onClick={() => toggle(i)}
              aria-pressed={isActive}
              className="text-left w-full space-y-3 group cursor-pointer border-0 bg-transparent p-0"
            >
              <div className="flex items-baseline gap-3 md:hidden">
                <span
                  className={`text-xs font-bold tabular-nums tracking-[0.18em] transition-colors ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {s.number}
                </span>
                <span
                  className={`text-sm transition-all ${
                    isActive ? "text-accent font-extrabold" : "font-bold"
                  }`}
                >
                  {s.stage}
                </span>
              </div>
              <p
                className={`hidden md:block text-[10px] uppercase tracking-[0.22em] font-bold tabular-nums transition-colors ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {s.number}
              </p>
              {s.detail?.title && (
                <div className="space-y-2">
                  <p
                    className={`text-sm tracking-tight transition-all ${
                      isActive
                        ? "text-accent font-extrabold drop-shadow-[0_1px_4px_rgba(0,113,227,0.35)]"
                        : "font-bold"
                    }`}
                  >
                    {s.detail.title}
                  </p>
                  <div
                    className={`h-[2px] transition-all duration-300 ${
                      isActive ? "w-10 bg-accent" : "w-0 bg-transparent"
                    }`}
                  />
                </div>
              )}
              <ul className="space-y-2 text-xs text-foreground/75 leading-relaxed">
                {s.detail?.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span
                      className={`mt-1.5 inline-block h-1 w-1 rounded-full shrink-0 transition-colors ${
                        isActive ? "bg-accent" : "bg-muted"
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
