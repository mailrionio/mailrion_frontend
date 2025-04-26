/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmailResultsType } from "@/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmialState {
  emailDetails: IEmailResultsType;
  isValidationLoading: boolean;
  emailList: any[];
}

const initialState: EmialState = {
  emailDetails: {} as IEmailResultsType,
  isValidationLoading: false,
  emailList: [],
};

const EmailSlice = createSlice({
  name: "emailValidationSlice",
  initialState,
  reducers: {
    setEmailDetails: (state, action: PayloadAction<any>) => {
      state.emailDetails = action.payload;
    },
    setEmailList: (state, action: PayloadAction<any[]>) => {
      state.emailList = action.payload;
    },
    setIsValidationLoading: (state, action: PayloadAction<boolean>) => {
      state.isValidationLoading = action.payload;
    },
  },
});

export const { setEmailDetails, setEmailList, setIsValidationLoading } =
  EmailSlice.actions;

export default EmailSlice.reducer;
