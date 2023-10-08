export type ToBeDoneBy = {
  _id: string;
  name: string;
};
export type LastDoneBy = {
  _id: string;
  name: string;
};
export type Activity = {
  lastDoneBy: LastDoneBy;
  doneOnDate: string;
};
export type Task = {
  _id: string;
  taskName: string;
  toBeDoneBy: ToBeDoneBy;
  activity?: Array<Activity> | null;
};
export type Member = {
  _id: string;
  email: string;
  name: string;
};

export type Group = {
  _id: string;
  admin: string;
  groupName: string;
  members?: Array<Member> | null;
  tasks?: Array<Task> | null;
};

export type User = {
  _id: string | null;
  email: string;
  name: string;
  groups?: Array<Group> | [] | null;
};

export type Response<T> = {
  data: T | null | undefined;
  message: string;
  status: number;
  error: any;
};

export type SignUpReq = {
  name: string;
  email: string;
  password: string;
};

export type SignInReq = {
  email: string;
  password: string;
};

export type SingInResp = {
  user: User;
  token: string;
  refreshToken: string;
};

export type RefTokenResp = {
  user: User;
  token: string;
};
export type RefTokenReq = {
  refreshToken: string;
};

export type CreateGroupReq = {
  groupName: string | undefined;
};

export type AddMembersReq = {
  email: string;
  groupId: string;
};

export type CreateTaskReq = {
  taskName: string;
  groupId: string;
  toBeDoneBy: string;
};

export type DeleteTaskReq = {
  taskId: string;
  groupId: string;
};
