import axios from "axios";

import { LoginData, RegisterData, LoginResponse } from "../models";
import useAuth from "../stores/useAuth";
import { getAccessCredential } from "./service-utils";
import {
  API_BASE_URL,
  LOGIN,
  REGISTER,
  REFRESH,
  LOGOUT,
  SELF,
} from "../shared/constants";
import { User } from "../models";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    const result = await axiosInstance.post<LoginResponse>(LOGIN, data);
    useAuth.setState({ access: result.data.access });
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

export async function getSelf(): Promise<User> {
  const access = getAccessCredential();
  try {
    const result = await axiosInstance.get(SELF, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
