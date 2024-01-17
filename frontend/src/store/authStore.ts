import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, Response } from "../common/types";
import { userService } from "../apiServices/services";

export interface UserState {
  user: User | null;
  loading: boolean;
  refLoading?: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  refLoading: false,
  error: "",
};

export const logOut = createAsyncThunk<Response<null> | undefined>(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      const response = await userService.signOut();
      return Promise.resolve(response);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserState: (state, action: PayloadAction<UserState>) => {
      state.loading = action.payload?.loading;
      state.error = action.payload?.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.error = "";
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.loading = false;
    }),
      builder.addCase(logOut.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setAuthUser, setUserState } = userAuthSlice.actions;

export default userAuthSlice.reducer;
