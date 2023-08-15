export type Activity = {
  lastDoneBy: string;
  doneOnDate: string;
};
export type Task = {
  _id: string;
  taskName: string;
  toBeDoneBy: string;
  activity: Array<Activity>;
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
  members: Array<Member>;
  tasks: Array<Task>;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  groups: Array<Group>;
};
