/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Toast from "../../../components/Toast";
import { API } from "../../axios/axios";
// export const ComposeNewMail = async (orgID: string, mail: any) => {
//   const subAccount = sessionStorage.getItem("mailrionSubAccountToken");
//   console.log(mail);

//   try {
//     const res = await API.post(`/mailboxes/sends/mails/${orgID}`, mail )

//     Toast({ type: "success", message: res.data.message });
//     return res;
//   } catch (error: any) {
//     Toast({ type: "error", message: error.response.data.message });
//     console.log(error);
//     return error;
//   }
// };
export const ComposeNewMail = async (orgID: string, mail: any) => {
  const subAccount =
    sessionStorage.getItem("mailrionSubAccountToken") ||
    localStorage.getItem("mailrionSubAccountToken");
  try {
    const res = await axios.post(`/mailboxes/sends/mails/${orgID}`, mail, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${subAccount}`,
      },
    });
    Toast({ type: "success", message: res.data.message });
    return res;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};
export const AdminComposeNewMail = async (
  orgID: string,
  userID: string,
  mail: any,
  resMsg?: string
) => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");
  try {
    const res = await axios.post(
      userID === "-1"
        ? `/mailboxes/sends/mails/${orgID}`
        : `/mailboxes/sends/mails/${orgID}/${userID}`,
      mail,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    Toast({
      type: "success",
      message: resMsg ? resMsg : "Mail sent successfully",
    });
    return res;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const GetMailbox = async (box: any) => {
  try {
    const res = await API.get(`/all/mailboxes/${box}`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};
export const GetMails = async (id: string, box: string, limit?: number) => {
  try {
    const res = await API.get(
      `/mailboxes/${id}/${box}${limit ? `/${limit}` : ""}`
    );
    console.log(res);
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};
export const GetAdminMails = async (
  orgId: string,
  adminID: string,
  box: string
  // current_page: number
) => {
  try {
    const res = await API.get(`/mailboxes/finds/${orgId}/${adminID}/${box}`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const MoveMailToTrash = async (
  orgId: string,
  box: string,
  mailId: string
) => {
  try {
    const res = await API.delete(
      `/mailboxes/deletes/${orgId}/${box}/${mailId}`
    );
    Toast({ type: "success", message: "Mail moved to trash" });
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const MoveMultipleMailToTrash = async (
  primaryMemberID: string,
  orgId: string,
  box: string,
  mailIds: string[]
) => {
  const ids = mailIds;
  try {
    const res = await API.delete(
      `mailboxes/deletes/${orgId}/${primaryMemberID}/${box}/${ids}`
    );
    console.log(res);
    Toast({ type: "success", message: "Mails moved to trash" });
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const DeleteMailForever = async (
  primaryMemberID: string,
  orgID: string,
  box: string,
  mailId: string
) => {
  try {
    const res = await API.delete(
      `/mailboxes/deletes/${orgID}/${primaryMemberID}/${box}/${mailId}`
    );
    // Toast({ type: "success", message: res.data.message });
    return res.data;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    // return error;
  }
};

export const EmptyMails = async (
  primaryMemberID: string,
  orgID: string,
  box: string
) => {
  try {
    const res = await API.delete(
      `/mailboxes/deletes/${orgID}/${primaryMemberID}/${box}`
    );
    // Toast({ type: "success", message: res.data.message });
    return res.data;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    // return error;
  }
};

export const MarkMailAsRead = async (
  orgID: string,
  userID: string,
  mailID: string
) => {
  console.log(orgID, mailID);

  try {
    const res = await API.post(`/mailboxes/${orgID}/${userID}/messages/seen`, {
      message_id: mailID,
    });
    console.log(res);
    // Toast({ type: "success", message: res.data.message });
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const FlagMail = async (
  orgID: string,
  userID: string,
  mailID: string
) => {
  console.log(orgID, mailID);

  try {
    const res = await API.post(`/mailboxes/${orgID}/${userID}/flags/messages`, {
      message_id: mailID,
    });
    console.log(res);
    Toast({ type: "success", message: res.data.message });
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const UnFlagMail = async (
  orgID: string,
  userID: string,
  mailID: string
) => {
  console.log(orgID, mailID);

  try {
    const res = await API.post(
      `/mailboxes/${orgID}/${userID}/unflags/messages`,
      { message_id: mailID }
    );
    console.log(res);
    Toast({ type: "success", message: res.data.message });
    return res.data;
  } catch (error: any) {
    // Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};

export const SaveMailasDraft = async (
  orgID: string,
  userID: string,
  draftMail: any
) => {
  const adminToken =
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken");
  try {
    const res = await axios.post(
      `https://api.mailrion.net/api/v1/mailboxes/saves/mails/${orgID}/${userID}`,
      draftMail,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    Toast({ type: "success", message: "Mail saved as draft" });
    return res;
  } catch (error: any) {
    Toast({ type: "error", message: error.response.data.message });
    console.log(error);
    return error;
  }
};
