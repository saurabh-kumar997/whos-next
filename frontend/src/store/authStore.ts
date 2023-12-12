import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  Response,
  SignInReq,
  SignUpReq,
  SingInResp,
  RefTokenReq,
  RefTokenResp,
} from "../common/types";
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

export const userSignUp = createAsyncThunk<
  Response<User> | undefined,
  SignUpReq
>("auth/userSignUp", async (payload, thunkAPI) => {
  try {
    const response = await userService.signUp(payload);
    console.log("RESPONSE", response);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const userSignIn = createAsyncThunk<
  Response<SingInResp> | undefined,
  SignInReq
>("auth/userSignIn", async (payload, thunkAPI) => {
  try {
    const response = await userService.signIn(payload);
    return Promise.resolve(response);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const refreshToken = createAsyncThunk<
  Response<RefTokenResp> | undefined,
  RefTokenReq
>("auth/refreshToken", async (payload, thunkAPI) => {
  try {
    const response = await userService.refreshToken(payload);
    return Promise.resolve(response);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const logOut = createAsyncThunk<Response<any> | undefined>(
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
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.loading = false;
    }),
      builder.addCase(userSignUp.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }),
      builder.addCase(userSignIn.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.data) {
          const { user, token, refreshToken } = action.payload.data;
          state.user = user;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
        }
      }),
      builder.addCase(userSignIn.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(userSignIn.rejected, (state, action) => {
        console.log("ACTION", action);
        state.refLoading = false;
        state.error = action.error.message || "Something went wrong";
      }),
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.error = "";
        state.loading = false;
        if (action.payload && action.payload.data) {
          const { user, token } = action.payload.data;
          state.user = user;
          localStorage.setItem("token", token);
        }
      }),
      builder.addCase(refreshToken.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      }),
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
