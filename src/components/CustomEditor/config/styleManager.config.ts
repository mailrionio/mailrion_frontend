import { StyleManagerConfig } from "grapesjs";

export const layoutProperties = [
  {
    property: "top",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "top",
    name: "Top",
    toRequire: true,
  },
  {
    property: "right",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "right",
    name: "Right",
    toRequire: true,
  },
  {
    property: "bottom",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "bottom",
    name: "Bottom",
    toRequire: true,
  },
  {
    property: "left",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    id: "left",
    name: "Left",
    toRequire: true,
  },
  {
    property: "flex-basis",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "order",
    type: "integer",
    default: "0",
    requiresParent: {
      display: ["flex"],
    },
    name: "order",
    defaults: "",
    toRequire: true,
  },
  {
    property: "flex-grow",
    type: "number",
    default: "0",
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "flex-shrink",
    type: "number",
    default: "1",
    requiresParent: {
      display: ["flex"],
    },
  },
  {
    property: "float",
    type: "radio",
    default: "none",
    options: [
      {
        id: "none",
      },
      {
        id: "left",
      },
      {
        id: "right",
      },
    ],
  },
  {
    property: "position",
    type: "radio",
    default: "static",
    options: [
      {
        id: "static",
      },
      {
        id: "relative",
      },
      {
        id: "absolute",
      },
      {
        id: "fixed",
      },
    ],
    name: "Position",
    id: "position",
    toRequire: true,
  },
  {
    property: "display",
    type: "select",
    default: "block",
    options: [
      {
        id: "block",
      },
      {
        id: "inline",
      },
      {
        id: "inline-block",
      },
      {
        id: "flex",
      },
      {
        id: "none",
      },
    ],
    name: "Display",
    id: "display",
    toRequire: true,
  },
  {
    property: "flex-direction",
    type: "select",
    default: "row",
    options: [
      {
        id: "row",
      },
      {
        id: "row-reverse",
      },
      {
        id: "column",
      },
      {
        id: "column-reverse",
      },
    ],
    requires: {
      display: ["flex"],
    },
    toRequire: true,
    id: "flex-direction",
    defaults: "row",
  },
  {
    property: "flex-wrap",
    type: "select",
    default: "nowrap",
    options: [
      {
        id: "nowrap",
      },
      {
        id: "wrap",
      },
      {
        id: "wrap-reverse",
      },
    ],
    requires: {
      display: ["flex"],
    },
  },
  {
    property: "justify-content",
    type: "select",
    default: "flex-start",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "space-between",
      },
      {
        id: "space-around",
      },
      {
        id: "space-evenly",
      },
    ],
    requires: {
      display: ["flex"],
    },
    name: "Justify-content",
    defaults: "flex-start",
    toRequire: true,
  },
  {
    property: "align-items",
    type: "select",
    default: "stretch",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "baseline",
      },
      {
        id: "stretch",
      },
    ],
    requires: {
      display: ["flex"],
    },
    name: "align-items",
    defaults: "center",
    toRequire: true,
  },
  {
    property: "align-content",
    type: "select",
    default: "stretch",
    options: [
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "space-between",
      },
      {
        id: "space-around",
      },
      {
        id: "stretch",
      },
    ],
    requires: {
      display: ["flex"],
    },
  },
  {
    property: "align-self",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "flex-start",
      },
      {
        id: "flex-end",
      },
      {
        id: "center",
      },
      {
        id: "baseline",
      },
      {
        id: "stretch",
      },
    ],
    requiresParent: {
      display: ["flex"],
    },
    name: "align-self",
    defaults: "auto",
    toRequire: true,
  },
];

export const boxModelProperties = [
  {
    property: "margin-top",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-right",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-bottom",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "margin-left",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
  },
  {
    property: "padding-top",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-right",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-bottom",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "padding-left",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
  },
  {
    property: "width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    toRequire: true,
    name: "Width",
    id: "width",
  },
  {
    property: "min-width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Min Width",
    id: "min-width",
    toRequire: true,
  },
  {
    property: "max-width",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Max Width",
    id: "max-width",
    toRequire: true,
  },
  {
    property: "height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    toRequire: true,
    name: "Height",
    id: "height",
  },
  {
    property: "min-height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Min Height",
    id: "min-height",
    toRequire: true,
  },
  {
    property: "max-height",
    type: "number",
    default: "auto",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["initial", "inherit", "auto"],
    min: 0,
    name: "Max Height",
    id: "max-height",
    toRequire: true,
  },
  {
    property: "border-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-top-left-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-top-right-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-bottom-left-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-bottom-right-radius",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "border-width",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "margin",
    type: "composite",
    properties: [
      {
        property: "margin-top",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-top-sub",
      },
      {
        property: "margin-right",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-right-sub",
      },
      {
        property: "margin-bottom",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-bottom-sub",
      },
      {
        property: "margin-left",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        id: "margin-left-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "padding",
    type: "composite",
    properties: [
      {
        property: "padding-top",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-top-sub",
      },
      {
        property: "padding-right",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-right-sub",
      },
      {
        property: "padding-bottom",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-bottom-sub",
      },
      {
        property: "padding-left",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        fixedValues: ["initial", "inherit", "auto"],
        min: 0,
        id: "padding-left-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "border",
    type: "composite",
    properties: [
      {
        property: "border-width",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-width-sub",
      },
      {
        property: "border-style",
        type: "select",
        default: "solid",
        options: [
          {
            id: "none",
          },
          {
            id: "solid",
          },
          {
            id: "dotted",
          },
          {
            id: "dashed",
          },
          {
            id: "double",
          },
          {
            id: "groove",
          },
          {
            id: "ridge",
          },
          {
            id: "inset",
          },
          {
            id: "outset",
          },
        ],
        id: "border-style-sub",
      },
      {
        property: "border-color",
        type: "color",
        default: "black",
        full: true,
        id: "border-color-sub",
      },
    ],
  },
  {
    property: "border-radius",
    type: "composite",
    properties: [
      {
        property: "border-top-left-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-top-left-radius-sub",
      },
      {
        property: "border-top-right-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-top-right-radius-sub",
      },
      {
        property: "border-bottom-right-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-bottom-right-radius-sub",
      },
      {
        property: "border-bottom-left-radius",
        type: "number",
        default: "0",
        units: ["px", "%", "em", "rem", "vh", "vw"],
        min: 0,
        id: "border-bottom-left-radius-sub",
      },
    ],
    toRequire: true,
  },
];

export const typographyProperties = [
  {
    property: "text-shadow-h",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "font-size",
    type: "number",
    default: "medium",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: [
      "medium",
      "xx-small",
      "x-small",
      "small",
      "large",
      "x-large",
      "xx-large",
      "smaller",
      "larger",
      "length",
      "initial",
      "inherit",
    ],
    min: 0,
  },
  {
    property: "letter-spacing",
    type: "number",
    default: "normal",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["normal", "initial", "inherit"],
    name: "Letter Spacing",
    id: "letter-spacing",
    toRequire: true,
  },
  {
    property: "line-height",
    type: "number",
    default: "normal",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    fixedValues: ["normal", "initial", "inherit"],
    name: "Line Height",
    id: "line-height",
    toRequire: true,
  },
  {
    property: "text-shadow-v",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "text-shadow-blur",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "text-align",
    type: "radio",
    default: "left",
    options: [
      {
        id: "left",
        label: "Left",
      },
      {
        id: "center",
        label: "Center",
      },
      {
        id: "right",
        label: "Right",
      },
      {
        id: "justify",
        label: "Justify",
      },
    ],
    defaults: "left",
    toRequire: true,
  },
  {
    property: "color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "text-shadow-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "font-family",
    type: "select",
    default: "Arial, Helvetica, sans-serif",
    options: [
      {
        id: "Arial, Helvetica, sans-serif",
        label: "Arial",
      },
      {
        id: "Arial Black, Gadget, sans-serif",
        label: "Arial Black",
      },
      {
        id: "Brush Script MT, sans-serif",
        label: "Brush Script MT",
      },
      {
        id: "Comic Sans MS, cursive, sans-serif",
        label: "Comic Sans MS",
      },
      {
        id: "Courier New, Courier, monospace",
        label: "Courier New",
      },
      {
        id: "Georgia, serif",
        label: "Georgia",
      },
      {
        id: "Helvetica, sans-serif",
        label: "Helvetica",
      },
      {
        id: "Impact, Charcoal, sans-serif",
        label: "Impact",
      },
      {
        id: "Lucida Sans Unicode, Lucida Grande, sans-serif",
        label: "Lucida Sans Unicode",
      },
      {
        id: "Tahoma, Geneva, sans-serif",
        label: "Tahoma",
      },
      {
        id: "Times New Roman, Times, serif",
        label: "Times New Roman",
      },
      {
        id: "Trebuchet MS, Helvetica, sans-serif",
        label: "Trebuchet MS",
      },
      {
        id: "Verdana, Geneva, sans-serif",
        label: "Verdana",
      },
    ],
  },
  {
    property: "font-weight",
    type: "select",
    default: "400",
    options: [
      {
        id: "100",
        label: "Thin",
      },
      {
        id: "200",
        label: "Extra-Light",
      },
      {
        id: "300",
        label: "Light",
      },
      {
        id: "400",
        label: "Normal",
      },
      {
        id: "500",
        label: "Medium",
      },
      {
        id: "600",
        label: "Semi-Bold",
      },
      {
        id: "700",
        label: "Bold",
      },
      {
        id: "800",
        label: "Extra-Bold",
      },
      {
        id: "900",
        label: "Ultra-Bold",
      },
    ],
    name: "Font Weight",
    id: "font-weight",
    toRequire: true,
  },
  {
    property: "text-shadow",
    type: "stack",
    properties: [
      {
        property: "text-shadow-h",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "text-shadow-v",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "text-shadow-blur",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
      },
      {
        property: "text-shadow-color",
        type: "color",
        default: "black",
        full: true,
      },
    ],
    preview: true,
    default: "none",
    toRequire: true,
  },
];

export const effectProperties = [
  {
    property: "box-shadow-h",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "box-shadow-v",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "box-shadow-blur",
    type: "number",
    default: "5px",
    units: ["px", "em", "rem", "vh", "vw"],
    min: 0,
  },
  {
    property: "box-shadow-spread",
    type: "number",
    default: "0",
    units: ["px", "em", "rem", "vh", "vw"],
  },
  {
    property: "box-shadow-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "opacity",
    type: "slider",
    default: "1",
    min: 0,
    max: 1,
    step: 0.01,
    full: true,
    defaults: "",
    toRequire: true,
  },
  {
    property: "box-shadow-type",
    type: "select",
    default: "",
    options: [
      {
        id: "",
        label: "Outside",
      },
      {
        id: "inset",
        label: "Inside",
      },
    ],
  },
  {
    property: "box-shadow",
    type: "stack",
    properties: [
      {
        property: "box-shadow-h",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-v",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-blur",
        type: "number",
        default: "5px",
        units: ["px", "em", "rem", "vh", "vw"],
        min: 0,
      },
      {
        property: "box-shadow-spread",
        type: "number",
        default: "0",
        units: ["px", "em", "rem", "vh", "vw"],
      },
      {
        property: "box-shadow-color",
        type: "color",
        default: "black",
        full: true,
      },
      {
        property: "box-shadow-type",
        type: "select",
        default: "",
        options: [
          {
            id: "",
            label: "Outside",
          },
          {
            id: "inset",
            label: "Inside",
          },
        ],
      },
    ],
    preview: true,
    id: "box-shadow",
    toRequire: true,
  },
];

export const backgroundProperties = [
  {
    property: "background-color",
    type: "color",
    default: "none",
    full: true,
  },
  {
    property: "background-image",
    type: "file",
    functionName: "url",
    default: "none",
    full: true,
  },
  {
    property: "background-repeat",
    type: "select",
    default: "repeat",
    options: [
      {
        id: "repeat",
      },
      {
        id: "repeat-x",
      },
      {
        id: "repeat-y",
      },
      {
        id: "no-repeat",
      },
    ],
  },
  {
    property: "background-position",
    type: "select",
    default: "left top",
    options: [
      {
        id: "left top",
      },
      {
        id: "left center",
      },
      {
        id: "left bottom",
      },
      {
        id: "right top",
      },
      {
        id: "right center",
      },
      {
        id: "right bottom",
      },
      {
        id: "center top",
      },
      {
        id: "center center",
      },
      {
        id: "center bottom",
      },
    ],
  },
  {
    property: "background-attachment",
    type: "select",
    default: "scroll",
    options: [
      {
        id: "scroll",
      },
      {
        id: "fixed",
      },
      {
        id: "local",
      },
    ],
  },
  {
    property: "background-size",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "cover",
      },
      {
        id: "contain",
      },
    ],
  },
  {
    property: "background",
    type: "stack",
    properties: [
      {
        property: "background-image",
        type: "file",
        functionName: "url",
        default: "none",
        full: true,
        id: "background-image-sub",
      },
      {
        property: "background-repeat",
        type: "select",
        default: "repeat",
        options: [
          {
            id: "repeat",
          },
          {
            id: "repeat-x",
          },
          {
            id: "repeat-y",
          },
          {
            id: "no-repeat",
          },
        ],
        id: "background-repeat-sub",
      },
      {
        property: "background-position",
        type: "select",
        default: "left top",
        options: [
          {
            id: "left top",
          },
          {
            id: "left center",
          },
          {
            id: "left bottom",
          },
          {
            id: "right top",
          },
          {
            id: "right center",
          },
          {
            id: "right bottom",
          },
          {
            id: "center top",
          },
          {
            id: "center center",
          },
          {
            id: "center bottom",
          },
        ],
        id: "background-position-sub",
      },
      {
        property: "background-attachment",
        type: "select",
        default: "scroll",
        options: [
          {
            id: "scroll",
          },
          {
            id: "fixed",
          },
          {
            id: "local",
          },
        ],
        id: "background-attachment-sub",
      },
      {
        property: "background-size",
        type: "select",
        default: "auto",
        options: [
          {
            id: "auto",
          },
          {
            id: "cover",
          },
          {
            id: "contain",
          },
        ],
        id: "background-size-sub",
      },
    ],
    preview: true,
    detached: true,
    name: "Background",
    id: "background",
    toRequire: true,
  },
];

export const transitionProperties = [
  {
    property: "transition-duration",
    type: "number",
    default: "2s",
    units: ["s", "ms"],
    min: 0,
  },
  {
    property: "perspective",
    type: "number",
    default: "0",
    units: ["px", "%", "em", "rem", "vh", "vw"],
    min: 0,
    id: "perspective",
    name: "Perspective",
    toRequire: true,
  },
  {
    property: "transition-property",
    type: "select",
    default: "width",
    options: [
      {
        id: "all",
      },
      {
        id: "width",
      },
      {
        id: "height",
      },
      {
        id: "background-color",
      },
      {
        id: "transform",
      },
      {
        id: "box-shadow",
      },
      {
        id: "opacity",
      },
    ],
  },
  {
    property: "transition-timing-function",
    type: "select",
    default: "ease",
    options: [
      {
        id: "linear",
      },
      {
        id: "ease",
      },
      {
        id: "ease-in",
      },
      {
        id: "ease-out",
      },
      {
        id: "ease-in-out",
      },
    ],
  },
  {
    property: "transition",
    type: "stack",
    properties: [
      {
        property: "transition-property",
        type: "select",
        default: "width",
        options: [
          {
            id: "all",
          },
          {
            id: "width",
          },
          {
            id: "height",
          },
          {
            id: "background-color",
          },
          {
            id: "transform",
          },
          {
            id: "box-shadow",
          },
          {
            id: "opacity",
          },
        ],
        id: "transition-property-sub",
      },
      {
        property: "transition-duration",
        type: "number",
        default: "2s",
        units: ["s", "ms"],
        min: 0,
        id: "transition-duration-sub",
      },
      {
        property: "transition-timing-function",
        type: "select",
        default: "ease",
        options: [
          {
            id: "linear",
          },
          {
            id: "ease",
          },
          {
            id: "ease-in",
          },
          {
            id: "ease-out",
          },
          {
            id: "ease-in-out",
          },
        ],
        id: "transition-timing-function-sub",
      },
    ],
    toRequire: true,
  },
  {
    property: "transform",
    type: "stack",
    layerSeparator: " ",
    properties: [
      {
        property: "transform-type",
        name: "Type",
        type: "select",
        default: "rotateZ",
        full: true,
        options: [
          {
            id: "scaleX",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "scaleY",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "scaleZ",
            propValue: {
              units: [""],
              step: 0.01,
            },
          },
          {
            id: "rotateX",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "rotateY",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "rotateZ",
            propValue: {
              units: ["deg", "rad", "grad"],
              step: 1,
            },
          },
          {
            id: "translateX",
            propValue: {
              units: ["px", "%", "em", "rem", "vh", "vw"],
              step: 1,
            },
          },
          {
            id: "translateY",
            propValue: {
              units: ["px", "%", "em", "rem", "vh", "vw"],
              step: 1,
            },
          },
        ],
      },
      {
        property: "transform-value",
        type: "number",
        default: "0",
        full: true,
      },
    ],
    id: "transform",
    toRequire: true,
  },
];

export const otherProperties = [
  {
    property: "border-color",
    type: "color",
    default: "black",
    full: true,
  },
  {
    property: "border-style",
    type: "select",
    default: "solid",
    options: [
      {
        id: "none",
      },
      {
        id: "solid",
      },
      {
        id: "dotted",
      },
      {
        id: "dashed",
      },
      {
        id: "double",
      },
      {
        id: "groove",
      },
      {
        id: "ridge",
      },
      {
        id: "inset",
      },
      {
        id: "outset",
      },
    ],
  },
  {
    property: "cursor",
    type: "select",
    default: "auto",
    options: [
      {
        id: "auto",
      },
      {
        id: "pointer",
      },
      {
        id: "copy",
      },
      {
        id: "crosshair",
      },
      {
        id: "grab",
      },
      {
        id: "grabbing",
      },
      {
        id: "help",
      },
      {
        id: "move",
      },
      {
        id: "text",
      },
    ],
  },
  {
    property: "overflow",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
  {
    property: "overflow-x",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
  {
    property: "overflow-y",
    type: "select",
    default: "visible",
    options: [
      {
        id: "visible",
      },
      {
        id: "hidden",
      },
      {
        id: "scroll",
      },
      {
        id: "auto",
      },
    ],
  },
];

export const styleManager: StyleManagerConfig | undefined = {
  appendTo: ".styles-container",
  sectors: [
    {
      open: true,
      name: "Typography",
      properties: [
        {
          name: "Text Transform",
          property: "text-transform",
          type: "select",
          defaults: "none",
          options: [
            { id: "none", label: "none" },
            { id: "capitalize", label: "capitalize" },
            { id: "uppercase", label: "uppercase" },
            { id: "lowercase", label: "lowercase" },
          ],
        },
        {
          name: "Text Decoration",
          property: "text-decoration",
          type: "select",
          defaults: "none",
          options: [
            { id: "none", label: "none" },
            { id: "underline", label: "underline" },
            { id: "overline", label: "overline" },
            { id: "line-through", label: "line through" },
          ],
        },
        {
          name: "Vertical Align",
          property: "vertical-align",
          type: "select",
          defaults: "top",
          options: [
            { id: "top", label: "top" },
            { id: "middle", label: "middle" },
            { id: "bottom", label: "bottom" },
            { id: "baseline", label: "baseline" },
          ],
        },
      ],
      buildProps: [
        "text-shadow-h",
        "font-size",
        "letter-spacing",
        "line-height",
        "text-shadow-v",
        "text-shadow-blur",
        "text-align",
        "text-transform",
        "text-decoration",
        "color",
        "text-shadow-color",
        "font-family",
        "font-weight",
        "text-shadow",
        "vertical-align",
      ],
    },
    {
      name: "Layout",
      open: false,
      // properties: layoutProperties,
      buildProps: [
        "top",
        "right",
        "bottom",
        "left",
        "flex-basis",
        "order",
        "flex-grow",
        "flex-shrink",
        "float",
        "position",
        "display",
        "flex-direction",
        "flex-wrap",
        "justify-content",
        "align-items",
        "align-content",
        "align-self",
      ],
    },
    {
      open: false,
      name: "Box Model",
      // properties: boxModelProperties,
      buildProps: [
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "border-radius",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-width",
        "margin",
        "padding",
        "border",
        "border-radius",
      ],
    },
    {
      open: false,
      name: "Effects",
      // properties: effectProperties,
      buildProps: [
        "box-shadow-h",
        "box-shadow-v",
        "box-shadow-blur",
        "box-shadow-spread",
        "box-shadow-color",
        "opacity",
        "box-shadow-type",
        "box-shadow",
      ],
    },
    {
      open: false,
      name: "Background",
      // properties: backgroundProperties,
      buildProps: [
        "background-color",
        "background-image",
        "background-repeat",
        "background-position",
        "background-attachment",
        "background-size",
        "background",
      ],
    },
    {
      open: false,
      name: "Transition",
      // properties: transitionProperties,
      buildProps: [
        "transition-duration",
        "perspective",
        "transition-property",
        "transition-timing-function",
        "transition",
        "transform",
      ],
    },
    {
      open: false,
      name: "Others",
      // properties: otherProperties,
      buildProps: [
        "border-color",
        "border-style",
        "cursor",
        "overflow",
        "overflow-x",
        "overflow-y",
      ],
    },
  ],
};
