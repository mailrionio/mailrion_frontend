import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Import your reducers here
import listReducer from "./features/ListManagement";
import organizationReducer from "./features/OrganizationSlice";
import EmailReducer from "./features/emailValidationSlice";
import LandingPageReducer from "./features/PagesSlice";
import CampaignReducer from "./features/CampaignPagesSlice";
import mailReducer from "./features/mailingSlice";
import useReducer from "./features/userSlice";
import utilReducer from "./features/utilSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    utils: utilReducer,
    organization: organizationReducer,
    mail: mailReducer,
    listManagement: listReducer,
    emailValidation: EmailReducer,
    landingPage: LandingPageReducer,
    campaign: CampaignReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

// Typing for the RootState
export type RootState = ReturnType<typeof store.getState>;

// Typing for the AppDispatch
export type AppDispatch = typeof store.dispatch;

// Typing for the AppThunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Custom hooks to use with react-redux
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const dispatch = store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
