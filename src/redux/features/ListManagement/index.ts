import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../../config";

interface ListState {
  lists: IList[];
  selectedLists: IList[];
}

const initialState: ListState = {
  lists: [],
  selectedLists: [],
};

const ListSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<IList[]>) => {
      state.lists = action.payload;
    },
    setSelectedList: (state, action: PayloadAction<IList[]>) => {
      state.selectedLists = action.payload;
    },
  },
});

export const { setLists, setSelectedList } = ListSlice.actions;

export default ListSlice.reducer;
