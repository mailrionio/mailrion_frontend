import { PanelsConfig } from "grapesjs";

export const panels: PanelsConfig | undefined = {
  defaults: [
    {
      id: "panel-switcher",
      el: ".panel__switcher",
      buttons: [
        {
          id: "select",
          className: "selectIcon",
          command: "sw-visibility",
          context: "core:component-select",
          attributes: { title: "Select element" },
        },
        {
          id: "undo",
          className: "undo",
          command: "core:undo",
          attributes: { title: "Undo (CTRL/CMD + Z)" },
        },
        {
          id: "redo",
          className: "redo",
          command: "core:redo",
          attributes: { title: "Redo (CTRL/CMD + SHIFT + Z)" },
        },
        {
          id: "clean-all",
          className: "trash",
          command: "custom-clear-canvas",
          attributes: { title: "Empty canvas" },
        },
        {
          id: "images",
          className: "image",
          command: "open-assset-manager",
          attributes: { title: "Add Images" },
        },
        {
          id: "export",
          className: "fa fa-code",
          command: "export-template",
          attributes: { title: "View Code" },
        },
        {
          id: "visibility",
          active: true,
          className: "dotted_square",
          command: "sw-visibility", // Built-in command
          attributes: { title: "Show Grid" },
        },
        {
          id: "preview",
          className: "preview",
          command: "preview",
          attributes: { title: "Preview" },
        },
      ],
    },
    {
      id: "panel-switcher1",
      el: ".views-actions",
      buttons: [
        {
          id: "desktop",
          className: "desktopWindow",
          command: "set-device-lg",
          togglable: false,
          active: true,
          attributes: { title: "Desktop" },
        },
        {
          id: "tablet",
          className: "tabWindow",
          command: "set-device-md",
          togglable: false,
          attributes: { title: "Tablet" },
        },
        {
          id: "mobile",
          className: "mobilewindow",
          command: "set-device-sm",
          togglable: false,
          attributes: { title: "Mobile" },
        },
      ],
    },
  ],
};
