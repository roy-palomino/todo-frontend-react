import axios, { AxiosError, AxiosResponse } from "axios";

import { API_BASE_URL } from "../shared/constants";
import { refresh } from "./auth.service";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const result = await refresh();
        localStorage.setItem("access", result.access);
        return null;
      } catch (error) {
        //logout
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
