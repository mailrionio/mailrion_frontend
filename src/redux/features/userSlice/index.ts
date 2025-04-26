/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IuserType } from "../../../config";

interface UserState {
  admin: IuserType;
  subAccount: IuserType;
  adminToken: string | null;
  subAccountToken: string | null;
  isLoading: boolean;
  error: any;
}

const initialState: UserState = {
  admin: JSON.parse(
    sessionStorage.getItem("admin") || localStorage.getItem("admin") || "{}"
  ),
  subAccount: JSON.parse(
    sessionStorage.getItem("subAccount") ||
      localStorage.getItem("subAccount") ||
      "{}"
  ),
  adminToken:
    sessionStorage.getItem("mailrionAdminToken") ||
    localStorage.getItem("mailrionAdminToken") ||
    null,
  subAccountToken:
    sessionStorage.getItem("mailrionSubAccountToken") ||
    localStorage.getItem("mailrionSubAccountToken") ||
    null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<any>) => {
      state.admin = action.payload;
    },
    setSubAccount: (state, action: PayloadAction<any>) => {
      state.subAccount = action.payload;
    },
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.adminToken = action.payload;
    },
    setSubAccountToken: (state, action: PayloadAction<string>) => {
      state.subAccountToken = action.payload;
    },
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAdminToken,
  setAdmin,
  setSubAccountToken,
  setIsloading,
  setSubAccount,
} = userSlice.actions;

export default userSlice.reducer;
