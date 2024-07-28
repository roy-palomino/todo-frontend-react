import axios from "axios";

import { LoginData, RegisterData, LoginResponse } from "../models";
import { API_BASE_URL, LOGIN, REGISTER, REFRESH } from "../shared/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    const result = await axiosInstance.post<LoginResponse>(LOGIN, data);
    return result.data;
  } catch (e) {
    throw new Error(`Error when login the user: ${e}`);
  }
}

export async function register(data: RegisterData) {
  try {
    await axiosInstance.post(`${REGISTER}`, data);
  } catch (e) {
    throw new Error(`Error on user registration: ${e}`);
  }
}

export async function refresh(): Promise<LoginResponse> {
  try {
    const result = await axiosInstance.post<LoginResponse>(REFRESH);
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
