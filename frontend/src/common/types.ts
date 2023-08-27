export type Activity = {
  lastDoneBy: string;
  doneOnDate: string;
};
export type Task = {
  _id: string;
  taskName: string;
  toBeDoneBy: string;
  activity?: Array<Activity> | [] | null;
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
  members?: Array<Member> | [] | null;
  tasks?: Array<Task> | [] | null;
};

export type User = {
  _id?: string | null;
  email: string;
  name: string;
  groups: Array<Group> | [] | null;
};

export type Response<T> = {
  data: T | null;
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
};

export type CreateGroupReq = {
  groupName: string;
};

export type AddMembersReq = {
  email: string;
  groupId: string;
};

export type CreateTaskReq = {
  taskName: string;
  toBeDoneBy: string;
  groupId: string;
};
