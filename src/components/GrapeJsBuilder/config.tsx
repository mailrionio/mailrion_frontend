// import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";

const GrapesConfig = () => {
  // const plugin = grapesjs.plugins.get("gjs-preset-webpage");
  return {
    container: "#WysiwygEditorApp",
    fromElement: true,
    height: "350px",
    width: "auto",
    // plugins: [grapesjsPresetWebpage],
    // pluginsOpts: {
    //   [`${grapesjsPresetWebpage}`]: {
    //     blocks: [
    //       "link-block",
    //       "quote",
    //       "text-basic",
    //       "text",
    //       "column1",
    //       "image",
    //       "video",
    //       "map",
    //       "button",
    //       "link",
    //       "list",
    //       "table",
    //       "grid-items",
    //     ],
    //     modalImportTitle: "Import Template",
    //     modalImportButton: "Import",
    //     modalImportLabel:
    //       '<div style="margin-bottom: 10px">Paste here your HTML/CSS and click Import</div>',
    //     modalImportContent: function (editor: {
    //       getHtml: () => string;
    //       getCss: () => string;
    //     }) {
    //       return editor.getHtml() + "<style>" + editor.getCss() + "</style>";
    //     },
    //   },
    // },

    blockManager: {
      appendTo: "#blocks",
      blocks: [
        {
          id: "section", // id is mandatory
          label: "<b>Section</b>", // You can use HTML/SVG inside labels
          attributes: { class: "gjs-block-section" },
          content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
        },
        {
          id: "text",
          label: "Text",
          content: '<div data-gjs-type="text">Insert your text here</div>',
        },
        {
          id: "image",
          label: "Image",
          // Select the component once it's dropped
          select: true,
          // You can pass components as a JSON instead of a simple HTML string,
          // in this case we also use a defined component type `image`
          content: { type: "image" },
          // This triggers `active` event on dropped components and the `image`
          // reacts by opening the AssetManager
          activate: true,
        },
        {
          id: "video",
          label: "Video",
          select: true,
          // You can pass components as a JSON instead of a simple HTML string,
          // in this case we also use a defined component type `image`
          content: { type: "video" },
          // This triggers `active` event on dropped components and the `image`
          // reacts by opening the AssetManager
          activate: true,
        },
        {
          id: "link-block",
          label: "Link Block",
          select: true,
          content: {
            type: "link",
            editable: false,
            droppable: true,
            style: {
              display: "inline-block",
              padding: "5px",
              "min-height": "50px",
              "min-width": "50px",
            },
          },
          activate: true,
        },
        {
          id: "quote",
          label: "Quote",
          content: `<blockquote class="quote">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit`,
        },
      ],
    },
    storageManager: false,
    panels: { defaults: [] },
  };
};

export default GrapesConfig;
