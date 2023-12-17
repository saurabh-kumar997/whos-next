import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Response,
  Group,
  CreateGroupReq,
  AddMembersReq,
  CreateTaskReq,
  DeleteTaskReq,
} from "../common/types";
import { groupService } from "../apiServices/services";

export const fetchAllGroups = createAsyncThunk<
  Response<Group[]> | undefined,
  void
>("group/fetchAllGroups", async (_, thunkAPI) => {
  try {
    const response = await groupService.getGroups();
    console.log("RESPONSE", response);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const createGroup = createAsyncThunk<
  Response<Group> | undefined,
  CreateGroupReq
>("group/createGroup", async (payload, thunkAPI) => {
  try {
    const response = await groupService.createGroup(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deleteGroup = createAsyncThunk<
  Response<string> | undefined,
  string
>("group/deleteGroup", async (payload, thunkAPI) => {
  try {
    const response = await groupService.deleteGroup(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const updateGroup = createAsyncThunk<
  Response<Group> | undefined,
  { groupId: string | undefined; groupName: string | undefined }
>("group/updateGroup", async (payload, thunkAPI) => {
  try {
    const { groupId, groupName } = payload;
    const response = await groupService.updateGroup(groupId, { groupName });
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const addMember = createAsyncThunk<
  Response<Group> | undefined,
  AddMembersReq
>("group/addMember", async (payload, thunkAPI) => {
  try {
    const response = await groupService.addMember(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const removeMember = createAsyncThunk<
  Response<Group> | undefined,
  AddMembersReq
>("group/removeMember", async (payload, thunkAPI) => {
  try {
    const response = await groupService.removeMember(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const addTask = createAsyncThunk<
  Response<Group> | undefined,
  CreateTaskReq
>("group/addTask", async (payload, thunkAPI) => {
  try {
    const response = await groupService.createTask(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const removeTask = createAsyncThunk<
  Response<Group> | undefined,
  DeleteTaskReq
>("group/removeTask", async (payload, thunkAPI) => {
  try {
    const response = await groupService.deleteTask(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const markTaskAsDone = createAsyncThunk<
  Response<Group> | undefined,
  DeleteTaskReq
>("group/markTaskAsDone", async (payload, thunkAPI) => {
  try {
    const response = await groupService.markTaskAsDone(payload);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export interface GroupState {
  groups: Group[] | undefined | null;
  loading: boolean;
  error: string | null;
  group: Group | null;
  groupId: string;
  groupDetailFlag: boolean;
  createGroupFlag: boolean;
  addTaskFlag: boolean;
}

const initialState: GroupState = {
  groups: [],
  group: null,
  loading: false,
  error: "",
  groupId: "",
  createGroupFlag: false,
  groupDetailFlag: false,
  addTaskFlag: false,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    onClickPanel: (state, action: PayloadAction<string>) => {
      console.log("action", action);
      const id = action.payload;
      state.groupId = state.groupId === id ? "" : id;
      if (state.groupId !== "") {
        const indivGrp = state.groups?.filter((item) => item._id === id);
        state.group = indivGrp && indivGrp.length > 0 ? indivGrp[0] : null;
      } else {
        state.group = null;
      }
    },
    setGroupDetailFlag: (state) => {
      state.groupDetailFlag = !state.groupDetailFlag;
    },
    setCreateGroupFlag: (state) => {
      state.createGroupFlag = !state.createGroupFlag;
    },
    setViewTask: (state) => {
      state.addTaskFlag = !state.addTaskFlag;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload?.data || [];
    }),
      builder.addCase(fetchAllGroups.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(fetchAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = [
          ...(state.groups as Group[]),
          action.payload?.data as Group,
        ];
        state.createGroupFlag = false;
      }),
      builder.addCase(createGroup.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        const delId = action.payload?.data;
        state.groups = state.groups?.filter((group) => group._id !== delId);
      }),
      builder.addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const grpResp = action.payload?.data as Group;
        // console.log("grpResp", grpResp);
        state.groups = state.groups?.map((group) => {
          if (group._id === grpResp?._id) {
            group.groupName = grpResp.groupName;
          }
          return group;
        });
        state.groupDetailFlag = false;
      }),
      builder.addCase(updateGroup.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        // state.groupDetailFlag = false;
        const group = action.payload?.data as Group;
        state.group = group;
        state.groups = state.groups?.map((item) => {
          if (item._id === group._id) {
            return group;
          }
          return item;
        });
      }),
      builder.addCase(addMember.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(removeMember.fulfilled, (state, action) => {
        state.loading = false;
        const group = action.payload?.data as Group;
        state.group = group;
        state.groups = state.groups?.map((item) => {
          if (item._id === group._id) {
            return group;
          }
          return item;
        });
      }),
      builder.addCase(removeMember.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        const group = action.payload?.data as Group;
        state.group = group;
        state.groups = state.groups?.map((item) => {
          if (item._id === group._id) {
            return group;
          }
          return item;
        });
        state.addTaskFlag = false;
      }),
      builder.addCase(addTask.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        const group = action.payload?.data as Group;
        state.group = group;
        state.groups = state.groups?.map((item) => {
          if (item._id === group._id) {
            return group;
          }
          return item;
        });
      }),
      builder.addCase(removeTask.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      }),
      builder.addCase(markTaskAsDone.fulfilled, (state, action) => {
        state.loading = false;
        const group = action.payload?.data as Group;
        state.group = group ? group : null;
        state.groups = state.groups?.map((item) => {
          if (item._id === group._id) {
            return group;
          }
          return item;
        });
      }),
      builder.addCase(markTaskAsDone.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(markTaskAsDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!!";
      });
  },
});

export const {
  onClickPanel,
  setGroupDetailFlag,
  setCreateGroupFlag,
  setViewTask,
} = groupSlice.actions;

export default groupSlice.reducer;
