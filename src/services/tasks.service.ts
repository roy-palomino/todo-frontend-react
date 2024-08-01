import axios from "axios";

import { Task, CreateTaskPayload } from "../models";

import { API_BASE_URL, LIST_TASKS } from "../shared/constants";
import axiosInstance from "./axiosInstance";

const getAccessCredential = () => {
  return localStorage.getItem("access");
};

export const listTasks = async (
  refreshed: boolean = false,
): Promise<Task[]> => {
  const access = getAccessCredential();
  try {
    const result = await axiosInstance.get<Task[]>(LIST_TASKS, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    if (!result && !refreshed) {
      await listTasks(true);
    } else {
      return result.data;
    }
    throw new Error(`Session has expired`);
  } catch (error: unknown) {
    throw new Error(`Error listing tasks: ${error}`);
  }
};

export const fetchTask = async (taskId: number): Promise<Task> => {
  const access = getAccessCredential();
  try {
    const result = await axiosInstance.get<Task>(`${LIST_TASKS}${taskId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createTask = async (
  task: CreateTaskPayload,
): Promise<Task | void> => {
  const access = getAccessCredential();
  try {
    const result = await axios.post<Task>(
      `${API_BASE_URL}${LIST_TASKS}`,
      task,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateCompletedStatus = async (
  taskId: number,
  done: boolean,
): Promise<Task> => {
  const access = getAccessCredential();
  try {
    const updatedTask = await axios.patch<Task>(
      `${API_BASE_URL}${LIST_TASKS}${taskId}/`,
      {
        done,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );
    return updatedTask.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateTask = async (task: Partial<Task>) => {
  const access = getAccessCredential();
  try {
    const updatedTask = axiosInstance.patch<Task>(
      `${API_BASE_URL}${LIST_TASKS}${task.id}/`,
      task,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );
    return updatedTask;
  } catch (e: any) {
    throw new Error(e);
  }
};
