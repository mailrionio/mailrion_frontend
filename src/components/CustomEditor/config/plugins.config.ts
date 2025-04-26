import grapesjs_component_twitch from "grapesjs-component-twitch";
import gjsCompCodeEditor from "grapesjs-component-code-editor";
import grapesjs_plugin_forms from "grapesjs-plugin-forms";
import gjsTuiImageEditor from "grapesjs-tui-image-editor";
import gjsRteExtensions from "grapesjs-rte-extensions";
import gjsBlockBasic from "grapesjs-blocks-basic";
import grapesjs_ga from "grapesjs-ga";
import grapesjs_tailwind from "grapesjs-tailwind";
import gjsSymbols from "@silexlabs/grapesjs-symbols";
import gjsCustomCode from "grapesjs-custom-code";
import gjsStyleBg from "grapesjs-style-bg";
import gjsTable from "grapesjs-table";
import gjsBlockFlexbox from "grapesjs-blocks-flexbox";
import { customPlugins } from "../customPlugins";
import gjsExport from "grapesjs-plugin-export";
import gjsIndexedDB from "grapesjs-indexeddb";
import gjsNavBar from "grapesjs-navbar";
import { Plugin } from "grapesjs";

export const indexedDBName = "pageDB";

export const plugins = (pageId: string, isNewsLetter: boolean) => {
  const arrayOpts: (string | Plugin<any>)[] | undefined = [
    gjsBlockBasic,
    gjsNavBar,
    grapesjs_plugin_forms,
    grapesjs_ga,
    grapesjs_component_twitch,
    customPlugins,
    grapesjs_tailwind,
    gjsRteExtensions,
    gjsTuiImageEditor,
    gjsCompCodeEditor,
    gjsCustomCode,
    gjsStyleBg,
    gjsExport,
    (editor) =>
      gjsIndexedDB(editor, {
        options: {
          key: isNewsLetter ? `mlrCampaign-${pageId}` : `mlrPage-${pageId}`,
          dbName: isNewsLetter ? "campaignDB" : indexedDBName,
          objectStoreName: isNewsLetter ? "campaigns" : "pages",
        },
      }),
    (editor) => gjsExport(editor, { filenamePfx: "mlr_code" }),
  ];

  return arrayOpts;
};

export const pluginsOpts: Record<string, any> | undefined = {
  gjsCustomCode: {
    codeViewOptions: { theme: "hopscotch", readOnly: 0 },
  },
  [gjsRteExtensions]: {
    // default options
    base: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      link: true,
    },
    fonts: {
      fontColor: true,
      hilite: true,
      // fontSize: true,
      // fontName: true,
    },
    format: {
      // heading1: true,
      // heading2: true,
      // heading3: true,
      //heading4: false,
      //heading5: false,
      //heading6: false,
      // paragraph: true,
      //quote: false,
      clearFormatting: true,
    },
    subscriptSuperscript: true, //|true
    // indentOutdent: true, //|true
    // list: false, //|true
    align: true, //|true
    actions: {
      copy: true,
      cut: true,
      paste: true,
      // delete: true,
    },
    // actions: false, //|true
    // undoredo: true, //|true
    // extra: false, //|true
    darkColorPicker: true, //|false
    maxWidth: "20rem",
  },
};
