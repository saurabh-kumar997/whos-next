import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CustomAccordionState {
  panel: string;
}

const initialState: CustomAccordionState = {
  panel: "",
};

export const customAccordionSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    onClickPanel: (state, action: PayloadAction<string>) => {
      state.panel = state.panel === action.payload ? "" : action.payload;
    },
  },
});

export const { onClickPanel } = customAccordionSlice.actions;

export default customAccordionSlice.reducer;
