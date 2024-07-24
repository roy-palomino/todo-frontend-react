import axios from "axios";

import { LoginData, RegisterData, LoginResponse } from "../models";
import { API_BASE_URL, LOGIN, REGISTER } from "../shared/constants";

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    const result = await axios.post<LoginResponse>(
      `${API_BASE_URL}${LOGIN}`,
      data,
    );
    return result.data;
  } catch (e) {
    throw new Error(`Error when login the user: ${e}`);
  }
}

export async function register(data: RegisterData) {
  try {
    await axios.post(`${API_BASE_URL}${REGISTER}`, data);
  } catch (e) {
    throw new Error(`Error on user registration: ${e}`);
  }
}
