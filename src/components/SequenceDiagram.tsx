"use client";

import { useState, useEffect, useRef } from "react";

type Participant = { id: string; label: string; sublabel?: string; color?: string };
type Message = { num: number; from: string; to: string; label: string; dashed?: boolean };
type GroupBox = { label: string; fromNum: number; toNum: number; participantId: string };

type Props = {
  eyebrow?: string;
  title?: string;
  note?: string;
  participants: Participant[];
  messages: Message[];
  groupBox?: GroupBox;
};

const W = 1200;
const BOX_H = 52;
const BR = 11;
const Y0 = 116;
const DY = 70;
const LOOP_DX = 60;
const LOOP_DY = 26;
const AW = 10;
const AH = 5;

export default function SequenceDiagram({
  eyebrow,
  title,
  note,
  participants,
  messages,
  groupBox,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) { setZoom(1); return; }
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => Math.max(0.5, Math.min(4, prev + (e.deltaY < 0 ? 0.1 : -0.1))));
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [expanded]);

  const colW = W / participants.length;
  const cx = (id: string) => {
    const i = participants.findIndex((p) => p.id === id);
    return Math.round(colW * i + colW / 2);
  };
  const bw = (p: Participant) =>
    Math.max(Math.max(p.label.length, (p.sublabel ?? "").length) * 8.5 + 38, 88);

  const totalH = Y0 + messages.length * DY + BOX_H + 28;
  const llEnd = totalH - BOX_H - 14;

  // Group box rect
  let gb: { x: number; y: number; w: number; h: number } | null = null;
  if (groupBox) {
    const fi = messages.findIndex((m) => m.num === groupBox.fromNum);
    const ti = messages.findIndex((m) => m.num === groupBox.toNum);
    if (fi >= 0 && ti >= 0) {
      const pcx = cx(groupBox.participantId);
      const y1 = Y0 + fi * DY - 26;
      const y2 = Y0 + ti * DY + LOOP_DY + 26;
      gb = { x: pcx - 16, y: y1, w: LOOP_DX + 84, h: y2 - y1 };
    }
  }

  // Shared SVG content (rendered in both normal and modal views)
  const inner = (
    <>
      {/* Group box */}
      {gb && groupBox && (
        <>
          <rect
            x={gb.x}
            y={gb.y}
            width={gb.w}
            height={gb.h}
            fill="rgba(0,0,0,0.035)"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
            strokeDasharray="4,3"
            rx="4"
          />
          <text
            x={gb.x + 10}
            y={gb.y + 15}
            fill="rgba(0,0,0,0.38)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.08em"
            style={{ fontFamily: "inherit" }}
          >
            {groupBox.label}
          </text>
        </>
      )}

      {/* Header participant boxes */}
      {participants.map((p) => {
        const x = cx(p.id);
        const w = bw(p);
        const fill = p.color ?? "#111";
        return (
          <g key={`h-${p.id}`}>
            <rect x={x - w / 2} y={2} width={w} height={BOX_H - 4} fill={fill} rx="3" />
            <text
              x={x}
              y={p.sublabel ? 18 : BOX_H / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="600"
              style={{ fontFamily: "inherit" }}
            >
              {p.label}
            </text>
            {p.sublabel && (
              <text
                x={x}
                y={35}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.72)"
                fontSize="10"
                style={{ fontFamily: "inherit" }}
              >
                {p.sublabel}
              </text>
            )}
          </g>
        );
      })}

      {/* Lifelines */}
      {participants.map((p) => (
        <line
          key={`ll-${p.id}`}
          x1={cx(p.id)}
          y1={BOX_H}
          x2={cx(p.id)}
          y2={llEnd}
          stroke="#d4d4d4"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      ))}

      {/* Messages */}
      {messages.map((msg, i) => {
        const y = Y0 + i * DY;
        const fx = cx(msg.from);
        const tx = cx(msg.to);
        const isSelf = msg.from === msg.to;
        const isReturn = !isSelf && tx < fx;
        // Requests solid+dark, responses dashed+gray
        const lineColor = msg.dashed ? "#999" : "#111";
        const labelColor = msg.dashed ? "#aaa" : "#555";
        const dash = msg.dashed ? "5,4" : undefined;

        if (isSelf) {
          const x0 = fx + BR + 1;
          const xr = fx + LOOP_DX;
          const y2 = y + LOOP_DY;
          return (
            <g key={msg.num}>
              <circle cx={fx} cy={y} r={BR} fill="#111" />
              <text
                x={fx}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize="9"
                fontWeight="700"
                style={{ fontFamily: "inherit" }}
              >
                {msg.num}
              </text>
              <path
                d={`M ${x0},${y} C ${xr},${y - 14} ${xr},${y2 + 14} ${x0},${y2}`}
                fill="none"
                stroke={lineColor}
                strokeWidth="1.5"
                strokeDasharray={dash}
              />
              <polygon
                points={`${x0 + AW},${y2 - AH} ${x0},${y2} ${x0 + AW},${y2 + AH}`}
                fill={lineColor}
              />
              <text
                x={xr + 12}
                y={y + LOOP_DY / 2}
                dominantBaseline="middle"
                fill={labelColor}
                fontSize="11"
                style={{ fontFamily: "inherit" }}
              >
                {msg.label}
              </text>
            </g>
          );
        }

        const x1 = isReturn ? fx - BR - 1 : fx + BR + 1;
        const x2 = isReturn ? tx + BR : tx - BR;
        const midX = (x1 + x2) / 2;

        return (
          <g key={msg.num}>
            <circle cx={fx} cy={y} r={BR} fill="#111" />
            <text
              x={fx}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#fff"
              fontSize="9"
              fontWeight="700"
              style={{ fontFamily: "inherit" }}
            >
              {msg.num}
            </text>
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke={lineColor}
              strokeWidth="1.5"
              strokeDasharray={dash}
            />
            {isReturn ? (
              <polygon
                points={`${x2 + AW},${y - AH} ${x2},${y} ${x2 + AW},${y + AH}`}
                fill={lineColor}
              />
            ) : (
              <polygon
                points={`${x2 - AW},${y - AH} ${x2},${y} ${x2 - AW},${y + AH}`}
                fill={lineColor}
              />
            )}
            <text
              x={midX}
              y={y - 10}
              textAnchor="middle"
              fill={labelColor}
              fontSize="11"
              style={{ fontFamily: "inherit" }}
            >
              {msg.label}
            </text>
          </g>
        );
      })}

      {/* Footer participant boxes */}
      {participants.map((p) => {
        const x = cx(p.id);
        const w = bw(p);
        const fill = p.color ?? "#111";
        return (
          <g key={`f-${p.id}`}>
            <rect
              x={x - w / 2}
              y={llEnd + 2}
              width={w}
              height={BOX_H - 4}
              fill={fill}
              rx="3"
            />
            <text
              x={x}
              y={p.sublabel ? llEnd + 18 : llEnd + BOX_H / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="600"
              style={{ fontFamily: "inherit" }}
            >
              {p.label}
            </text>
            {p.sublabel && (
              <text
                x={x}
                y={llEnd + 35}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.72)"
                fontSize="10"
                style={{ fontFamily: "inherit" }}
              >
                {p.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </>
  );

  const viewBox = `0 0 ${W} ${totalH}`;

  return (
    <>
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
                <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.03em]">{title}</h3>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted tabular-nums font-medium">
                {String(messages.length).padStart(2, "0")} steps
              </span>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-xs text-muted hover:text-foreground underline underline-offset-2 transition-colors duration-200"
              >
                확대 보기
              </button>
            </div>
          </div>
        )}
        {note && <p className="text-sm text-muted mb-8">{note}</p>}

        {/* Normal view — click to expand */}
        <div
          className="w-full overflow-x-auto cursor-zoom-in"
          onClick={() => setExpanded(true)}
          role="button"
          tabIndex={0}
          title="클릭해서 확대 보기"
          onKeyDown={(e) => {
            if (e.key === "Enter") setExpanded(true);
          }}
        >
          <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ minWidth: "600px", display: "block", fontFamily: "inherit" }}
          >
            {inner}
          </svg>
        </div>
      </div>

      {/* Expanded modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setExpanded(false)}
        >
          <div
            className="my-[5vh] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: "min(95vw, 1300px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
              {title && (
                <p className="text-sm font-semibold tracking-tight text-gray-800">{title}</p>
              )}
              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs text-gray-400 tabular-nums select-none">
                  {Math.round(zoom * 100)}% · 휠로 확대/축소
                </span>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1"
                >
                  닫기 ×
                </button>
              </div>
            </div>
            <div ref={scrollRef} className="overflow-auto p-6 cursor-crosshair">
              <svg
                viewBox={viewBox}
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: `${1200 * zoom}px`, height: "auto", display: "block", fontFamily: "inherit" }}
              >
                {inner}
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
