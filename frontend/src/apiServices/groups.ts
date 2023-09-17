import AxiosWrapper from "../common/axiosWrapper";
import { Response, Group } from "../common/types";

export interface IGroupsApiClient {
  getGroups(): Promise<Response<Group[]> | undefined>;
}

export class GroupsApiClient implements IGroupsApiClient {
  userApiClient: AxiosWrapper;

  constructor(userApiClient: AxiosWrapper) {
    this.userApiClient = userApiClient;
  }
  async getGroups(): Promise<Response<Group[]> | undefined> {
    try {
      return await this.userApiClient.get<Response<Group[]>>(
        "/group/get-groups"
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
}
