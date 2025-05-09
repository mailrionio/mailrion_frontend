import {
  CreatePageWithDetailsAPI,
  GetPageTemplateAPI,
  IGetPageTemplateResp,
  UpdatePageAPI,
} from "@/redux/features/PagesSlice/services";
import { StorageManagerConfig } from "grapesjs";
import { stripQuotes } from "@/helpers/strip";
import { IGrapesCanvas } from ".";
import {
  ICampaignResp,
  ShowCampaignAPI,
  UpdateCampaignAPI,
} from "@/redux/features/campaign/service";

export const storageManager = (
  userId: string,
  pageId: string,
  isNewsLetter: boolean,
  otherData: {},
  orgId: string,
  canvasData?: IGrapesCanvas
): StorageManagerConfig => {
  const saveRemote = async (data: any, isInitialSave: boolean) => {
    try {
      const { screenshot, editor, headContent, ...restData } = data;
      const pageId = restData.pageId;
      const userId = restData.userId;
      const formData = new FormData();
      const html = editor.getHtml();
      const css = editor.getCss();
      const cont = JSON.stringify({
            RIONHTML: html,
            RIONCSS: css,
            RIONHEAD: headContent,
          })

      // Save Campaign
      if (isNewsLetter) {
        const campaignId = restData.campaignId;

        const emailBuilder = {
          userId,
          campaignId,
          assets: JSON.stringify(restData.assets),
          styles: JSON.stringify(restData.styles),
          pages: JSON.stringify(restData.pages),
          symbols: JSON.stringify(restData.symbols),
          dataSources: JSON.stringify(restData.dataSources),
          canvasData: JSON.stringify(
            restData.canvasData || { styles: [], scripts: [] }
          ),
          content: cont,
        };

        formData.append("_method", "put");
        formData.append("email_builder", JSON.stringify(emailBuilder));
        formData.append("screenshot", screenshot, "screenshot.png");

        /* for (let [key, value] of formData.entries()) {
          console.log(`CANVASDATA ==> ${emailBuilder.canvasData}`);
          console.log(`CONTENT ==> ${emailBuilder.content}`);
        }

        const formdata = new FormData();
        formdata.append("file", screenshot, "screenshot.png");

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formdata,
        });

        const data = await response.json();
        console.log("UPLOADED SUCCESSFULLY ===> ", data); */

        const resp = await UpdateCampaignAPI(formData, orgId, campaignId);

        if (!resp || (resp as string) === "Something went wrong") {
          return null;
        }

        const emailBuilderResp = (resp as ICampaignResp)?.attributes
          ?.email_builder;

        if (!emailBuilderResp || !emailBuilderResp.attributes) {
          return null;
        }

        let {
          assets,
          canvasData,
          content,
          pages,
          dataSources,
          styles,
          symbols,
        } = emailBuilderResp.attributes;

        let { email_builder, ...restCampaignData } = (resp as ICampaignResp)
          .attributes;

        content = stripQuotes(restCampaignData.content);

        const projData = {
          userId,
          campaignId,
          assets: stripQuotes(assets),
          canvasData: stripQuotes(canvasData),
          content: stripQuotes(content),
          pages: stripQuotes(pages),
          dataSources: stripQuotes(dataSources),
          styles: stripQuotes(styles),
          symbols: stripQuotes(symbols),
          campaign: restCampaignData,
        };

        return projData;
      }

      Object.entries(restData).forEach(([key, value]) => {
        if (key !== "userId" && key !== "pageId") {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append("pageId", pageId);
      formData.append("screenshot", screenshot, "screenshot.png");

      // Update Page Data
      if (isInitialSave) {
        formData.append("_method", "put");
        formData.delete("content");
        formData.append("content", cont);

        const resp = await UpdatePageAPI(pageId, formData);

        if (!resp || "message" in resp) return null;
        const respData = resp.data.attributes;

        const { screenshot, ...rest } = respData;

        const projData = {
          userId,
          pageId,
          assets: stripQuotes(rest.assets),
          canvasData: stripQuotes(rest.canvasData),
          content: stripQuotes(rest.content),
          pages: stripQuotes(rest.pages),
          dataSources: stripQuotes(rest.dataSources),
          styles: stripQuotes(rest.styles),
          symbols: stripQuotes(rest.symbols),
        };

        return projData;
      }

      const resp = await CreatePageWithDetailsAPI(formData);

      if (!resp || resp.message === "Looks like something went wrong")
        return null;

      return restData;
    } catch (error) {
      console.error("Error in saveRemote => ", error);
      return null;
    }
  };

  const loadRemote = async (pageId: string, orgId: string) => {
    const resp = await GetPageTemplateAPI(pageId);

    if (isNewsLetter) {
      const resp = await ShowCampaignAPI(orgId, pageId);
      if (!resp) return null;
      const emailBuilderResp = (resp as ICampaignResp).attributes.email_builder;
      if (!emailBuilderResp || !emailBuilderResp.attributes) return null;

      const {
        assets,
        canvasData,
        content,
        pages,
        dataSources,
        styles,
        symbols,
      } = emailBuilderResp.attributes;

      const { email_builder, ...restCampaignData } = (resp as ICampaignResp)
        .attributes;

      const projData = {
        userId,
        campaignId: pageId,
        assets: stripQuotes(assets),
        canvasData: stripQuotes(canvasData),
        content: stripQuotes(content),
        pages: stripQuotes(pages),
        dataSources: stripQuotes(dataSources),
        styles: stripQuotes(styles),
        symbols: stripQuotes(symbols),
        campaign: restCampaignData,
      };

      return projData;
    }

    const errResp =
      (resp as any)?.response && (resp as any)?.response?.status > 300;

    // Handle error cases early
    if (
      !resp ||
      errResp ||
      (resp as unknown as { message: string })?.message ===
        "Looks like something went wrong"
    )
      return null;

    const respData = (resp as IGetPageTemplateResp).data.attributes;

    const projData = {
      userId,
      pageId: `${respData.pageId}`,
      assets: stripQuotes(respData.assets),
      canvasData: stripQuotes(respData.canvasData),
      content: stripQuotes(respData.content),
      pages: stripQuotes(respData.pages),
      dataSources: stripQuotes(respData.dataSources),
      styles: stripQuotes(respData.styles),
      symbols: stripQuotes(respData.symbols),
    };

    return projData;
  };

  const opts: StorageManagerConfig = {
    id: "mlr-", // Prefix identifier that will be used on parameters
    type: "indexeddb", // Type of the storage
    autosave: false, // Store data automatically
    autoload: false, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
    onStore: async (data, editor) => {
      const { screenshot, headContent, isInitialSave, ...restData } = data;

      const combinedData = {
        userId,
        ...(isNewsLetter ? { campaignId: pageId } : { pageId }),
        ...otherData,
        canvasData,
        ...restData,
      };

      const respData = await saveRemote(
        { ...combinedData, screenshot, editor, headContent },
        isInitialSave
      );

      return respData;
    },
    onLoad: async () => {
      const remoteData = await loadRemote(pageId, orgId);
      return remoteData;
    },
  };

  return opts;
};
