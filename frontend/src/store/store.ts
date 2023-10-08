import { configureStore } from "@reduxjs/toolkit";
import customAccordionReducer from "./CustomAccordionSlice";
import userAuthReducer from "./authStore";
import groupReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    // accordion: customAccordionReducer,
    userAuth: userAuthReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
