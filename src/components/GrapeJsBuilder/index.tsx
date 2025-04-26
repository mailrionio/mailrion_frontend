/* eslint-disable @typescript-eslint/no-explicit-any */
import Grapesjs from "grapesjs";
import GrapesConfig from "./config";
import "./style.scss";

interface GrapeJsBuilderProps {
  onHtmlChange: (html: string) => void;
}

const GrapeJsBuilder = ({ onHtmlChange }: GrapeJsBuilderProps) => {
  const loadComponent = (editor: any) => {
    editor.BlockManager.add("my-block-id", {
      // ...
      content: {
        tagName: "div",
        draggable: false,
        attributes: { "some-attribute": "some-value" },
        components: [
          {
            tagName: "span",
            content: "<b>Some static content</b>",
          },
          {
            tagName: "div",
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: "<span>HTML at some point</span>",
          },
        ],
      },
    });

    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Exp",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor: any) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`
              )
              .open();
          },
        },
      ],
    });
  };

  const loadGrapeJs = async () => {
    const editor = await Grapesjs.init(GrapesConfig());
    editor.on("change", () => {
      const html = editor.getHtml();
      onHtmlChange(html);
    });
    loadComponent(editor);
  };
  return (
    <div>
      <>
        <div className="panel__top">
          <div className="panel__basic-actions"></div>
        </div>
        <div
          id="WysiwygEditorApp"
          style={{
            position: "fixed",
            inset: "0px",
            zIndex: "100",
            background: "aliceblue",
            display: "none",
            border: "1px solid #000",
          }}
        >
          <h1>Hello World</h1>
        </div>
        <div id="blocks"></div>
      </>
      <div
        className="gen"
        onClick={() => {
          const element = document.getElementById("WysiwygEditorApp");
          if (element) {
            element.style.display = "block";
          }
          loadGrapeJs();
        }}
      >
        Use Page Builder
      </div>
      <div id="WysiwygEditorAppHtml" className={`mt-2 mb-2`}></div>
    </div>
  );
};

export default GrapeJsBuilder;
