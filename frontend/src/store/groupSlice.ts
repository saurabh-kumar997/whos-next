import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Response, Group } from "../common/types";
import { groupService } from "../apiServices/services";

const fetchAllGroups = createAsyncThunk(
  "group/fetchAllGroups",
  async (_, thunkAPI) => {
    try {
      const response = await groupService.getGroups();
      return response?.data;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error?.message });
    }
  }
);

export interface GroupState {
  groups: Group[] | [] | undefined | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: "",
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload?.data;
    }),
      builder.addCase(fetchAllGroups.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(fetchAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const {} = groupSlice.actions;

export default groupSlice.reducer;
