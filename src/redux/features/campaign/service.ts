/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from "../../../components/Toast";
import { ICampaign } from "@/config";
import API from "@/redux/axios/axios";
import axios from "axios";

interface IScreenshotData {
  id: number;
  type: string;
  user_id: string;
  src: string;
  size: string;
  createdDate: string;
  name: string;
}

export interface IEmailBuilder {
  id: number;
  type: string;
  attributes: {
    pageId: string;
    assets: string;
    canvasData: string;
    content: string;
    pages: string;
    dataSources: string;
    styles: string;
    symbols: string;
  };
}

export interface IViewCampaignData {
  id: string;
  type: string;
  attributes: {
    title: string;
    subject: string;
    created_on: string;
    updated_on: null | string;
    screenshot: null | IScreenshotData;
    status: string;
  };
}

export interface IViewCampaigns {
  data: IViewCampaignData[];
  links: {
    first: string;
    last: string;
    prev: null;
    next: null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: null; label: string; active: false }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ICampaignData {
  sender_id: string;
  sender_name: string;
  sender_email: string;
  sent_to: string | null;
  lists: string;
  excluded_lists: string;
  subject: string;
  content: string;
  title: string;
  status: string;
  email_builder: null | IEmailBuilder;
  screenshot: null | IScreenshotData;
}

export interface ICampaignResp {
  id: string;
  type: string;
  attributes: ICampaignData;
}

export const CreateCampaignAPI = async (data: unknown) => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");
  try {
    const res = await axios.post("publishes/campaign", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    // Toast({ type: "success", message: "Campaign message sent" });

    return res;
  } catch (error) {
    // return error;
  }
};

// Save Campaign Data
export const SaveCampaignAPI = async (
  data: FormData
): Promise<ICampaignResp | undefined> => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");

  try {
    const resp = await axios.post(`/saves/campaign`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    });

    console.log("RESP SAVE NEW ==> ", resp);

    if (resp?.status !== 201) {
      Toast({ type: "error", message: "Failed to save campaign" });
      return;
    }

    Toast({
      type: "success",
      message: "Campaign saved successfully",
    });

    return resp.data.message;
  } catch (error: any) {
    Toast({
      type: "error",
      message: "Failed to create campaign.",
    });

    return error;
  }
};

// Update Campaign Data
export const UpdateCampaignAPI = async (
  data: FormData,
  orgID: string,
  campaignID: string
): Promise<ICampaignResp | string | undefined> => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");

  try {
    const resp = await axios.post(
      `/updates/campaign/${orgID}/${campaignID}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (resp?.status !== 200 && resp?.status !== 201) {
      Toast({ type: "error", message: "Failed to update campaign" });
      return;
    }

    return resp.data.message;
  } catch (error: any) {
    Toast({
      type: "error",
      message: error?.message || "Failed to update campaign.",
    });
    return error;
  }
};

export const GetCampaignAPI = async (campaignID: string | number) => {
  try {
    const res = await API.get(`views/campaign/${campaignID}`);
    const data: ICampaign = {
      id: res.data.message.id,
      title: res.data.message.attributes.title,
      subject: res.data.message.attributes.subject,
      created_on: res.data.message.attributes.created_on,
      content: res.data.message.attributes.content,
    };
    return data;
  } catch (error) {
    return error;
    // throw new Error(error as string);
  }
};

// Get Single Campaign Data
export const ShowCampaignAPI = async (
  orgID: string,
  campaignID: string
): Promise<ICampaignResp | string | undefined> => {
  try {
    const resp = await API.get(`/shows/campaign/${orgID}/${campaignID}`);

    if (resp.status !== 200) {
      Toast({ type: "error", message: "Failed to fetch campaign." });
      return;
    }

    return resp.data.message;
  } catch (error: any) {
    Toast({
      type: "error",
      message: error?.message || "Failed to fetch campaign.",
    });
    return error;
  }
};

export const GetCampaignsAPI = async () => {
  try {
    const res = await API.get("/views/campaign");
    const data: ICampaign[] = res.data.message.map((d: any) => {
      const types = {
        id: d.id,
        title: d.attributes.title,
        subject: d.attributes.subject,
        created_on: d.attributes.created_on,
      };
      return types;
    });
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const ViewCampaignsAPI = async (
  orgID: string,
  currentPage: number = 1,
  filter?: "published" | "saved"
): Promise<IViewCampaigns> => {
  try {
    const endpoint = filter
      ? `/views/campaign/${orgID}?filter=${filter}&page=${currentPage}`
      : `/views/campaign/${orgID}?page=${currentPage}`;
    const resp = await API.get(endpoint);

    return resp.data;
  } catch (error: any) {
    Toast({
      type: "error",
      message: error?.message || "Failed to fetch pages data.",
    });
    return error;
  }
};

export const DeleteCampaignAPI = async (campaignID: string | number) => {
  try {
    const res = await API.delete(`/removes/campaign/${campaignID}`);
    return res;
  } catch (error: any) {
    Toast({
      type: "error",
      message: error?.message || "Failed to fetch pages data.",
    });
    return error;
  }
};
