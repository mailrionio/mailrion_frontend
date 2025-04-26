import { IGrapesCanvas } from "@/components/CustomEditor/config";

interface IContentHTML {
  html: string;
  css?: string;
  dimension?: {
    scale?: number;
    width?: number;
    height?: number
  }
  title?: string;
  showScripts?: boolean;
  showIcon?: boolean;
  hideScrollbar?: boolean;
  showXtraStyle?: boolean;
  showTailwindScript?: boolean;
  hideLoader?: boolean,
  canvasData?: IGrapesCanvas;
  initTempData?: {
    bodyContent: string;
    inlineStyles: string[];
    externalLinks: string[];
    externalScripts: string[];
  };
}

export const contentHTML = ({
  html,
  css,
  title,
  dimension,
  canvasData,
  initTempData,
  showScripts,
  showIcon,
  showXtraStyle,
  showTailwindScript,
  hideLoader,
  hideScrollbar
}: IContentHTML) => {
  const content = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="Landing Page Website Template">
<meta name="description" content="Landing Page Website Template">
${showIcon ? `<link rel="icon" type="image/png+svg+xml" href="/images/icon.png">` : "" }
<title>${title ? title.trim() : "Preview"}</title>
${initTempData ? initTempData.externalLinks.map(txt => `<link href="${txt}" rel="stylesheet">`).join("") : ""}
${canvasData && canvasData.styles ? canvasData.styles.map(txt => `<link href="${txt}" rel="stylesheet">`).join("") : ""}
${css ? `<style>${css.replace(/\s+/g, " ")}</style>` : ""}
${showXtraStyle ? `<style>body{transform:scale(${dimension?.scale ?? 0.3});transform-origin:top left;width:${dimension?.width ?? 340}%;height:${dimension?.height ?? 200}%}</style>` : ""}
${hideScrollbar ? `<style>*{scrollbar-width:none;-ms-overflow-style:none;}::-webkit-scrollbar{display:none;}</style>` : ""}
<link href="/templates/assets/tailwind.css" rel="stylesheet">
${hideLoader ? `<style>#loader,#spinner{display:none;}</style>` : ""}
</head>
<body>${html.replace(/<\/?body[^>]*>/g, "").replace(/\s+/g, " ")}
${initTempData ? initTempData.externalScripts.map(txt => `<script src="${txt}"></script>`).join("") : ""}
${showScripts && canvasData && canvasData.scripts ? canvasData.scripts.map(txt => `<script src="${txt}"></script>`).join("") : ""}
${showTailwindScript ? `<script src="https://cdn.tailwindcss.com"></script>` : ""}
</body></html>`.replace(/\s+/g, " ").trim();

  return content;
};

