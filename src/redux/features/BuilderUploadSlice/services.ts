/* eslint-disable @typescript-eslint/no-explicit-any */
import { setIsloading, setIsloadingUpd } from ".";
import Toast from "../../../components/Toast";
import { API } from "../../axios/axios";
import { dispatch } from "../../store";
import axios from "axios";

export interface IGetABuilderUploadResp {
  id: number;
  type: string;
  attributes: {
    user_id: string;
    url: string;
    size: string;
    type: string;
    createdDate: string;
  };
}

export interface BuilderUpdData {
  id: number;
  type: string;
  user_id: string;
  name: string;
  src: string;
  size: string;
  createdDate: string;
}

export interface IBuilderUpdTransResp {
  data: BuilderUpdData[];
}

export const UploadBuilderFileAPI = async (data: FormData): Promise<string> => {
  dispatch(setIsloadingUpd(true));
  try {
    const resp = await axios.post("/builders/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("mailrionAdminToken")}`,
      },
    });
    dispatch(setIsloadingUpd(false));
    return resp.data.data;
  } catch (error: any) {
    dispatch(setIsloadingUpd(false));
    console.log(error);
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      return error;
    }
    Toast({
      type: "error",
      message: errMsg?.message || "Failed to upload file.",
    });
    return error;
  }
};

export const DeleteBuilderFileAPI = async (
  builderID: string
): Promise<string> => {
  dispatch(setIsloadingUpd(true));
  try {
    const resp = await axios.delete(`/builders/upload/deletes/${builderID}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("mailrionAdminToken")}`,
      },
    });
    dispatch(setIsloadingUpd(false));
    return resp.data.message;
  } catch (error: any) {
    dispatch(setIsloadingUpd(false));
    const err = error.response?.data;
    if (err?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      return error;
    }
    Toast({
      type: "error",
      message: "Failed to delete file.",
    });

    return error.response;
  }
};

export const GetAllBuilderUploadAPI = async (): Promise<BuilderUpdData[]> => {
  dispatch(setIsloading(true));
  try {
    const response = await API.get(`/builders/upload/fetches`);

    dispatch(setIsloading(false));

    if (response.status !== 200) {
      Toast({ type: "error", message: "Failed to fetch all builder upload." });
    }

    return response.data.data;
  } catch (error: any) {
    dispatch(setIsloading(false));
    const errMsg = error.response?.data;
    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      return error;
    }
    Toast({
      type: "error",
      message: "Failed to fetch all builder upload.",
    });
    return error;
  }
};

export const GetABuilderUploadAPI = async (
  id: string
): Promise<IGetABuilderUploadResp | undefined> => {
  dispatch(setIsloading(true));
  try {
    const resp = await API.get(`/builders/upload/fetches/${id}`);

    if (resp.status !== 200) {
      Toast({ type: "error", message: "Failed to fetch builder upload." });
      dispatch(setIsloading(false));
      return;
    }

    dispatch(setIsloading(false));
    return resp.data.data;
  } catch (error: any) {
    dispatch(setIsloading(false));
    const errMsg = error.response?.data;

    if (errMsg?.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      return error;
    }

    Toast({
      type: "error",
      message: "Failed to fetch builder upload.",
    });

    return error;
  }
};
