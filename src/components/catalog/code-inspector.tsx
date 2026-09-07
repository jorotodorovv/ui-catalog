"use client";

import React, { useState, useMemo } from "react";
import { CodeBlock } from "@/components/catalog/code-block";
import { CopyButton } from "@/components/copy-button";
import { CATALOG_USAGE } from "@/data/catalog-usage";
import registryFilesData from "@/data/registry-files.json";
import { BookOpen, FileCode, FileText, Code2, FolderInput } from "lucide-react";

interface RegistryFile {
  name: string;
  path: string;
  target?: string;
  type: string;
  content: string;
}

interface CodeInspectorProps {
  itemId: string;
}

export function CodeInspector({ itemId }: CodeInspectorProps) {
  const [activeTab, setActiveTab] = useState<string>("usage");

  const usageSnippet = CATALOG_USAGE[itemId];
  const files: RegistryFile[] = useMemo(() => {
    const rawFiles = (registryFilesData as Record<string, RegistryFile[]>)[itemId];
    return rawFiles ?? [];
  }, [itemId]);

  const activeContent = useMemo(() => {
    if (activeTab === "usage") {
      return {
        code: usageSnippet?.code ?? "// Usage example coming soon",
        language: usageSnippet?.language ?? "tsx",
        target: usageSnippet?.filename ? `example/${usageSnippet.filename}` : "example.tsx",
        description: usageSnippet?.description ?? "How to use this component",
      };
    }

    const matchedFile = files.find((f) => f.name === activeTab);
    if (matchedFile) {
      let language = "tsx";
      if (matchedFile.name.endsWith(".ts")) language = "typescript";
      if (matchedFile.name.endsWith(".css")) language = "css";
      if (matchedFile.name.endsWith(".json")) language = "json";

      return {
        code: matchedFile.content,
        language,
        target: matchedFile.target ?? matchedFile.path,
        description: `Source: ${matchedFile.path}`,
      };
    }

    return {
      code: "// File content not found",
      language: "typescript",
      target: "",
      description: "",
    };
  }, [activeTab, usageSnippet, files]);

  return (
    <div className="flex flex-col h-full w-full rounded-xl overflow-hidden border border-border/60 bg-muted/20">
      {/* Tab Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 bg-muted/40 px-3 py-2 gap-2">
        {/* Scrollable File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {/* Usage Example Tab */}
          <button
            onClick={() => setActiveTab("usage")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "usage"
                ? "bg-background text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Usage</span>
          </button>

          {/* Registry Source Files Tabs */}
          {files.map((file) => {
            const isActive = activeTab === file.name;
            const isHook = file.type === "registry:hook" || file.name.startsWith("use-");
            const isStyle = file.name.endsWith(".css");

            return (
              <button
                key={file.name}
                onClick={() => setActiveTab(file.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/60 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {isStyle ? (
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                ) : isHook ? (
                  <Code2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <FileCode className="h-3.5 w-3.5 text-sky-500" />
                )}
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Meta & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/30">
          {activeContent.target && (
            <div
              className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40 max-w-[240px] truncate"
              title={`Installation path: ${activeContent.target}`}
            >
              <FolderInput className="h-3 w-3 shrink-0 text-muted-foreground/80" />
              <span className="truncate">{activeContent.target}</span>
            </div>
          )}
          <CopyButton text={activeContent.code} />
        </div>
      </div>

      {/* Code Viewer Canvas */}
      <div className="h-72 sm:h-80 overflow-y-auto bg-card/60 dark:bg-black/25">
        <CodeBlock
          code={activeContent.code}
          language={activeContent.language}
          showLineNumbers={true}
        />
      </div>
    </div>
  );
}
