import axios from "axios";

export async function getData<R>(path: string): Promise<R> {
  return axios.get(`${path}`);
}

export async function postData<D, R>(path: string, data: D): Promise<R> {
  return axios.post(`${path}`, data);
}
