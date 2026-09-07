"use client";

import React, { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  const cleanCode = useMemo(() => code.trim(), [code]);

  const grammar = useMemo(() => {
    return (
      Prism.languages[language] ||
      Prism.languages.tsx ||
      Prism.languages.typescript ||
      Prism.languages.javascript
    );
  }, [language]);

  const highlightedHtml = useMemo(() => {
    try {
      return Prism.highlight(cleanCode, grammar, language);
    } catch {
      return cleanCode;
    }
  }, [cleanCode, grammar, language]);

  const lineCount = useMemo(() => cleanCode.split("\n").length, [cleanCode]);

  return (
    <div
      className={`relative font-mono text-xs leading-5 flex w-full overflow-x-auto select-text ${className}`}
    >
      {showLineNumbers && (
        <div
          aria-hidden="true"
          className="select-none py-3.5 pl-3.5 pr-3 text-right text-muted-foreground/35 border-r border-border/40 shrink-0 font-mono text-[11px] leading-5"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
      )}
      <pre className="py-3.5 px-4 flex-1 overflow-x-auto font-mono text-[11px] sm:text-xs leading-5 text-foreground/90 focus:outline-none">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
}
