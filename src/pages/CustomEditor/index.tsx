import {
  DeleteBuilderFileAPI,
  GetAllBuilderUploadAPI,
} from "@/redux/features/BuilderUploadSlice/services";
import { AdminComposeNewMail } from "@/redux/features/mailingSlice/services";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { inlineStyles, toTitleCase, transformSelection } from "@/helpers";
import { emailTempData, templateData, TemplateEntry } from "@/templates";
import { setTemplate, setToggleStep } from "@/redux/features/utilSlice";
import { useEffect, useState, useRef, ChangeEvent, memo } from "react";
import { UpperCaseIcon, LowerCaseIcon, TitleCaseIcon } from "@/assets";
import "grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GrapesjsConfig } from "@/components/CustomEditor/config";
import { MdOutlineErrorOutline, MdPalette } from "react-icons/md";
import usePageMetadata from "@/components/UsePageMetadata";
import { dispatch, useAppSelector } from "@/redux/store";
import { contentHTML } from "@/helpers/content.helper";
import ButtonSpinner from "@/components/ButtonSpiner";
import { IoMailOpenSharp } from "react-icons/io5";
import { BsArrowRepeat } from "react-icons/bs";
import {
  GetPageTemplateAPI,
  IGetPageTemplateResp,
} from "@/redux/features/PagesSlice/services";
import { stripQuotes } from "@/helpers/strip";
import grapesjs, { Editor } from "grapesjs";
import {
  ICampaignResp,
  ShowCampaignAPI,
} from "@/redux/features/campaign/service";
import "grapesjs/dist/css/grapes.min.css";
import { GrTasks } from "react-icons/gr";
import html2canvas from "html2canvas";
import {
  dbCampaignOpts,
  dbOptions,
  ICampaignDB,
  IndexedDBCrud,
  IPageIndexedDB,
  ManagerState,
} from "@/helpers/indexedbd.helper";
import $ from "jquery";
import "./styles.scss";

const CustomEditor: React.FC = () => {
  const { template, step, isNewsLetter } = useAppSelector(
    (state) => state.utils
  );
  const { admin: user } = useAppSelector((state) => state.user);
  const {
    isLoading: isLoadingPage,
    errorLoading,
    isLoadingGet,
  } = useAppSelector((state) => state.landingPage);
  const [manager, setManager] = useState<ManagerState>({
    style: !isNewsLetter,
    layer: false,
    email: isNewsLetter,
  });
  const [textValue, setTextValue] = useState({
    To: `${user.name} <${user.email}>`,
    Subject: "Hello World!",
    Preheader: "[Test] - This is test email preview - MailRion",
  });
  const [editor, setEditor] = useState<Editor>();
  const [showIsLoading, setShowIsLoading] = useState(true);
  const [isLoadingUpd, setIsLoadingUpd] = useState<boolean>(false);
  const [builder, setBuilder] = useState({
    panelRight: false,
    panelLeft: true,
  });
  const [isExiting, setIsExiting] = useState({
    panelLeft: false,
    panelRight: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { pageId } = useParams();
  let htmlData: Record<string, string> | null = null;
  const { category, label } = template;
  const pageDB = new IndexedDBCrud<IPageIndexedDB>(dbOptions);
  const campaignDB = new IndexedDBCrud<ICampaignDB>(dbCampaignOpts);
  const [storeSaved, setStoreSaved] = useState({
    isSaving: false,
    isError: {
      store: false,
      load: false,
    },
  });
  const {
    selectedOrganization: { id: orgID },
  } = useAppSelector((state) => state.organization);
  const { isSaving, isError } = storeSaved;
  const params = useSearchParams()[0];
  const orgsId = params.get("orgsId");
  const orgsNum = params.get("orgsNum");
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const initialized = localStorage.getItem("initialized");
  const campaignName = localStorage.getItem("campaignName");
  const pageName = localStorage.getItem("pageName");
  // Set isNewsLetter (Campaign) to true if orgsId exist else false
  localStorage.setItem("isNewsLetter", orgsId && orgsNum ? "true" : "false");
  if (!initialized) localStorage.setItem("initialized", "false");
  const goBackURL = (isModal = false) =>
    isNewsLetter
      ? `/organization/${orgsId}/new-campaign/${pageId}${
          isModal ? `?modal=true&orgsNum=${orgsNum}` : `?orgsNum=${orgsNum}`
        }`
      : "/pages/1";

  usePageMetadata({
    title: "Editor",
    description: "Drag and drop to create site",
  });

  const ToCaptureRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = async (): Promise<Blob | null> => {
    if (!editor) return null;

    const html = editor.getHtml();
    const css = editor.getCss();
    const initTempData = await initialTemplateLoad();

    // Get a page by key
    const page = await pageDB.get(`mlrPage-${pageId}`);
    const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
    const canvasData = (isNewsLetter ? campaign : page)?.canvasData;

    const content = contentHTML({
      html,
      css,
      showScripts: true,
      showTailwindScript: true,
      canvasData,
      initTempData,
    });

    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.width = "900px";
      iframe.style.height = "700px";
      iframe.style.position = "absolute";
      iframe.style.top = "-999px"; // Keep it off-screen initially
      document.body.appendChild(iframe);

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();

        iframe.onload = () => {
          setTimeout(async () => {
            const canvas = await html2canvas(iframeDoc.body, {
              useCORS: true,
              scale: window.devicePixelRatio,
              width: iframe.clientWidth,
              height: iframe.clientHeight,
            });

            canvas.toBlob((blob) => {
              document.body.removeChild(iframe);
              resolve(blob || null); // Resolve with Blob or null
            }, "image/png");
          }, 1000);
        };
      } else {
        resolve(null);
      }
    });
  };

  // Check if Template was Selected
  if (category && label) {
    const tempData = (
      (isNewsLetter ? emailTempData : templateData) as unknown as {
        [key: string]: Record<string, TemplateEntry>;
      }
    )[category][label];

    htmlData = tempData.content;
  }

  if (!pageId) {
    navigate(goBackURL());
    return;
  }

  const handleOnDone = async () => {
    if (editor) {
      await updateDataToDB(editor);
      navigate(goBackURL(false));

      if (step[1]) {
        dispatch(setToggleStep(1));
      }

      if (step[2]) {
        dispatch(setToggleStep(2));
      }
    }

    if (category && label) {
      localStorage.setItem("category", JSON.stringify(null));
      localStorage.setItem("label", JSON.stringify(null));
      dispatch(setTemplate({ category: null, label: null }));
    }

    if (!isNewsLetter) {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("pages-") || key.startsWith("meta-")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };

  const handleManager = (key: keyof ManagerState) => {
    setManager((prevState) => {
      // Create a new state with all keys set to false
      const newState: ManagerState = Object.keys(prevState).reduce(
        (acc, curr) => {
          acc[curr as keyof ManagerState] = false;
          return acc;
        },
        {} as ManagerState
      );

      // Set the selected key to true
      newState[key] = true;

      return newState;
    });
  };

  const adjustRtePosition = () => {
    const rteToolbar = document.querySelector<HTMLElement>(".gjs-rte-toolbar");
    const canvas = document.querySelector<HTMLElement>("iframe");

    if (rteToolbar && canvas) {
      // Calculate bounding rectangles once
      const canvasRect = canvas.getBoundingClientRect();
      const toolbarRect = rteToolbar.getBoundingClientRect();

      // Use these variables for overflow detection
      if (toolbarRect.x > -180) {
        rteToolbar.classList.add("fixed-rte-toolbar");
      } else {
        rteToolbar.classList.remove("fixed-rte-toolbar");
      }
    }
  };

  const initialTemplateLoad = async () => {
    // Fetch the HTML and extract styles/scripts before initializing GrapesJS
    if (htmlData) {
      const response = await fetch(htmlData["home"]);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract <body> content
      const bodyContent = doc.body.innerHTML;

      // Extract <head> content
      const headContent = doc.head.innerHTML;

      // Extract inline styles
      const inlineStyles = Array.from(doc.querySelectorAll("style")).map(
        (style) => style.innerHTML
      );

      // Extract external styles (links)
      const externalLinks = Array.from(
        doc.querySelectorAll("link[rel='stylesheet']")
      ).map((link) => (link as HTMLLinkElement).href);

      // Extract external scripts
      const externalScripts = Array.from(
        doc.querySelectorAll("script[src]")
      ).map((script) => (script as HTMLScriptElement).src);

      return {
        headContent,
        bodyContent,
        inlineStyles,
        externalLinks,
        externalScripts,
      };
    }
  };

  const newsLetterInit = (editor: Editor) => {
    const init = localStorage.getItem("initialized");

    if (isNewsLetter && editor.getHtml().length <= 23 && init === "true") {
      editor.DomComponents.addComponent({
        tagName: "table",
        type: "table",
        removable: false,
        draggable: false,
        copyable: false,
        attributes: { class: "main-body" },
        components: [
          {
            tagName: "tbody",
            type: "tbody",
            removable: false,
            draggable: false,
            copyable: false,
            components: [
              {
                tagName: "tr",
                type: "row",
                removable: false,
                draggable: false,
                copyable: false,
                components: [
                  {
                    tagName: "td",
                    type: "cell",
                    removable: false,
                    draggable: false,
                    copyable: false,
                    attributes: { class: "main-body-cell" },
                    style: {
                      "vertical-align": "middle",
                      margin: 0,
                    },
                    components: [
                      {
                        tagName: "table",
                        type: "table",
                        removable: false,
                        draggable: false,
                        copyable: false,
                        attributes: { class: "container" },
                        components: [
                          {
                            tagName: "tbody",
                            type: "tbody",
                            removable: false,
                            draggable: false,
                            copyable: false,
                            components: [
                              {
                                tagName: "tr",
                                type: "row",
                                removable: false,
                                draggable: false,
                                copyable: false,
                                components: [
                                  {
                                    tagName: "td",
                                    type: "cell",
                                    removable: false,
                                    draggable: false,
                                    copyable: false,
                                    attributes: { class: "container" },
                                    style: {
                                      "vertical-align": "middle",
                                      margin: 0,
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        style: {
                          "border-collapse": "separate",
                          "border-spacing": "5px",
                          "max-width": "600px",
                          margin: "auto",
                          width: "90%",
                          "min-height": "150px",
                          padding: "3px",
                          background: "#ffffff",
                          "box-shadow": "0 3px 6px 0 #ececec",
                          "-webkit-box-shadow": "0 3px 6px 0 #ececec",
                          "-moz-box-shadow": "0 3px 6px 0 #ececec",
                        },
                        traits: [
                          {
                            label: "Id",
                            name: "id",
                          },
                        ],
                      },
                      {
                        tagName: "a",
                        type: "link",
                        removable: false,
                        draggable: false,
                        copyable: false,
                        attributes: {
                          href: "https://mailrion-main.vercel.app/",
                          target: "_blank",
                        },
                        style: {
                          display: "flex",
                          width: "fit-content",
                          gap: "5px",
                          "align-items": "center",
                          border: "1px solid #E8E8E8",
                          cursor: "pointer",
                          padding: "2px 4px",
                          margin: "2rem auto",
                          "text-decoration": "none",
                        },
                        components: [
                          {
                            tagName: "img",
                            removable: false,
                            draggable: false,
                            copyable: false,
                            attributes: {
                              src: "https://res.cloudinary.com/dgbwenfdp/image/upload/t_mailrion/PoweredbyMailRion",
                              alt: "Logo",
                            },
                            style: {
                              height: "auto",
                              width: "68px",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        style: {
          "border-collapse": "separate",
          "border-spacing": "5px",
          width: "100%",
          height: "100%",
          "min-height": "150px",
          padding: "3px",
          background: "#F9F9F9",
        },
        traits: [
          {
            label: "Id",
            name: "id",
          },
        ],
      });
    }
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setTextValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const canvasClear = (editor: Editor) => {
    editor.DomComponents.clear();
    editor.CssComposer.clear();
  };

  const loadPageGrapesJs = async () => {
    try {
      // Fetch the appropriate API response based on `isNewsLetter`
      const resp = isNewsLetter
        ? await ShowCampaignAPI(orgsNum || orgID, pageId)
        : await GetPageTemplateAPI(pageId);

      const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
      const assetResp = await GetAllBuilderUploadAPI();

      const errResp =
        (resp as any)?.response && (resp as any)?.response?.status >= 300;

      // Handle error cases early
      if (
        !resp ||
        errResp ||
        (resp as unknown as { message: string })?.message ===
          "Looks like something went wrong" ||
        (resp as string) === "No Campaign Activities"
      ) {
        navigate(goBackURL());
        return;
      }

      // Extract attributes safely
      const campData = (resp as ICampaignResp)?.attributes ?? {};
      const pageData = (resp as IGetPageTemplateResp)?.data?.attributes ?? {};

      localStorage.setItem("campaignName", campData.title);

      // Strip quotes from content
      const strippedCanvas = stripQuotes(pageData.canvasData);
      const strippedContent = stripQuotes(pageData.content);
      const strippedCampaignCanvas = stripQuotes(
        campData.email_builder?.attributes.canvasData
      );
      const strippedCampaignContent = stripQuotes(
        campData.email_builder?.attributes.content
      );

      // Determine canvas & content based on `isNewsLetter`
      const canvasData = isNewsLetter
        ? strippedCampaignCanvas || campaign?.canvasData
        : strippedCanvas;

      let content = isNewsLetter
        ? strippedCampaignContent || campaign?.content
        : strippedContent;

      content = stripQuotes(content);

      // Initialize external styles and scripts
      const initExtData = {
        styles: canvasData?.styles || [],
        scripts: canvasData?.scripts || [],
      };

      // Configure GrapesJS
      const config = GrapesjsConfig(
        isNewsLetter,
        pageId,
        user.id,
        orgsNum || orgID,
        {
          content: {
            html: content?.html || "",
            css: content?.css || "",
            headContent: content?.headContent || "",
          },
        },
        assetResp || [],
        initExtData
      );

      // Extend the canvas settings
      const canvasObj = {
        ...config.canvas,
        styles: canvasData?.styles || [],
        scripts: canvasData?.scripts || [],
      };

      // Initialize GrapesJS editor
      const editorInstance = grapesjs.init({
        ...config,
        canvas: canvasObj,
      });

      setEditor(editorInstance);

      // Register plugins and extensions
      addCommands(editorInstance);
      actionEvents(editorInstance);
      addRTE(editorInstance);
      customPlugin(editorInstance);
      imageUploader(editorInstance);

      // Load content into the editor if available
      if (content?.html && content?.css) {
        editorInstance.setComponents(
          content.html.toString().replace(/\\n/g, "").trim()
        );
        editorInstance.setStyle(
          content.css.toString().replace(/\\n/g, "").trim()
        );
      }

      // Store state in local storage
      localStorage.setItem("isGetPageTemplate", "true");

      // Scroll to selected component smoothly
      const canvas = editorInstance.Canvas;
      const selected = editorInstance.getSelected();
      canvas.scrollTo(selected, { behavior: "smooth" });
      canvas.scrollTo(selected, { force: true });
    } catch (error) {
      console.error("Error loading GrapesJS:", error);
    }
  };

  // Initialize GrapesJS
  const loadGrapesJs = async () => {
    try {
      const initialized = localStorage.getItem("initialized");

      if (initialized === "false") {
        setShowIsLoading(true);
        loadPageGrapesJs();
        return;
      }

      const initTempData = await initialTemplateLoad();
      const page = await pageDB.get(`mlrPage-${pageId}`);
      const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
      const canvasData = (isNewsLetter ? campaign : page)?.canvasData;
      const assetResp = await GetAllBuilderUploadAPI();

      const initExtData = {
        styles: initTempData?.externalLinks || [],
        scripts: initTempData?.externalScripts || [],
      };

      const config = GrapesjsConfig(
        isNewsLetter,
        pageId,
        user.id,
        orgsNum || orgID,
        {
          content: {
            html: "",
            css: "",
            headContent: initTempData
              ? initTempData.headContent
              : campaign?.content.headContent,
          },
        },
        assetResp || [],
        initTempData ? initExtData : canvasData
      );

      const canvasObj = {
        ...config.canvas,
        styles: [
          ...(config.canvas?.styles || []),
          ...(initTempData
            ? initTempData.externalLinks
            : canvasData?.styles || []),
        ],
        scripts: [
          ...(config.canvas?.scripts || []),
          ...(initTempData
            ? initTempData.externalScripts
            : canvasData?.scripts || []),
        ],
      };

      const editorInstance = grapesjs.init({ ...config, canvas: canvasObj });
      setEditor(editorInstance);
      addCommands(editorInstance);
      actionEvents(editorInstance);
      addRTE(editorInstance);
      customPlugin(editorInstance);
      imageUploader(editorInstance);

      if (initTempData) {
        editorInstance.setComponents(initTempData.bodyContent);
        editorInstance.setStyle(initTempData.inlineStyles.join("\n"));
      }

      localStorage.setItem("isGetPageTemplate", "false");
      const canvas = editorInstance.Canvas;
      const selected = editorInstance.getSelected();
      canvas.scrollTo(selected, { behavior: "smooth" });
      canvas.scrollTo(selected, { force: true });
    } catch (error) {
      console.error("Failed to fetch canvas data:", error);
    }
  };

  const updateDataToDB = async (editor: Editor) => {
    setIsLoadingUpd(true);
    setShowIsLoading(false);

    try {
      // Extract HTML, CSS, and project data
      const html = editor.getHtml();
      const css = editor.getCss();
      const projectData = editor.getProjectData();

      // Fetch API response based on `isNewsLetter`
      const resp = isNewsLetter
        ? await ShowCampaignAPI(orgsNum || orgID, pageId)
        : await GetPageTemplateAPI(pageId);

      // Handle API failure cases
      const errResp =
        (resp as any)?.response && (resp as any)?.response?.status >= 300;

      // Handle error cases early
      if (
        !resp ||
        errResp ||
        (resp as unknown as { message: string })?.message ===
          "Looks like something went wrong" ||
        (resp as string) === "No Campaign Activities"
      ) {
        navigate(goBackURL());
        return;
      }

      // Fetch campaign data
      const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
      const campDataResp = (resp as ICampaignResp)?.attributes ?? {};
      const pageDataResp =
        (resp as IGetPageTemplateResp)?.data?.attributes ?? {};

      // Load initial data & capture screenshot
      const initialData = await initialTemplateLoad();
      const screenshotBlob = await captureScreenshot();
      const response = await fetch("/placeholder.png");
      const altScreenshotBlob = await response.blob();
      const screenshot = screenshotBlob || altScreenshotBlob;

      // Strip data safely
      const strippedContent = stripQuotes(pageDataResp?.content);
      const strippedCanvas = stripQuotes(pageDataResp?.canvasData);
      const strippedCampaignCanvas = stripQuotes(
        campDataResp.email_builder?.attributes.canvasData
      );
      const strippedCampaignContent = stripQuotes(
        campDataResp.email_builder?.attributes.content
      );

      // Determine content & canvas based on `isNewsLetter`
      const canvasData = isNewsLetter
        ? strippedCampaignCanvas || campaign?.canvasData
        : strippedCanvas;

      let content = isNewsLetter
        ? strippedCampaignContent || campaign?.content
        : strippedContent;

      content = stripQuotes(content);

      // Store data
      const storeData = await editor.StorageManager.store({
        ...projectData,
        ...(isNewsLetter ? { campaignId: pageId } : { pageId }),
        userId: user.id,
        screenshot,
        canvasData,
        isInitialSave: isNewsLetter ? !!campaign : !!pageDataResp?.pageId,
        headContent: content?.headContent || "",
      });

      // Extract stored data
      const {
        headContent,
        isInitialSave,
        screenshot: scr, // Ignore screenshot in stored data
        ...rest
      } = storeData;

      // Redirect if storeData is empty
      if (!storeData) return navigate(goBackURL());

      // Determine database keys
      const pageID = `mlrPage-${pageId}`;
      const campaignID = `mlrCampaign-${pageId}`;
      const endpoint = isNewsLetter ? campaignID : pageID;
      const { email_builder, ...restCampaignData } = campDataResp;

      // Update Campaign DB (if Newsletter)
      if (isNewsLetter) {
        await campaignDB.update(endpoint, {
          ...(rest as ICampaignDB),
          content: {
            html,
            css,
            headContent:
              initialData?.headContent ||
              content?.headContent ||
              campaign?.content?.headContent ||
              "",
          },
          campaign: restCampaignData,
        });
        return;
      }

      // Update Page DB (if Not Newsletter)
      await pageDB.update(endpoint, {
        ...(rest as IPageIndexedDB),
        content: {
          html,
          css,
          headContent: initialData?.headContent || content?.headContent || "",
        },
      });
    } catch (error) {
      console.error("Error updating data to DB:", error);
    } finally {
      setIsLoadingUpd(false);
    }
  };

  const handleOnSave = async () => {
    if (!editor) return;
    updateDataToDB(editor);
  };

  // Set the open state for panels
  const handleOpen = (name: "panelRight" | "panelLeft") =>
    setBuilder((prevState) => ({ ...prevState, [name]: true }));

  const handleClose = (name: "panelRight" | "panelLeft") => {
    setIsExiting((prevState) => ({ ...prevState, [name]: true }));
    setTimeout(() => {
      setIsExiting((prevState) => ({ ...prevState, [name]: false }));
      setBuilder((prevState) => ({ ...prevState, [name]: false }));
    }, 500);
  };

  const addRTE = (editor: Editor) => {
    const rte = editor.RichTextEditor;

    // Add text transformation options to RTE toolbar (Uppercase)
    rte.add("uppercase", {
      icon: `<img src=${UpperCaseIcon} alt="Title Case" style="width:26px; height:26px;" />`,
      attributes: { title: "Upper Case" },
      result: (rte: any) => {
        transformSelection(rte, (text: string) => text.toUpperCase()); // Apply uppercase
      },
    });

    // Add text transformation options to RTE toolbar (Lowercase)
    rte.add("lowercase", {
      icon: `<img src=${LowerCaseIcon} alt="Lower Case" style="width:22px; height:22px;" />`,
      attributes: { title: "Lower Case" },
      result: (rte: any) => {
        transformSelection(rte, (text: string) => text.toLowerCase());
      },
    });

    // Add text transformation options to RTE toolbar (Title Case)
    rte.add("titlecase", {
      icon: `<img src=${TitleCaseIcon} alt="Title Case" style="width:26px; height:26px;" />`,
      attributes: { title: "Title Case" },
      result: (rte: any) => {
        transformSelection(rte, toTitleCase);
      },
    });
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

    commands.add("custom-clear-canvas", {
      run(editor) {
        const confirmed = window.confirm(
          "Are you sure you want to clear the canvas?"
        );

        if (confirmed) {
          canvasClear(editor);
          if (isNewsLetter) localStorage.setItem("initialized", "true");
          newsLetterInit(editor);
        }
      },
    });

    commands.add("open-assset-manager", {
      run(editor) {
        editor.runCommand("core:open-assets");
      },
    });
  };

  // Image uploader configuration
  const imageUploader = (editor: Editor) => {
    const { Modal } = editor;

    editor.on("asset:upload:start", () => {
      let dots = 0;
      const maxDots = 3;

      Modal.setTitle("Uploading Images");

      // Interval to animate dots
      const interval = setInterval(() => {
        dots = (dots + 1) % (maxDots + 1); // Cycles between 0-3 dots
        Modal.setTitle(`Uploading Images${".".repeat(dots)}`);
      }, 500);

      const clearAndSetTitle = (message: string) => {
        clearInterval(interval);
        Modal.setTitle(message);

        // After 3 seconds, revert to default title
        setTimeout(() => {
          Modal.setTitle("Select Image");
        }, 3000);
      };

      editor.on("asset:upload:end", () => {
        clearAndSetTitle("Uploaded successfully!");
      });

      editor.on("asset:upload:error", () => {
        clearAndSetTitle("Upload failed!");
      });
    });
  };

  const customPlugin = (editor: Editor) => {
    // editor.BlockManager.getAll().forEach((block) => {
    //   console.log(block.get("id"), block.get("label"));
    // });
    const block = editor.Blocks.get("header-block-4");

    if (block) {
      editor.Blocks.remove(block);
    }
  };

  // component and canvas action events
  const actionEvents = (editor: Editor) => {
    editor.on("component:selected", () => {
      setBuilder((prevState) => ({ ...prevState, panelRight: true }));
    });

    editor.on("component:deselected", () =>
      setBuilder((prevState) => ({ ...prevState, panelRight: false }))
    );

    editor.on("run:preview", () => {
      editor.stopCommand("sw-visibility");
      $(".panel__top").hide();
      $(".panel__right").hide();
      $(".blocks-wrapper").hide();
      $(".editor-row").css("height", "100vh");
      $("#gjs").css("padding", "0");
      $(".overlay-arrowright-btn").hide();
      $(".overlay-arrowleft-btn").hide();
    });

    editor.on("stop:preview", () => {
      editor.runCommand("sw-visibility");
      $(".panel__top").show();
      $(".panel__right").show();
      $(".blocks-wrapper").show();
      $(".editor-row").css("height", "90vh");
      $("#gjs").css("padding", "0.5rem");
      setBuilder({ panelLeft: true, panelRight: true });
    });

    // Removing image from the Manager
    editor.on("asset:remove", async (asset) => {
      const assetId = asset.attributes.id;
      if (!assetId) return;
      const { Modal } = editor;
      let dots = 0;
      const maxDots = 3;

      // Interval to animate dots
      const interval = setInterval(() => {
        dots = (dots + 1) % (maxDots + 1);
        Modal.setTitle(`Removing Image${".".repeat(dots)}`);
      }, 500);

      const clearAndSetTitle = (message: string) => {
        clearInterval(interval);
        Modal.setTitle(message);

        setTimeout(() => {
          Modal.setTitle("Select Image");
        }, 3000);
      };

      const resp = await DeleteBuilderFileAPI(assetId);
      const status = (resp as unknown as { status: number }).status;

      if (resp && resp === "Builder upload deleted successfully")
        clearAndSetTitle("Removed successfully!");

      if ((resp && resp === "Something went wrong") || status >= 300)
        clearAndSetTitle("Remove failed!");
    });

    // Ensure all categories are collapsed
    editor.BlockManager.getCategories().forEach((category) => {
      category.set("open", false);
    });

    // Listen for when the Rich Text Editor is enabled
    editor.on("rte:enable", () => {
      const rteToolbar =
        document.querySelector<HTMLElement>(".gjs-rte-toolbar");
      if (rteToolbar) {
        // Adjust position if overflowing
        adjustRtePosition();
      }
    });

    // Editor is loaded and Rendered to the Canvas
    editor.onReady(async () => {
      try {
        const initTempData = await initialTemplateLoad();
        if (!initTempData) newsLetterInit(editor);

        // Lock the specific element (MailRion bottom tag)
        const wrapper = editor.getWrapper();

        if (wrapper) {
          const table = wrapper.find(".blk_footer")[0];
          if (table)
            table.set({
              locked: true,
              selectable: false,
              hoverable: false,
              highlightable: false,
              layerable: false,
            });
        }

        // Check if Page Exist Remotely and then Load
        const getPageTemplate = localStorage.getItem("isGetPageTemplate");
        if (getPageTemplate === "true") return;

        localStorage.setItem("initialized", "false");

        const screenshotBlob = await captureScreenshot();
        const response = await fetch("/placeholder.png");
        const altscreenshotBlob = await response.blob();
        const screenshot = screenshotBlob || altscreenshotBlob;
        const projectData = editor.getProjectData();
        const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
        const page = await pageDB.get(`mlrPage-${pageId}`);

        // Initialize ProjectData
        const storeData = await editor.StorageManager.store({
          ...projectData,
          ...(isNewsLetter ? { campaignId: pageId } : { pageId }),
          userId: user.id,
          screenshot,
          isInitialSave: isNewsLetter ? !!campaign : !!page,
          headContent: "",
        });

        if (!storeData) return navigate(goBackURL());
      } catch (error) {
        console.error("Failed to save editor state:", error);
      }
    });

    // Storage Event
    editor.on("storage:start:store", async () => {
      setStoreSaved((prevState) => ({
        isSaving: true,
        isError: { ...prevState.isError },
      }));
    });

    editor.on("storage:after", () => {
      setTimeout(() => {
        setStoreSaved({
          isSaving: false,
          isError: { load: false, store: false },
        });
      }, 5000);
    });

    editor.on("storage:error:store", () => {
      setStoreSaved({
        isSaving: false,
        isError: { store: true, load: false },
      });
    });

    editor.on("storage:error:load", () => {
      setStoreSaved({
        isSaving: false,
        isError: { store: false, load: true },
      });
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadGrapesJs();
    }
  }, [editor]);

  const publishPage = async () => {
    if (editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const initTempData = await initialTemplateLoad();

      // Get a page by key
      const page = await pageDB.get(`mlrPage-${pageId}`);
      const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
      const canvasData = (isNewsLetter ? campaign : page)?.canvasData;
      const newWindow = window.open("", "_blank");

      if (newWindow) {
        const content = contentHTML({
          html,
          css,
          showIcon: true,
          showScripts: true,
          showTailwindScript: true,
          canvasData,
          initTempData,
        });
        newWindow.document.write(content);
        newWindow.document.close();
      } else {
        alert("Popup blocked! Please allow popups for this website!");
      }
    }
  };

  const sendTestEmail = async () => {
    try {
      const campaign = await campaignDB.get(`mlrCampaign-${pageId}`);
      if (editor && campaign && campaign.content.headContent) {
        const content = `
<!DOCTYPE html>
<html>
  <head>
    ${campaign.content.headContent.trim()}
    <style type="text/css">
    ${editor.getCss()?.trim()}
    </style>
  </head>
${editor.getHtml().trim()}
</html>`;

        const formData = new FormData();
        formData.append("to", JSON.stringify([textValue.To]));
        formData.append("subject", textValue.Subject);
        formData.append("message", inlineStyles(content.trim()));

        setIsLoading(true);

        const res = await AdminComposeNewMail(
          orgID as string,
          "-1",
          formData,
          "Test Email Sent"
        );

        if (res.status === 200) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Top Panel */}
      <div className="panel__top">
        <div>
          <h5 className="page_title">
            {isNewsLetter
              ? stripQuotes(campaignName)
              : stripQuotes(pageName) || "PageName"}
          </h5>
          <div className="panel__switcher"></div>
        </div>
        <div className="gjs-panel-action-buttons">
          <div className="views-actions"></div>
        </div>
        <div className="panel-action">
          {(isSaving || (isLoadingGet && showIsLoading)) && !isLoadingUpd && (
            <div className="saving">
              <BsArrowRepeat fontSize={18} />{" "}
              <span>{isSaving ? "Saving..." : "Loading..."}</span>
            </div>
          )}
          {(isError.load || isError.store || errorLoading) && (
            <div className="error">
              <MdOutlineErrorOutline fontSize={18} />
              <span>
                Error{" "}
                {isError.load
                  ? "loading"
                  : isError.store
                  ? "saving"
                  : "loading"}
              </span>
            </div>
          )}
          <button
            className="btn btn-primary"
            disabled={isLoadingPage || isLoadingUpd}
            onClick={handleOnSave}
          >
            {isLoadingPage || isLoadingUpd ? "Updating..." : "Save"}
          </button>
          <button
            className="btn btn-primary-outline"
            disabled={isLoadingUpd}
            onClick={handleOnDone}
          >
            Done
          </button>
          {!isNewsLetter && (
            <button className="btn btn-primary" onClick={publishPage}>
              Publish
            </button>
          )}
        </div>
      </div>
      <div className="editor-row ml-4">
        {/* Overlay Arrow Left Expand Button */}
        <div
          className="overlay-arrowleft-btn"
          title="Expand"
          style={{ display: builder.panelLeft ? "none" : "block" }}
          onClick={() => handleOpen("panelLeft")}
        >
          <IoIosArrowForward size={20} />
        </div>

        {/* Overlay Arrow Right Expand Button */}
        <div
          className="overlay-arrowright-btn"
          title="Expand"
          style={{ display: builder.panelRight ? "none" : "block" }}
          onClick={() => handleOpen("panelRight")}
        >
          <IoIosArrowBack size={20} />
        </div>

        {/* Left Panel */}
        <div
          className={`blocks-wrapper ${isExiting.panelLeft ? "exit" : ""}`}
          style={{ display: builder.panelLeft ? "block" : "none" }}
        >
          <div
            className="close-btn-left"
            onClick={() => handleClose("panelLeft")}
          >
            <IoIosArrowBack size={24} title="Collaspe" />
          </div>
          <div id="blocks" />
        </div>

        {/* Canvas */}
        <div ref={ToCaptureRef} className="editor-canvas">
          {!editor && (
            <div className="loader">
              <ButtonSpinner />
            </div>
          )}
          <div id="gjs" style={{ display: editor ? "block" : "none" }} />
        </div>

        {/* Right Panel */}
        <div
          className={`panel__right ${isExiting.panelRight ? "exit" : ""}`}
          style={{ display: builder.panelRight ? "block" : "none" }}
        >
          <div
            className="close-btn-right"
            onClick={() => handleClose("panelRight")}
          >
            <IoIosArrowForward size={24} title="Collaspe" />
          </div>
          <div
            className="manager"
            style={{ width: isNewsLetter ? "70%" : "50%" }}
          >
            <span
              className={`${manager.style ? "active" : ""}`}
              onClick={() => handleManager("style")}
              title="Style"
            >
              <MdPalette />
            </span>
            <span
              className={`${manager.layer ? "active" : ""}`}
              onClick={() => handleManager("layer")}
              title="Layer"
            >
              <GrTasks />
            </span>
            {isNewsLetter && (
              <span
                className={`${manager.email ? "active" : ""}`}
                onClick={() => handleManager("email")}
                title="Email"
              >
                <IoMailOpenSharp />
              </span>
            )}
          </div>
          <div className="content">
            <div style={{ display: manager.style ? "block" : "none" }}>
              <div id="traits-container" />
              <div className="styles-container" />
            </div>
            <div
              style={{ display: manager.layer ? "block" : "none" }}
              className="layers-container"
            />
            {isNewsLetter && (
              <div
                style={{ display: manager.email ? "block" : "none" }}
                className="emails-container"
              >
                {Object.keys(textValue).map((key, idx) => (
                  <div className="div" key={idx}>
                    <label htmlFor={key}>{key}</label>
                    <input
                      id={key}
                      type="text"
                      name={key}
                      value={textValue[key as keyof typeof textValue]}
                      onChange={handleOnChange}
                      placeholder={key}
                    />
                  </div>
                ))}
                <div className="send-email">
                  {isLoading ? (
                    <button disabled className="btn btn-primary btnLoad">
                      <div>
                        <ButtonSpinner />
                      </div>
                      Sending...
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btnSend"
                      disabled={Object.values(textValue).some(
                        (data) => data === ""
                      )}
                      onClick={sendTestEmail}
                    >
                      Send Test
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomEditor);
