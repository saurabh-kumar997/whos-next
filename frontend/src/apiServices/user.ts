import AxiosWrapper from "../common/axiosWrapper";
import {
  Response,
  User,
  SignUpReq,
  SignInReq,
  SingInResp,
  RefTokenResp,
  RefTokenReq,
} from "../common/types";

export interface IUserApiClient {
  signUp(body: SignUpReq): Promise<Response<User> | undefined>;
  signIn(body: SignInReq): Promise<Response<SingInResp> | undefined>;
  refreshToken(body: RefTokenReq): Promise<Response<RefTokenResp> | undefined>;
  signOut(): Promise<Response<null> | undefined>;
}

export class UserApiClient implements IUserApiClient {
  userApiClient: AxiosWrapper;

  constructor(userApiClient: AxiosWrapper) {
    this.userApiClient = userApiClient;
  }
  async signUp(body: SignUpReq): Promise<Response<User> | undefined> {
    try {
      return await this.userApiClient.post<SignUpReq, Response<User>>(
        "/signup",
        body
      );
    } catch (err) {
      console.error(err);
    }
  }
  async signIn(body: SignInReq): Promise<Response<SingInResp> | undefined> {
    try {
      return await this.userApiClient.post<SignInReq, Response<SingInResp>>(
        "/signin",
        body
      );
    } catch (err) {
      console.error(err);
    }
  }
  async refreshToken(
    body: RefTokenReq
  ): Promise<Response<RefTokenResp> | undefined> {
    try {
      return await this.userApiClient.post<
        RefTokenReq,
        Response<RefTokenResp> | undefined
      >("/refresh-token", body);
    } catch (err) {
      console.error(err);
    }
  }
  async signOut(): Promise<Response<null> | undefined> {
    try {
      return await this.userApiClient.delete<Response<null> | undefined>(
        "/refresh-token"
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default class UserService {
  userApiClient: IUserApiClient;

  constructor(userApiClient: IUserApiClient) {
    this.userApiClient = userApiClient;
  }

  async signUp(body: SignUpReq): Promise<Response<User> | undefined> {
    return this.userApiClient.signUp(body);
  }
  async signIn(body: SignInReq): Promise<Response<SingInResp> | undefined> {
    return this.userApiClient.signIn(body);
  }
  async signOut(): Promise<Response<null> | undefined> {
    return this.userApiClient.signOut();
  }
  async refreshToken(
    body: RefTokenReq
  ): Promise<Response<RefTokenResp> | undefined> {
    return this.userApiClient.refreshToken(body);
  }
}
