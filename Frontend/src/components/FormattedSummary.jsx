import { useState } from "react";

// Helper to format inline **bold** text
function renderFormattedText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "#0f172a" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Clean legacy markdown table lines into human-readable text
function cleanLegacyTableLine(line) {
  if (line.includes("|")) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c && !c.match(/^[-:]+$/));
    if (cells.length === 0) return null;
    return cells.join(" — ");
  }
  return line;
}

export default function FormattedSummary({ summary }) {
  const [copied, setCopied] = useState(false);

  if (!summary || !summary.trim()) {
    return (
      <div
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          fontStyle: "italic",
          padding: "16px 0",
          textAlign: "center",
        }}
      >
        No summary generated yet. Click 'Generate Summary' once transcript is ready.
      </div>
    );
  }

  // Pre-process summary to split into lines and group into structured blocks
  const rawLines = summary
    .replace(/<br\s*\/?>/gi, "\n")
    .split("\n")
    .map((l) => l.trim());

  const blocks = [];
  let currentBlock = { type: "paragraph", title: "", items: [] };

  rawLines.forEach((line) => {
    if (!line) return;

    // Filter out meta footers like "Prepared by: ...", "Date of Summary: ...", "---"
    if (
      line.startsWith("---") ||
      line.toLowerCase().startsWith("prepared by:") ||
      line.toLowerCase().startsWith("date of summary:") ||
      line.toLowerCase().startsWith("*prepared by:") ||
      line.toLowerCase().startsWith("*end of summary")
    ) {
      return;
    }

    // Clean legacy table markup if present
    const cleaned = cleanLegacyTableLine(line);
    if (!cleaned) return;

    // Check if line is a Heading (### or ## or # or **Heading:**)
    const isHeading =
      cleaned.startsWith("###") ||
      cleaned.startsWith("##") ||
      cleaned.startsWith("#") ||
      /^\*\*[A-Z\s📌💬🎯⚡📋]+[:*]*/.test(cleaned);

    if (isHeading) {
      if (currentBlock.items.length > 0 || currentBlock.title) {
        blocks.push(currentBlock);
      }
      const title = cleaned
        .replace(/^#+\s*/, "")
        .replace(/^\*\*|\*\*$/g, "")
        .replace(/:$/, "")
        .trim();
      currentBlock = { type: "section", title, items: [] };
      return;
    }

    // Check if line is a bullet point
    const isBullet =
      cleaned.startsWith("-") ||
      cleaned.startsWith("*") ||
      cleaned.startsWith("•") ||
      /^\d+\.\s/.test(cleaned);

    if (isBullet) {
      const itemText = cleaned.replace(/^[-*•\d\.\s]+/, "").trim();
      if (itemText) {
        currentBlock.items.push({ isBullet: true, text: itemText });
      }
    } else {
      currentBlock.items.push({ isBullet: false, text: cleaned });
    }
  });

  if (currentBlock.items.length > 0 || currentBlock.title) {
    blocks.push(currentBlock);
  }

  const handleCopy = () => {
    // Strip markdown formatting for plain text copy
    const plainText = summary
      .replace(/[#*|]/g, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .trim();
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Top Action Bar for Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "12px",
        }}
      >
        <button
          onClick={handleCopy}
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
            color: copied ? "#059669" : "#475569",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
          title="Copy clean summary text"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Structured Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {blocks.map((block, bIdx) => (
          <div
            key={bIdx}
            style={{
              background: "#ffffff",
              border: "1px solid #f1f5f9",
              borderRadius: "8px",
              padding: block.title ? "14px 16px" : "10px 14px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            }}
          >
            {block.title && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 750,
                  color: "#0f172a",
                  marginBottom: "10px",
                  paddingBottom: "6px",
                  borderBottom: "1px solid #f1f5f9",
                  letterSpacing: "-0.01em",
                }}
              >
                <span>{renderFormattedText(block.title)}</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {block.items.map((item, iIdx) => {
                if (item.isBullet) {
                  return (
                    <div
                      key={iIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "12.5px",
                        lineHeight: 1.55,
                        color: "#334155",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#4f46e5",
                          marginTop: "6px",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>{renderFormattedText(item.text)}</div>
                    </div>
                  );
                }

                return (
                  <p
                    key={iIdx}
                    style={{
                      margin: 0,
                      fontSize: "12.5px",
                      lineHeight: 1.6,
                      color: "#334155",
                    }}
                  >
                    {renderFormattedText(item.text)}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
