export interface IAxiosResponse<T, U, V, W> {
  data: T;
  status: number;
  statusText: string;
  headers: U;
  config: V;
  request: W;
}
