/* eslint-disable @typescript-eslint/no-explicit-any */
import TopolPlugin from "@topol.io/editor";
import React, { useEffect } from "react";
export const TOPOL_OPTIONS = {
  id: "#WysiwygEditorApp",
  authorize: {
    apiKey: "zWr2VqplkqNowI9F7maqSxIN8zp1quFLTY4rNvD4VCNlrbKuaJMuHJ0nKkhx",
    userId: "mailrion-token",
  },
  title: "Mail builder ~ MarlRion.io",
  language: "en",
  removeTopBar: false,
  topBarOptions: ["undoRedo", "changePreview", "previewSize", "saveAndClose"],
  windowBar: ["fullscreen", "close"],
  mainMenuAlign: "left",
  hideSettingsTab: false,
  disableAlerts: false,
  light: false,
  customFileManager: false,
  fontSizes: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26],

  tinyConfig: {},
  callbacks: {
    onSaveAndClose: function (json: any, html: any) {
      const element = document.querySelector("#WysiwygEditorAppHtml");
      if (element) {
        element.innerHTML = html ?? "";
      }
      if (this) {
        window.TopolPlugin.destroy();
      }
      const elementStyle = document.getElementById("WysiwygEditorApp");
      if (elementStyle) {
        elementStyle.style.display = "none";
      }
    },
    onSave: function (json: any, html: any) {
      const element = document.querySelector("#WysiwygEditorAppHtml");
      if (element) {
        element.innerHTML = html ?? "";
      }
    },
    onTestSend: function (email: any, json: any, html: any) {
      // // HTML of the email
      // console.log(html);
      // // JSON object of the email
      // console.log(json);
      // // Email of the recipient
      // console.log(email);
      // // Callback when send test email button is clicked
    },
    onOpenFileManager: function () {
      // Implement your own file manager open callback
    },
    onBlockSave(json: any) {
      // var name = window.prompt('Enter block name:')
      // if (name !== null) {
      //     console.log('saving block', json)
      // }
    },
    onBlockRemove(id: any) {
      // if (window.confirm('Are you sure?')) {
      //     console.log('removing block', id)
      // }
    },
    onBlockEdit(id: any) {
      // var name = window.prompt('Block name:', 'My block 001')
      // if (name !== null) {
      //     console.log('saving edited block', id)
      // }
    },
    onPreview(html: any) {
      //do something with the html
    },
    onInit() {
      // Called when editor is loaded
    },
    onAlert(notification: any) {},
    onClose(o: any) {
      // console.log(this);
      if (this) {
        window.TopolPlugin.destroy();
      }
      // called when clicked close button in WindowBar
      const elementStyle = document.getElementById("WysiwygEditorApp");
      if (elementStyle) {
        elementStyle.style.display = "none";
      }
    },
  },
  apiAuthorizationHeader: "Bearer token",
  api: {
    // Your own endpoint for uploading images
    IMAGE_UPLOAD: "/images/upload",
    // Your own endpoint for getting contents of folders
    FOLDERS: "/images/folder-contents",
    // Your own endpoint to retrieve base64 image edited by Image Editor
    IMAGE_EDITOR_UPLOAD: "/images/image-editor-upload",
    // Create Autosave
    AUTOSAVE: "/autosave",
    // Retreive all autosaves
    AUTOSAVES: "/autosaves",
    // Retreive an autosave
    GET_AUTOSAVE: "/autosave/",
    // Retrieve feeds of products
    FEEDS: "/feeds",
    // Retrieve products from feed
    PRODUCTS: "/products",
  },
  mobileFirstEnabled: true,
};

interface IPageBuilder {
  template: React.ReactNode;
  onLoadTemplate: boolean;
}
const PageBuilder = ({ template, onLoadTemplate }: IPageBuilder) => {
  useEffect(() => {
    console.log(template, onLoadTemplate);

    if (onLoadTemplate) {
      console.log("template loaded");

      TopolPlugin?.load(JSON.stringify(template) as any);
    }
  }, [onLoadTemplate]);

  return (
    <div>
      {/* {TopolPlugin.load(template as any) as any} */}
      <div
        id="WysiwygEditorApp"
        style={{
          position: "fixed",
          inset: "0px",
          zIndex: "200000",
          background: "aliceblue",
          display: "none",
        }}
      ></div>
      <div
        className="gen"
        onClick={() => {
          const element = document.getElementById("WysiwygEditorApp");
          if (element) {
            element.style.display = "block";
          }
          TopolPlugin.init(TOPOL_OPTIONS as any);
        }}
      >
        Use Page Builder
      </div>
      <div id="WysiwygEditorAppHtml" className={`mt-2 mb-2`}></div>
    </div>
  );
};

export default PageBuilder;
