import "grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css";
import { setToggleStep } from "@/redux/features/utilSlice";
import React, { useEffect, useState, useRef } from "react";
import { templateData, TemplateEntry } from "@/templates";
import { dispatch, useAppSelector } from "@/redux/store";
import ButtonSpinner from "@/components/ButtonSpiner";
import { MdKeyboardBackspace } from "react-icons/md";
import GrapesJS, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./styles.scss";

const ViewTemplate: React.FC = () => {
  const [editor, setEditor] = useState<Editor>();
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const { category, label } = useParams();
  const { step } = useAppSelector((state) => state.utils);
  const page = useSearchParams()[0].get("page") || "home";
  const [showPreview, setShowPreview] = useState(true);

  if (!category || !label) {
    return <Navigate to={"/pages"} />;
  }

  const tempData = (
    templateData as unknown as { [key: string]: Record<string, TemplateEntry> }
  )[category][label];

  const htmlData: { [key: string]: string } = tempData.content;

  const handleOnEdit = async () => {
    if (editor) {
      const saved = await editor.store();
      if (saved) navigate("/pages");
    }
  };

  // Initialize GrapesJS
  const loadGrapesJs = async () => {
    // Fetch the HTML and extract styles/scripts before initializing GrapesJS
    const response = await fetch(htmlData[page]);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract <body> content
    const bodyContent = doc.body.innerHTML;

    // Extract inline styles
    const inlineStyles = Array.from(doc.querySelectorAll("style")).map(
      (style) => style.innerHTML
    );

    // Extract external styles (links)
    const externalLinks = Array.from(
      doc.querySelectorAll("link[rel='stylesheet']")
    ).map((link) => (link as HTMLLinkElement).href);

    // Extract external scripts
    const externalScripts = Array.from(doc.querySelectorAll("script[src]")).map(
      (script) => (script as HTMLScriptElement).src
    );

    // Initialize the GrapesJS editor
    const editorInstance = GrapesJS.init({
      container: "#gjs",
      fromElement: true,
      height: "100%",
      width: "auto",
      showDevices: false,
      avoidInlineStyle: false,
      devicePreviewMode: true,
      forceClass: false,
      storageManager: false,
      nativeDnD: false,
      showToolbar: false,
      panels: {
        defaults: [
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
      },
      deviceManager: {
        devices: [
          {
            id: "set-device-lg",
            name: "Desktop",
            width: "",
          },
          {
            id: "set-device-md",
            name: "Tablet",
            width: "768px",
          },
          {
            id: "set-device-sm",
            name: "Mobile",
            width: "375px",
            widthMedia: "480px",
          },
        ],
      },
      canvas: {
        styles: [...externalLinks],
        scripts: [...externalScripts],
        customSpots: true,
        allowExternalDrop: false,
        extHl: false,
      },
    });

    setEditor(editorInstance);

    // Inject the HTML content into the editor
    editorInstance.setComponents(bodyContent);

    // Inject inline styles
    editorInstance.setStyle(inlineStyles.join("\n"));

    addCommands(editorInstance);
    actionEvents(editorInstance);
  };

  /** Load custom data */
  const loadCustomData = () => {
    if (editor) {
      const codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
      codeViewer.set({
        ...{ codeName: "htmlmixed", theme: "hopscotch", readOnly: 0 },
      });
      // editor.on("storage:load", onLoad);
    }
  };

  // Commands to add to GrapesJS
  const addCommands = (editor: Editor) => {
    const commands = editor.Commands;
    commands.getAll();
    [
      { device: "Mobile", size: "set-device-sm" },
      { device: "Tablet", size: "set-device-md" },
      { device: "Desktop", size: "set-device-lg" },
    ].forEach((item) => {
      commands.add(item.size, {
        run(editor) {
          editor.setDevice(item.device);
          const button = editor.Panels.getButton(
            "panel-switcher1",
            item.device.toLowerCase()
          );
          if (button)
            button.set("attributes", { style: "background: #edeff0;" });
        },
        stop(editor) {
          const button = editor.Panels.getButton(
            "panel-switcher1",
            item.device.toLowerCase()
          );
          if (button)
            button.set("attributes", { style: "background: initial;" });
        },
      });
    });
  };

  const handleOnScreen = () => {
    if (editor) {
      editor.runCommand("core:fullscreen");
      editor.runCommand("preview");
    }
  };

  const handleOnPreview = () => {
    if (editor) {
      editor.runCommand("preview");
    }
  };

  /** component and canvas action events */
  const actionEvents = (editor: Editor) => {
    editor.on("load", () => {
      const components = editor.DomComponents?.getWrapper()?.find("*") || [];
      components.forEach((component) => {
        component.set({
          editable: false,
          draggable: false,
          droppable: false,
          highlightable: false,
          copyable: false,
        });
      });

      // Make Links clickable on preview mode
      const iframe = editor.Canvas.getDocument();

      if (iframe) {
        iframe.addEventListener("click", (event) => {
          const target = event.target as HTMLAnchorElement;

          if (target.tagName === "A" && target.href) {
            event.preventDefault();
            const url = new URL(target.href);

            // Extract `page` parameter and navigate
            const pageParam = url.searchParams.get("page");
            if (pageParam) {
              navigate(`?page=${pageParam}`);
            }
          }
        });
      }

      const iframee = editor.Canvas.getFrameEl();

      if (iframee) {
        const iframeDoc = iframee.contentDocument;

        if (iframeDoc) {
          iframeDoc.addEventListener("scroll", () => {
            console.log("Iframe scrolled");
          });

          iframeDoc.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            console.log("Clicked:", target);
          });
        }
      }
    });

    editor.on("stop:core:fullscreen", () => {
      editor.stopCommand("preview");
    });

    // Hide Preview button on preview mode
    editor.on("run:preview", () => {
      setShowPreview(false);
    });

    // Show Preview button on preview mode
    editor.on("stop:preview", () => {
      setShowPreview(true);
    });
  };

  const handleGoBack = () => {
    navigate("/pages", { replace: true });
    if (!step[2]) dispatch(setToggleStep(2));
  };

  // Component lifecycle
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadGrapesJs(); // Initialize GrapesJS only once
    } else if (editor) {
      updateEditorContent(); // Update editor content when `page` changes
    }
  }, [editor, page]);

  const updateEditorContent = async () => {
    if (!editor) return;

    try {
      // console.log("Fetching content for page:");
      const response = await fetch(htmlData[page]);
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      const html = await response.text();
      // console.log("Fetched HTML:", html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract the new body content and inline styles
      const bodyContent = doc.body.innerHTML;
      const inlineStyles = Array.from(doc.querySelectorAll("style")).map(
        (style) => style.innerHTML
      );

      // Update the editor with the new content
      editor.setComponents(bodyContent);
      editor.setStyle(inlineStyles.join("\n"));

      console.log("Updated editor content successfully.");
    } catch (error) {
      console.error("Error updating editor content:", error);
    }
  };

  return (
    <div>
      {/* Top Panel */}
      <div className="panelTop">
        <div className="logoContainer">
          <div className="logo">
            <Link to="/" className="logoLink">
              <img src="/Mailrion/Logo-main.png" alt="mailrion logo" />
            </Link>
          </div>
          <div className="back" onClick={handleGoBack}>
            <MdKeyboardBackspace />
            <p>Back To Templates</p>
          </div>
        </div>

        <div className="gjs-panel-action-buttons">
          <div className="views-actions"></div>
        </div>

        <div className="panelAction">
          {showPreview && (
            <button className="btn btn-primary" onClick={handleOnPreview}>
              Preview
            </button>
          )}
          <button className="btn btn-primary" onClick={handleOnScreen}>
            Full Screen
          </button>
          <button className="btn btn-primary" onClick={handleOnEdit}>
            Edit this Site
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="editorCanvas">
        {!editor && (
          <div className="loader">
            <ButtonSpinner />
          </div>
        )}
        <div
          id="gjs"
          style={{ display: editor && htmlData[page] ? "block" : "none" }}
        />
      </div>
    </div>
  );
};

export default ViewTemplate;
