/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBuilderUploadState {
  isLoading: boolean;
  isLoadingUpd: boolean;
}

const initialState: IBuilderUploadState = {
  isLoading: false,
  isLoadingUpd: false,
};

const builderUploadSlice = createSlice({
  name: "builderUpload",
  initialState,
  reducers: {
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsloadingUpd: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUpd = action.payload;
    },
  },
});

export const { setIsloading, setIsloadingUpd } = builderUploadSlice.actions;

export default builderUploadSlice.reducer;
