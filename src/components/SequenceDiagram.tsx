"use client";

const W = 1200;
const BOX_H = 52;
const BR = 11; // badge radius
const Y0 = 116; // first message y
const DY = 70; // message y-step
const LOOP_DX = 60;
const LOOP_DY = 26;
const AW = 10; // arrowhead width
const AH = 5; // arrowhead half-height

type Participant = { id: string; label: string; sublabel?: string };
type Message = { num: number; from: string; to: string; label: string; dashed?: boolean };

type Props = {
  eyebrow?: string;
  title?: string;
  note?: string;
  participants: Participant[];
  messages: Message[];
};

export default function SequenceDiagram({ eyebrow, title, note, participants, messages }: Props) {
  const colW = W / participants.length;
  const cx = (id: string) => {
    const i = participants.findIndex((p) => p.id === id);
    return Math.round(colW * i + colW / 2);
  };
  const bw = (p: Participant) =>
    Math.max(Math.max(p.label.length, (p.sublabel ?? "").length) * 8.5 + 38, 88);

  const totalH = Y0 + messages.length * DY + BOX_H + 28;
  const llEnd = totalH - BOX_H - 14;

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
              <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.03em]">{title}</h3>
            )}
          </div>
          <span className="text-xs text-muted tabular-nums font-medium">
            {String(messages.length).padStart(2, "0")} steps
          </span>
        </div>
      )}
      {note && <p className="text-sm text-muted mb-8">{note}</p>}

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${totalH}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ minWidth: "600px", display: "block", fontFamily: "inherit" }}
        >
          {/* Header boxes */}
          {participants.map((p) => {
            const x = cx(p.id);
            const w = bw(p);
            return (
              <g key={`h-${p.id}`}>
                <rect x={x - w / 2} y={2} width={w} height={BOX_H - 4} fill="#111" rx="3" />
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
                    fill="#999"
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
            const self = msg.from === msg.to;
            const ret = !self && tx < fx;
            const dash = msg.dashed ? "5,4" : undefined;

            if (self) {
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
                    stroke="#111"
                    strokeWidth="1.5"
                    strokeDasharray={dash}
                  />
                  <polygon
                    points={`${x0 + AW},${y2 - AH} ${x0},${y2} ${x0 + AW},${y2 + AH}`}
                    fill="#111"
                  />
                  <text
                    x={xr + 12}
                    y={y + LOOP_DY / 2}
                    dominantBaseline="middle"
                    fill="#555"
                    fontSize="11"
                    style={{ fontFamily: "inherit" }}
                  >
                    {msg.label}
                  </text>
                </g>
              );
            }

            const x1 = ret ? fx - BR - 1 : fx + BR + 1;
            const x2 = ret ? tx + BR : tx - BR;
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
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeDasharray={dash}
                />
                {ret ? (
                  <polygon
                    points={`${x2 + AW},${y - AH} ${x2},${y} ${x2 + AW},${y + AH}`}
                    fill="#111"
                  />
                ) : (
                  <polygon
                    points={`${x2 - AW},${y - AH} ${x2},${y} ${x2 - AW},${y + AH}`}
                    fill="#111"
                  />
                )}
                <text
                  x={midX}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#555"
                  fontSize="11"
                  style={{ fontFamily: "inherit" }}
                >
                  {msg.label}
                </text>
              </g>
            );
          })}

          {/* Footer boxes */}
          {participants.map((p) => {
            const x = cx(p.id);
            const w = bw(p);
            return (
              <g key={`f-${p.id}`}>
                <rect
                  x={x - w / 2}
                  y={llEnd + 2}
                  width={w}
                  height={BOX_H - 4}
                  fill="#111"
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
                    fill="#999"
                    fontSize="10"
                    style={{ fontFamily: "inherit" }}
                  >
                    {p.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
