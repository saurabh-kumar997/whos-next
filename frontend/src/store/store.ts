import { configureStore } from "@reduxjs/toolkit";
import customAccordionReducer from "./CustomAccordionSlice";
import userAuthReducer from "./authStore";

export const store = configureStore({
  reducer: {
    accordion: customAccordionReducer,
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
