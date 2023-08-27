import { configureStore } from "@reduxjs/toolkit";
import customAccordionReducer from "./CustomAccordionSlice";
import userAuthSlice from "./authStore";

export const store = configureStore({
  reducer: {
    accordion: customAccordionReducer,
    userAuth: userAuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
