/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from "@/components/Toast";
import { IContacts, IList } from "@/config";
import { API } from "@/redux/axios/axios";
import { dispatch } from "@/redux/store";
import axios from "axios";
import { setLists } from ".";

export interface IListData {
  id: string;
  type: string;
  attributes: {
    campaign_title: string;
    organization: string;
    number_of_contacts: number;
    created_on: string;
  };
}

export interface IGetListsResp {
  data: IListData[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const CreateList = async (title: string, orgID: string) => {
  try {
    const res = await API.post("/campaign/creates/lists", {
      title,
      organization: orgID,
    });
    Toast({ type: "success", message: res.data.message });

    return res;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    // return error;
  }
};

export const GetListsAPI = async (
  orgID: string
): Promise<IGetListsResp | undefined> => {
  try {
    const res = await API.get(`/campaign/views/lists/${orgID}`);

    const respData = res.data.data as IListData[];

    const data: IList[] = respData.map((item) => {
      return {
        id: String(item.id),
        title: item.attributes.campaign_title,
        organization: item.attributes.organization,
        number_of_contacts: item.attributes.number_of_contacts,
        created_date: item.attributes.created_on,
      };
    });
    dispatch(setLists(data));
    const cacheKey = `lists-${orgID}`;
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const AddContactsManually = async (
  name: string,
  email: string,
  listID: string
) => {
  const params = {
    name,
    email,
    lists: listID,
  };
  try {
    const res = await API.post(`/campaign/creates/manual`, {
      name: params.name,
      email: params.email,
      lists: listID,
    });
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error);

    // return error;
  }
};

export const AddContactsViaExcel = async (formData: any) => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");
  try {
    const res = await axios.post(`/campaign/creates/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    console.log(res);
    // if (res.data.message === "Campaign list created") {
    //   Toast({ type: "success", message: "Contact added to list(s) database" });
    // }
    return res;
  } catch (error) {
    console.error(error);
    Toast({ type: "error", message: (error as any)?.response.data.message });
    // throw error;
  }
};
export const AddContactsViaExcelSubAccount = async (formData: any) => {
  const adminToken =
    sessionStorage.getItem("mailrionSubAccountToken") ||
    localStorage.getItem("mailrionSubAccountToken");
  try {
    const res = await axios.post(`/campaign/creates/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetListContacts = async (listID: string) => {
  try {
    const res = await API.get(`/campaign/shows/lists/${listID}`);
    console.log(res);
    const data: IContacts[] = res.data.campaign_lists.map((item: any) => {
      return {
        id: String(item.id),
        list_name: item.attributes.list,
        user: item.attributes.name,
        email: item.attributes.email,
        created_date: item.attributes.created_on,
      };
    });
    return data;
  } catch (error: any) {
    console.log(error);

    // return error;
  }
};

export const DeleteList = async (listID: string) => {
  try {
    const res = await API.delete(`/campaign/deletes/lists/${listID}`);
    console.log(res);
    // if (res.data.message === "Campaign list created") {
    //   Toast({ type: "success", message: "Contact added to list(s) database" });
    // }
    return res;
  } catch (error: any) {
    console.log(error);

    // return error;
  }
};

export const DeleteListContact = async (listID: string, contactID: string) => {
  try {
    const res = await API.delete(
      `/campaign/deletes/contacts/${listID}/${contactID}`
    );
    console.log(res);
    // if (res.data.message === "Campaign list created") {
    //   Toast({ type: "success", message: "Contact added to list(s) database" });
    // }
    return res;
  } catch (error: any) {
    console.log(error);

    // return error;
  }
};
