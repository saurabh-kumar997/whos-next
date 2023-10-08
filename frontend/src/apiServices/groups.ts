import AxiosWrapper from "../common/axiosWrapper";
import {
  AddMembersReq,
  CreateGroupReq,
  CreateTaskReq,
  DeleteTaskReq,
  Group,
  Response,
} from "../common/types";

export interface IGroupsApiClient {
  getGroups(): Promise<Response<Group[]> | undefined>;
  createGroup(body: CreateGroupReq): Promise<Response<Group> | undefined>;
  deleteGroup(groupId: string): Promise<Response<string> | undefined>;
  updateGroup(
    groupId: string | undefined,
    body: CreateGroupReq
  ): Promise<Response<Group> | undefined>;
  addMember(body: AddMembersReq): Promise<Response<Group> | undefined>;
  removeMember(body: AddMembersReq): Promise<Response<Group> | undefined>;
  createTask(body: CreateTaskReq): Promise<Response<Group> | undefined>;
  deleteTask(body: DeleteTaskReq): Promise<Response<Group> | undefined>;
  markTaskAsDone(body: DeleteTaskReq): Promise<Response<Group> | undefined>;
}

export class GroupsApiClient implements IGroupsApiClient {
  groupApiClient: AxiosWrapper;

  constructor(userApiClient: AxiosWrapper) {
    this.groupApiClient = userApiClient;
  }
  async getGroups(): Promise<Response<Group[]> | undefined> {
    try {
      return await this.groupApiClient.get<Response<Group[]>>(
        "/group/get-groups"
      );
    } catch (err) {
      console.error(err);
    }
  }

  async createGroup(
    body: CreateGroupReq
  ): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<CreateGroupReq, Response<Group>>(
        "/group/create-group",
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async updateGroup(
    groupId: string | undefined,
    body: CreateGroupReq
  ): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.patch<CreateGroupReq, Response<Group>>(
        `/group/update-group/${groupId}`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async deleteGroup(groupId: string): Promise<Response<string> | undefined> {
    try {
      return await this.groupApiClient.delete<Response<string>>(
        `/group/delete-group/${groupId}`
      );
    } catch (err) {
      console.error(err);
    }
  }

  async addMember(body: AddMembersReq): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<AddMembersReq, Response<Group>>(
        `/group/add-members`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async removeMember(
    body: AddMembersReq
  ): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<AddMembersReq, Response<Group>>(
        `/group/remove-members`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async createTask(body: CreateTaskReq): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<CreateTaskReq, Response<Group>>(
        `/group/create-task`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async deleteTask(body: DeleteTaskReq): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<DeleteTaskReq, Response<Group>>(
        `/group/delete-task`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }

  async markTaskAsDone(
    body: DeleteTaskReq
  ): Promise<Response<Group> | undefined> {
    try {
      return await this.groupApiClient.post<DeleteTaskReq, Response<Group>>(
        `/group/mark-task-done`,
        body
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default class GroupsService {
  groupsApiClient: IGroupsApiClient;

  constructor(groupsApiClient: IGroupsApiClient) {
    this.groupsApiClient = groupsApiClient;
  }

  async getGroups(): Promise<Response<Group[]> | undefined> {
    return this.groupsApiClient.getGroups();
  }

  async deleteGroup(body: string): Promise<Response<string> | undefined> {
    return this.groupsApiClient.deleteGroup(body);
  }

  async createGroup(
    body: CreateGroupReq
  ): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.createGroup(body);
  }

  async updateGroup(
    groupId: string | undefined,
    body: CreateGroupReq
  ): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.updateGroup(groupId, body);
  }

  async addMember(body: AddMembersReq): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.addMember(body);
  }

  async removeMember(
    body: AddMembersReq
  ): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.removeMember(body);
  }

  async createTask(body: CreateTaskReq): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.createTask(body);
  }
  async deleteTask(body: DeleteTaskReq): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.deleteTask(body);
  }

  async markTaskAsDone(
    body: DeleteTaskReq
  ): Promise<Response<Group> | undefined> {
    return this.groupsApiClient.markTaskAsDone(body);
  }
}
