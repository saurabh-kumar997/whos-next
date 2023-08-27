import Axios, { AxiosHeaders, AxiosInstance } from "axios";

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

  protected createHeaders = () => {
    const headers = new AxiosHeaders();
    const token: string | null = localStorage.getItem("token");
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    token && (headers["x-token"] = token);
    return headers;
  };

  protected createAxiosClient(): AxiosInstance {
    return Axios.create({
      baseURL: "http://localhost:8000/api",
      responseType: "json",
      headers: this.createHeaders(),
      timeout: 10 * 1000,
    });
  }

  constructor() {
    this.client = this.createAxiosClient();
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {} as TResponse;
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {} as TResponse;
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {} as TResponse;
  }
}
