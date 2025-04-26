import { BuilderUpdData } from "@/redux/features/BuilderUploadSlice/services";
import "grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css";
import { storageManager } from "./storageManager.config";
import { plugins, pluginsOpts } from "./plugins.config";
import { deviceManager } from "./deviceManager.config";
import { styleManager } from "./styleManager.config";
import { assetManager } from "./assetManager.config";
import "grapesjs/dist/css/grapes.min.css";
import { canvas } from "./canvas.config";
import { panels } from "./panels.config";
import { EditorConfig } from "grapesjs";

export interface IGrapesCanvas {
  styles: string[];
  scripts: string[];
}

export const GrapesjsConfig = (
  isNewsLetter: boolean,
  pageId: string,
  userId: string,
  orgId: string,
  otherData: {},
  assetArr: BuilderUpdData[],
  canvasData?: IGrapesCanvas
) => {
  const config: EditorConfig = {
    container: "#gjs",
    fromElement: true,
    height: "100%",
    width: "auto",
    showDevices: false,
    avoidInlineStyle: true,
    forceClass: false,
    blockManager: {
      appendTo: "#blocks",
    },
    deviceManager,
    layerManager: {
      appendTo: ".layers-container",
    },
    panels,
    domComponents: {},
    assetManager: assetManager(assetArr),
    plugins: plugins(pageId, isNewsLetter),
    pluginsOpts,
    colorPicker: { appendTo: "parent", offset: { top: 26, left: -180 } },
    selectorManager: {
      appendTo: "#traits-container",
      componentFirst: true,
    },
    traitManager: {
      appendTo: "#traits-container",
    },
    styleManager,
    storageManager: storageManager(
      userId,
      pageId,
      isNewsLetter,
      otherData,
      orgId,
      canvasData
    ),
    canvas: canvas(isNewsLetter),
  };

  return config;
};
