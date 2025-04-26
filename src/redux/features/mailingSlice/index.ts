/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MailingState {
  isLoading: boolean;
  mails: null;
  mailContent: null;
  mailCount: number;
  startReading: boolean;
  startReplying: boolean;
}

const initialState: MailingState = {
  mails: null,
  mailContent: null,
  mailCount: 0,
  isLoading: false,
  startReading: false,
  startReplying: false,
};

const MailingSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMails: (state, action: PayloadAction<any | unknown>) => {
      state.mails = action.payload;
    },
    setMailContent: (state, action: PayloadAction<any>) => {
      state.mailContent = action.payload;
    },
    setMailCount: (state, action: PayloadAction<number>) => {
      state.mailCount = action.payload;
    },
    setStartReading: (state, action: PayloadAction<boolean>) => {
      state.startReading = action.payload;
    },
    setStartReplying: (state, action: PayloadAction<boolean>) => {
      state.startReplying = action.payload;
    },
  },
});

export const {
  setIsloading,
  setMailContent,
  setMails,
  setMailCount,
  setStartReading,
  setStartReplying,
} = MailingSlice.actions;

export default MailingSlice.reducer;
