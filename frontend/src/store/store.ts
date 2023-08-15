import { configureStore } from "@reduxjs/toolkit";
import customAccordionReducer from "./CustomAccordionSlice";

export const store = configureStore({
  reducer: {
    accordion: customAccordionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
