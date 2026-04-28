import { Highlight, themes } from "prism-react-renderer";

type Props = {
  code: string;
  language?: string;
  filename?: string;
};

export default function CodeBlock({
  code,
  language = "sql",
  filename,
}: Props) {
  const trimmed = code.replace(/^\n+|\n+$/g, "");

  return (
    <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] bg-[#1e1e1e] text-[13px] leading-6 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#2a2a2a] text-xs">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          {filename && (
            <span className="ml-3 font-mono text-[#cccccc]">{filename}</span>
          )}
        </div>
        <span className="font-mono uppercase text-[10px] tracking-wider text-[#858585]">
          {language}
        </span>
      </div>
      <Highlight code={trimmed} language={language} theme={themes.vsDark}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto py-3 m-0 font-mono">
            {tokens.map((line, i) => {
              const { key: lineKey, ...lineProps } = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...lineProps}
                  className="grid grid-cols-[3rem_1fr] hover:bg-[#2a2d2e]"
                >
                  <span className="text-right pr-3 text-[#858585] select-none tabular-nums">
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, j) => {
                      const { key: tokenKey, ...tokenProps } = getTokenProps({ token });
                      return <span key={j} {...tokenProps} />;
                    })}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
