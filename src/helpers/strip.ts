export const stripQuotes = (input: any): any => {
  if (input === null || input === undefined || typeof input !== "string")
    return input;

  let result = input.trim();

  // Try unwrapping and decoding multiple times
  for (let i = 0; i < 10; i++) {
    // Remove surrounding quotes (both single and double)
    if (
      (result.startsWith('"') && result.endsWith('"')) ||
      (result.startsWith("'") && result.endsWith("'"))
    ) {
      result = result.slice(1, -1).trim();
    }

    // Replace common escape sequences and remove whitespace
    result = result
      .replace(/\\n/g, "")
      .replace(/\\r/g, "")
      .replace(/\\t/g, "")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\")
      .replace(/\s+/g, " "); // Remove all whitespace

    try {
      // If it's valid JSON, return the parsed result
      return JSON.parse(result);
    } catch {
      // Otherwise, keep trying to clean
      continue;
    }
  }

  // Handle string representations of null/undefined
  if (result === "null") return null;
  if (result === "undefined") return undefined;

  return result;
};

function extractBodyContent(raw: string): string | undefined {
  const match = raw.match(/<body[\s\S]*?<\/body>/i);
  return match ? match[0] : undefined;
}

export const extractRionContent = (
  raw: string
): {
  html?: string;
  css?: string;
  headContent?: string;
} => {
  // Extract HTML via <body> tag directly
  const bodyMatch = raw.match(/<body[\s\S]*?<\/body>/i);
  const RIONHTML = bodyMatch ? bodyMatch[0] : undefined;

  // Extract HEAD using safe pattern
  const headMatch = raw.match(/"RIONHEAD"\s*:\s*"((?:[^"\\]|\\.)*?)"/s);
  const RIONHEAD = headMatch
    ? headMatch[1]
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .replace(/\\n/g, "\n")
        .trim()
    : undefined;

  // Extract raw chunk between RIONCSS and RIONHEAD
  const cssStart = raw.indexOf('"RIONCSS":');
  const cssEnd = raw.indexOf('"RIONHEAD":');

  let RIONCSS: string | undefined = undefined;
  if (cssStart !== -1 && cssEnd !== -1 && cssEnd > cssStart) {
    const rawCSSChunk = raw.slice(cssStart + 11, cssEnd).trim(); // 11 = length of `"RIONCSS":`
    // Remove wrapping quotes if present
    if (rawCSSChunk.startsWith('"') && rawCSSChunk.endsWith(",")) {
      RIONCSS = rawCSSChunk.slice(1, -1);
    } else if (rawCSSChunk.startsWith('"') && rawCSSChunk.endsWith('"')) {
      RIONCSS = rawCSSChunk.slice(1, -1);
    } else {
      RIONCSS = rawCSSChunk;
    }

    RIONCSS = RIONCSS.replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\n/g, "\n")
      .trim();
  }

  return { html: RIONHTML, css: RIONCSS, headContent: RIONHEAD };
};

const logToFile = async (content: any, filename: string) => {
  try {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error logging to file:", error);
  }
};
