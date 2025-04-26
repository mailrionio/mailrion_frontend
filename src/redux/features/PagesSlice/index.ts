/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScreenshot } from "./services";

export interface IPages {
  userId: string;
  pageId: string;
  pageName: string;
  screenshot: IScreenshot | null;
  createdDate: string;
  updatedDate: string;
}

interface IPagesState {
  isLoading: boolean;
  isLoadingDel: boolean;
  isLoadingGet: boolean;
  errorLoading: boolean;
  pages: IPages[];
}

const initialState: IPagesState = {
  isLoading: false,
  isLoadingDel: false,
  isLoadingGet: false,
  errorLoading: false,
  pages: [],
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsloadingDel: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDel = action.payload;
    },
    setIsloadingGet: (state, action: PayloadAction<boolean>) => {
      state.isLoadingGet = action.payload;
    },
    setErrorLoading: (state, action: PayloadAction<boolean>) => {
      state.errorLoading = action.payload;
    },
    setLandingPages: (state, { payload }: { payload: IPages }) => {
      state.pages = [...state.pages, payload];
    },
    setLandingPagesEdit: (state, { payload }: { payload: IPages }) => {
      const { pageId, userId } = payload;
      let updatedPages = [...state.pages];

      const index = updatedPages.findIndex(
        (proj) => proj.pageId === pageId && proj.userId === userId
      );

      if (index !== -1) {
        updatedPages[index] = {
          ...payload,
        };
      }

      state.pages = updatedPages;
    },
    setLandingPagesDelete: (
      state,
      { payload }: { payload: { pageId: string; userId: string } }
    ) => {
      const { pageId, userId } = payload;
      const filterPages = state.pages.filter(
        (proj) => proj.pageId !== pageId || proj.userId !== userId
      );

      state.pages = filterPages;
    },
  },
});

export const {
  setIsloading,
  setIsloadingDel,
  setIsloadingGet,
  setErrorLoading,
  setLandingPages,
  setLandingPagesEdit,
  setLandingPagesDelete,
} = pagesSlice.actions;

export default pagesSlice.reducer;
