import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../common/types";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
