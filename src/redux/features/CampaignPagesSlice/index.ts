/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export interface ICampaign {
  userId: string;
  campaignId: string;
  campaignName: string;
  subject: string;
  body?: string;
  status: string;
  showBuilder: boolean;
  createdDate: string;
  updatedDate: string;
}

interface ICampaignPagesState {
  campaigns: ICampaign[];
}

const initialState: ICampaignPagesState = {
  campaigns: JSON.parse(localStorage.getItem("campaigns") || "[]") || [],
};

const CampaignPagesSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCampaign: (state, { payload }: { payload: ICampaign }) => {
      state.campaigns = [...state.campaigns, payload];
    },
    setCampaignEdit: (state, { payload }: { payload: ICampaign }) => {
      const { campaignId, userId } = payload;
      let updatedCampaign = [...state.campaigns];

      const index = updatedCampaign.findIndex(
        (proj) => proj.campaignId === campaignId && proj.userId === userId
      );

      if (index !== -1) {
        updatedCampaign[index] = {
          ...payload,
        };
      }

      state.campaigns = updatedCampaign;
    },
    setCampaignDelete: (
      state,
      { payload }: { payload: { campaignId: string; userId: string } }
    ) => {
      const { campaignId, userId } = payload;
      const filterPages = state.campaigns.filter(
        (camp) => camp.campaignId !== campaignId || camp.userId !== userId
      );

      state.campaigns = filterPages;
    },
  },
});

export const { setCampaign, setCampaignEdit, setCampaignDelete } =
  CampaignPagesSlice.actions;

export default CampaignPagesSlice.reducer;
