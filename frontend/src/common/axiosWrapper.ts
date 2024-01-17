import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import Axios, { AxiosHeaders, AxiosInstance } from "axios";
import { setLogOut } from "../store/groupSlice";
import { AppDispatch } from "../store/store";
import { RefTokenResp } from "./types";

export interface IApiClient {
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  patch<TRequest, TResponse>(
    path: string,
    object: TRequest
  ): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string): Promise<TResponse>;
}

export default class AxiosWrapper implements IApiClient {
  private client: AxiosInstance;
  private store: ToolkitStore;

  protected createHeaders = () => {
    const headers = new AxiosHeaders();
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    return headers;
  };

  protected createAxiosClient(): AxiosInstance {
    const instance = Axios.create({
      baseURL: "http://localhost:8000/api",
      responseType: "json",
      headers: this.createHeaders(),
      timeout: 10 * 1000,
    });

    console.log("INSTA", instance);
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (
          config.url === "/refresh-token" &&
          config.method?.toLocaleLowerCase() === "delete"
        ) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            config.headers["x-refresh"] = refreshToken;
          }
        }
        if (token) {
          config.headers["x-token"] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("ERRRRRR", error);
        const dispatch: AppDispatch = this.store.dispatch;
        const originalRequest = error.config;

        const { url } = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        const retryForRefresh =
          url !== "/signin" &&
          url !== "/signup" &&
          error.response?.status === 401 &&
          !originalRequest._retry;
        if (
          retryForRefresh
          // !(url === "/refresh-token" && method.toLocaleLowerCase() === "delete")
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await instance.post("/refresh-token", {
              refreshToken,
            });

            console.log("responseresponse", response);
            if (response.status === 200) {
              const { token } = response.data?.data as RefTokenResp;

              localStorage.setItem("token", token);

              // Retry the original request with the new token
              originalRequest.headers["x-token"] = token;
              return instance(originalRequest);
            }
            return Promise.reject(response);
          } catch (err) {
            // Handle refresh token error or redirect to login
            console.log("ERRRORORRRPOROROROROR", err);
            dispatch(setLogOut());
            console.error(err);
            return Promise.reject(err);
          }
        } else {
          return Promise.reject(error.response?.data);
        }
      }
    );

    return instance;
  }

  constructor(store: ToolkitStore) {
    this.client = this.createAxiosClient();
    this.store = store;
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve<TResponse>(response.data);
    } catch (error) {
      console.error(error);
      return error as TResponse;
    }
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload);
      console.log("RESPONSEEEEE", response);
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve<TResponse>(response.data);
    } catch (error) {
      console.error(error);
      return error as TResponse;
    }
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve<TResponse>(response.data);
    } catch (error) {
      console.error(error);
      return error as TResponse;
    }
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve<TResponse>(response.data);
    } catch (error) {
      console.error(error);
      return error as TResponse;
    }
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path);
      if (response.status >= 400) {
        return Promise.reject(response);
      }
      return Promise.resolve<TResponse>(response.data);
    } catch (error) {
      console.error(error);
      return error as TResponse;
    }
  }
}
