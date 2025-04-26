import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMember, IOrganization } from "../../../config";

interface OrganizationState {
  isLoading: boolean;
  organization: IOrganization;
  selectedOrganization: {
    id: string;
    default: number;
    primaryMember: IMember;
  };
  members: IMember[];
  // error: any;
}

const initialState: OrganizationState = {
  organization: {
    id: "",
    organization: "",
    default: 0,
    hostname: "",
    logo: "",
    verified_date: "",
    created_date: "",
    members: [],
  },
  selectedOrganization: JSON.parse(
    localStorage.getItem("selectedOrganization") as "{}"
  ) || {
    id: "",
    default: 0,
    primaryMember: {} as IMember,
  },
  members: [],
  isLoading: false,
  // error: null,
};

const OrganizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrganization: (state, action: PayloadAction<IOrganization>) => {
      state.organization = action.payload;
    },
    setSelectedOrganization: (
      state,
      action: PayloadAction<{
        id: string;
        default: number;
        primaryMember: IMember;
      }>
    ) => {
      state.selectedOrganization = action.payload;
    },
    setOrganizationMembers: (state, action: PayloadAction<IMember[]>) => {
      state.members = action.payload;
    },
  },
});

export const {
  setIsloading,
  setOrganization,
  setOrganizationMembers,
  setSelectedOrganization,
} = OrganizationSlice.actions;

export default OrganizationSlice.reducer;
