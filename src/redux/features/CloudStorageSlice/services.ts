/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "@/redux/axios/axios";

export const GetAllDocuments = async () => {
  try {
    const res = await API.get("/clouds/storages");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const MoveDocumentToTrash = async (id: any) => {
  try {
    const res = await API.delete(`/clouds/storages/trashes/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RestoreFromTrash =async (id: string | number) => {
   try {
    const res = await API.post(`clouds/storages/restores/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const GetAllTrashedDocuments = async () => {
  try {
    const res = await API.get("/cloud/storages/trash");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteDocumentPermanently = async (id: any) => {
  try {
    const res = await API.delete(`/clouds/storages/deletes/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
