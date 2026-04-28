"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/projects";

type Props = {
  images: GalleryImage[];
  eyebrow?: string;
  title?: string;
};

export default function Gallery({ images, eyebrow, title }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setActive((a) =>
        a === null ? null : (a - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <div className="space-y-5">
      {(eyebrow || title) && (
        <div className="space-y-1">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              {eyebrow}
            </p>
          )}
          {title && <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-border-subtle hover:ring-accent transition-all bg-subtle"
          >
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <span className="text-sm">⤢</span>
            </div>
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-12 p-3 pr-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={close}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10 fade-in-up"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xl flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-2xl flex items-center justify-center"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white text-2xl flex items-center justify-center"
                aria-label="Next"
              >
                →
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center gap-4"
          >
            <div className="relative w-full max-h-[80vh] flex items-center justify-center">
              <Image
                src={images[active].src}
                alt={images[active].alt ?? ""}
                width={1920}
                height={1200}
                className="rounded-2xl object-contain max-h-[80vh] w-auto h-auto"
              />
            </div>
            {images[active].caption && (
              <p className="text-sm text-white/80 text-center max-w-2xl">
                {images[active].caption}
              </p>
            )}
            <p className="text-xs text-white/50 tabular-nums">
              {active + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
