/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from "../../../components/Toast";
import { API } from "../../axios/axios";
import { dispatch } from "../../store";
import axios from "axios";
import {
  setIsloading,
  setIsloadingDel,
  setIsloadingGet,
  setErrorLoading,
} from ".";

export interface IScreenshot {
  id: number;
  type: string;
  name: string;
  user_id: string;
  src: string;
  size: string;
  createdDate: string;
}

export interface ICreatePageResp {
  success: any;
  message: string;
  Pages: {
    id: string;
    type: string;
    attributes: {
      userId: string;
      pageName: string;
      screenshot: string;
      createdDate: string;
      updatedDate: string;
    };
  };
}

export interface IGetPageTemplateResp {
  data: {
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
      screenshot: IScreenshot;
    };
  };
}

export interface ICreatePageWithDetailsResp {
  message: string;
  Pages: {
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
      screenshot: {
        id: number;
        type: string;
        attributes: {
          user_id: string;
          src: string;
          size: string;
          type: string;
          createdDate: string;
        };
      };
    };
  };
}

export interface IGetAllPagesResp {
  data: [
    {
      id: string;
      type: string;
      attributes: {
        userId: string;
        pageName: string;
        screenshot: IScreenshot;
        createdDate: string;
        updatedDate: string;
      };
    }
  ];
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
    links: { url: null; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const CreatePageAPI = async (
  pageName: string
): Promise<ICreatePageResp | undefined> => {
  dispatch(setIsloading(true));
  try {
    const resp = await axios.post(
      "creates/pages",
      { pageName },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem(
            "mailrionAdminToken"
          )}`,
        },
      }
    );
    dispatch(setIsloading(false));
    const result = { ...resp.data, success: true };
    if (!result.success) {
      Toast({
        type: "error",
        message: result?.data?.pageName[0] || result.message,
      });
      return;
    }
    Toast({ type: "success", message: result.message });

    return result;
  } catch (error: any) {
    dispatch(setIsloading(false));
    console.log("ERROZZ--> ", error);
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to create page.",
    });
    return error;
  }
};

export const CreatePageWithDetailsAPI = async (
  data: FormData
): Promise<ICreatePageWithDetailsResp | undefined> => {
  dispatch(setIsloading(true));
  try {
    const resp = await axios.post("creates/templates/pages", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("mailrionAdminToken")}`,
      },
    });
    dispatch(setIsloading(false));
    Toast({ type: "success", message: resp.data.message });
    return resp.data;
  } catch (error: any) {
    dispatch(setIsloading(false));
    console.log(error);
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to create page.",
    });
    return error;
  }
};

export const GetAllPagesAPI = async (
  currentPage: number
): Promise<IGetAllPagesResp | undefined> => {
  dispatch(setIsloading(true));
  try {
    const response = await API.get(`/pages?page=${currentPage}`);
    dispatch(setIsloading(false));

    if (response.status !== 200) {
      Toast({ type: "error", message: "Failed to fetch pages data." });
    }

    return response.data;
  } catch (error: any) {
    dispatch(setIsloading(false));
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to fetch pages data.",
    });
    return error;
  }
};

export const GetPageTemplateAPI = async (
  pageId: string
): Promise<IGetPageTemplateResp | { message: string } | undefined> => {
  dispatch(setIsloadingGet(true));
  try {
    const resp = await API.get(`/templates/pages/${pageId}`);

    if (resp.status !== 200) {
      Toast({ type: "error", message: "Failed to fetch page template." });
      dispatch(setErrorLoading(true));
      setTimeout(() => {
        dispatch(setErrorLoading(false));
      }, 3000);
      dispatch(setIsloadingGet(false));
      return;
    }

    dispatch(setIsloadingGet(false));

    return resp.data;
  } catch (error: any) {
    dispatch(setErrorLoading(true));
    setTimeout(() => {
      dispatch(setErrorLoading(false));
    }, 3000);
    dispatch(setIsloadingGet(false));
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to fetch page template.",
    });
    return error;
  }
};

export const DeletePageAPI = async (pageId: string) => {
  dispatch(setIsloadingDel(true));

  try {
    const response = await API.delete(`/pages/deletes/${pageId}`);
    if (response.data.message === "Account Deleted") {
      Toast({ type: "success", message: "Page deleted successfully" });
    }
    dispatch(setIsloadingDel(false));
    if (response.status !== 200) {
      Toast({ type: "error", message: "Failed to delete page." });
    }
    Toast({ type: "success", message: response.data.message });
    return response;
  } catch (error: any) {
    console.log(error);
    dispatch(setIsloadingDel(false));
    const errMsg = error.response?.data;
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to delete page.",
    });
    return error;
  }
};

export const UpdatePageAPI = async (
  pageId: string,
  formData: FormData
): Promise<IGetPageTemplateResp | { message: string }> => {
  dispatch(setIsloading(true));

  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");

  try {
    const resp = await axios.post(
      `/templates/pages/${pageId}/updates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    dispatch(setIsloading(false));

    if (resp.status !== 200) {
      Toast({ type: "error", message: "Failed to update page." });
    }

    return resp.data;
  } catch (error: any) {
    console.log("ERROR <===>", error);
    dispatch(setIsloading(false));
    const errMsg = error.response?.data;
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to update page.",
    });
    return error;
  }
};
