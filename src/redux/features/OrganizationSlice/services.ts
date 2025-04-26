/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { setIsloading, setOrganization, setOrganizationMembers } from ".";
import Toast from "../../../components/Toast";
import { IMember, IOrganization } from "../../../config";
import { API } from "../../axios/axios";
import { dispatch } from "../../store";

export const CreateOrganization = async (data: any) => {
  dispatch(setIsloading(true));
  try {
    const response = await axios.post("creates/smtp/accounts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("mailrionAdminToken")}`,
      },
    });
    dispatch(setIsloading(false));
    Toast({ type: "success", message: response.data.message });
    return response;
  } catch (error: any) {
    dispatch(setIsloading(false));
    console.log(error);
    if (error.response.data.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    if (error.response.data?.hostname?.[0]) {
      Toast({ type: "error", message: error.response.data.hostname[0] });
    }
    if (error.response.data?.organization?.[0]) {
      Toast({ type: "error", message: error.response.data.organization[0] });
    }
    return error;
  }
};

export const FetchOrganizations = async () => {
  dispatch(setIsloading(true));
  try {
    const response = await API.get(`/all/smtp/accounts`);
    dispatch(setIsloading(false));
    return response;
  } catch (error: any) {
    dispatch(setIsloading(false));
    if (error.response.data.message === "Unauthenticated.") {
      Toast({
        type: "error",
        message: "Authentication failed, please reload the page and try again.",
      });
      localStorage.clear();
      sessionStorage.clear();
      return error;
    }
    // return error;
  }
};
export const FetchSingleOrganization = async (id: any) => {
  dispatch(setIsloading(true));
  try {
    const response = await API.get(`/smtp/accounts/${id}`);
    dispatch(setIsloading(false));
    const orgObj: IOrganization = {
      id: response.data.accounts.id,
      organization: response.data.accounts.attributes.organization,
      default: response.data.accounts.attributes.default,
      hostname: response.data.accounts.attributes.hostname,
      logo: response.data.accounts.attributes.logo,
      verified_date: response.data.accounts.attributes.verified_date,
      created_date: response.data.accounts.attributes.created_date,
      members: response.data.accounts.attributes.members?.map(
        (member: IMember) => {
          return {
            ...member,
          };
        }
      ),
    };
    dispatch(setOrganization(orgObj));
    return response;
  } catch (error: any) {
    dispatch(setIsloading(false));
    console.log(error);
    return error;
  }
};

export const AddMemberToOrg = async (data: any, orgID: string) => {
  try {
    const res = await API.post(`/adds/users/accounts/${orgID}`, data);
    Toast({ type: "success", message: res.data.message });
    return res;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
      Toast({ type: "error", message: error.message as string });
      return;
    }
    if (error.response.data.email[0]) {
      Toast({ type: "error", message: error.response.data.email[0] });
    } else {
      Toast({ type: "error", message: error.response.data.message });
    }
    console.log(error);
    // return error;
  }
};

export const DeleteOrganization = async (id: string) => {
  try {
    const response = await API.delete(`/deletes/smtp/accounts/${id}`);
    if (response.data.message === "Account Deleted") {
      Toast({ type: "success", message: "Organization deleted successfully" });
    }
    return response;
  } catch (error: any) {
    console.log(error);
    Toast({ type: "error", message: error.response.data.message });
    return error;
  }
};

export const VerifyDomain = async (data: any) => {
  try {
    const response = await API.post(`/verifies/mxrecords`, data);
    return response;
  } catch (error: any) {
    console.log(error);
    if (error.code === "ENOTFOUND") {
      Toast({ type: "error", message: "Domain not found" });
    } else if (error.code === "ECONNREFUSED") {
      Toast({ type: "error", message: "Connection refused" });
    } else if (error.code === "ERR_NETWORK") {
      Toast({ type: "error", message: "Network error, try again" });
      return;
    } else Toast({ type: "error", message: error.response?.data?.message });
  }
};

export const MakePrimaryEmail = async (data: any) => {
  try {
    const response = await API.post(`/toggles/users/status`, data);
    Toast({ type: "success", message: "Email set as Primary" });
    return response;
  } catch (error: any) {
    if (error.response.data.email?.[0]) {
      Toast({ type: "error", message: error.response.data.email?.[0] });
    } else {
      Toast({ type: "error", message: error.response.data.message });
    }
    return error;
  }
};

export const GetOrganizationMembers = async (id: string) => {
  dispatch(setIsloading(true));
  const convertResponseToMemberTypes = (data: any[]): IMember[] => {
    const memebers: IMember[] = data.map((item) => {
      return {
        id: item.id,
        email: item.attributes.email,
        name: item.attributes.name,
        default: item.attributes.default,
      };
    });

    return memebers;
  };
  try {
    const response = await API.get(`/all/users/accounts/${id}`);
    const members = convertResponseToMemberTypes(response.data.accounts);
    dispatch(setOrganizationMembers(members));
    dispatch(setIsloading(false));
    return response;
  } catch (error: any) {
    console.log(error);
    dispatch(setIsloading(false));
    return error;
  }
};

export const ToggleOrganizationStatus = async (data: any) => {
  try {
    const response = await API.post(`/toggles/accounts/status`, data);
    // Toast({ type: "success", message: response.data.message });
    return response;
  } catch (error: any) {
    console.log(error);
    // Toast({ type: "error", message: error.response.data.message });
    return error;
  }
};

export const ToggleMemberStatus = async (data: any) => {
  try {
    const response = await API.post(`/toggles/users/status`, data);
    // Toast({ type: "success", message: response.data.message });
    return response;
  } catch (error: any) {
    console.log(error);
    // Toast({ type: "error", message: error.response.data.message });
    return error;
  }
};
