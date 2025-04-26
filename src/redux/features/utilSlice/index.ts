/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateData {
  category: string | null;
  label: string | null;
}

interface UtilState {
  searchQuery: string;
  usePageSearch: { content: string; show: boolean };
  theme: string;
  userPreffered: string;
  globalLoader: { loading: boolean; message?: string };
  pageName: string;
  campaignName: string;
  isNewsLetter: boolean;
  step: {
    [key: number]: boolean;
  };
  template: TemplateData;
  showBuilder: boolean;
}

const initialState: UtilState = {
  searchQuery: "",
  usePageSearch: { content: "This page", show: false },
  theme: localStorage.getItem("theme") || "light",
  userPreffered: "",
  globalLoader: { loading: false, message: "" },
  pageName: "",
  campaignName: "",
  isNewsLetter:
    JSON.parse(localStorage.getItem("isNewsLetter") || "false") || false,
  step: {
    1: false,
    2: false,
  },
  template: {
    category: JSON.parse(localStorage.getItem("category") || "null") || null,
    label: JSON.parse(localStorage.getItem("label") || "null") || null,
  },
  showBuilder:
    JSON.parse(localStorage.getItem("showBuilder") || "false") || false,
};

const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setUserPreffered: (state, action: PayloadAction<string>) => {
      state.userPreffered = action.payload;
    },
    setGlobalLoader: (
      state,
      action: PayloadAction<{
        loading: boolean;
        message?: string;
      }>
    ) => {
      state.globalLoader.loading = action.payload.loading;
      state.globalLoader.message = action.payload.message;
    },
    setPageSearch: (
      state,
      action: PayloadAction<{ content: string; show: boolean }>
    ) => {
      state.usePageSearch.content = action.payload.content;
      state.usePageSearch.show = action.payload.show;
    },
    setToggleStep: (state, { payload }: PayloadAction<number>) => {
      state.step = { ...state.step, [payload]: !state.step[payload] };
    },
    setPageName: (state, { payload }: PayloadAction<string>) => {
      state.pageName = payload;
    },
    setCampaignName: (state, { payload }: PayloadAction<string>) => {
      state.campaignName = payload;
    },
    setIsNewsLetter: (state, { payload }: PayloadAction<boolean>) => {
      state.isNewsLetter = payload;
    },
    setTemplate: (state, { payload }: { payload: TemplateData }) => {
      state.template = payload;
    },
    setShowBuilder: (state, { payload }: { payload: boolean }) => {
      state.showBuilder = payload;
    },
  },
});

export const {
  setSearchQuery,
  setTheme,
  setToggleStep,
  setTemplate,
  setPageName,
  setGlobalLoader,
  setPageSearch,
  setCampaignName,
  setShowBuilder,
  setIsNewsLetter,
  setUserPreffered,
} = utilSlice.actions;

export default utilSlice.reducer;
