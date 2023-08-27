import AxiosWrapper from "../common/axiosWrapper";
import UserService, { UserApiClient } from "./user";

const userApiClient = new UserApiClient(new AxiosWrapper());
export const userService = new UserService(userApiClient);
