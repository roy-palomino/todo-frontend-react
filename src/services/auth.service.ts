import axios from "axios";

import { LoginData, RegisterData, LoginResponse } from "../models";
import {
  API_BASE_URL,
  LOGIN,
  REGISTER,
  REFRESH,
  LOGOUT,
} from "../shared/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const getAccessCredential = () => {
  return localStorage.getItem("access");
};

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
    location.assign("/logout");
    throw new Error(e);
  }
}

export async function logout(): Promise<void> {
  let access = getAccessCredential();
  try {
    await axiosInstance.post<void>(LOGOUT, null, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
  } catch (e: any) {
    throw new Error(e);
  }
}
