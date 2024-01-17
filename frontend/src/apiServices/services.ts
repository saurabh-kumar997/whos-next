import AxiosWrapper from "../common/axiosWrapper";
import UserService, { UserApiClient } from "./user";
import GroupsService, { GroupsApiClient } from "./groups";
import { store } from "../store/store";

const userApiClient = new UserApiClient(new AxiosWrapper(store));
export const userService = new UserService(userApiClient);

const groupApiClient = new GroupsApiClient(new AxiosWrapper(store));
export const groupService = new GroupsService(groupApiClient);
