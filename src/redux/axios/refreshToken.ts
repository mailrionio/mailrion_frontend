import axios from "axios";

export const RefreshToken = async () => {
  let refreshToken = localStorage.getItem("mailrionRefreshToken");
  const formBody = {
    refresh_token: refreshToken,
  };
  try {
    if (refreshToken === null) {
      localStorage.clear();
      sessionStorage.clear();
      return;
    } else {
      const res = await axios.post(
        "https://api.mailrion.net/api/v1/refresh-token",
        formBody
      );
      return res.data;
    }
  } catch (err) {
    console.log("this is error on refresh token file: ", err);
    localStorage.clear();
    sessionStorage.clear();
  }
};
