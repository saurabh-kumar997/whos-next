import AxiosWrapper from "../common/axiosWrapper";
import UserService, { UserApiClient } from "./user";
import GroupsService, { GroupsApiClient } from "./groups";

const userApiClient = new UserApiClient(new AxiosWrapper());
export const userService = new UserService(userApiClient);

const groupApiClient = new GroupsApiClient(new AxiosWrapper());
export const groupService = new GroupsService(groupApiClient);
