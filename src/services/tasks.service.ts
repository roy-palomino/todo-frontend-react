import axios from "axios";

import { Task, CreateTaskPayload } from "../models";

import { API_BASE_URL, LIST_TASKS } from "../shared/constants";

const getAccessCredential = () => {
  return localStorage.getItem("access");
};

export const listTasks = async (): Promise<Task[]> => {
  const access = getAccessCredential();
  try {
    const result = await axios.get<Task[]>(`${API_BASE_URL}${LIST_TASKS}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    console.log(result);
    return result.data;
  } catch (e) {
    throw new Error(`Error listing tasks: ${e}`);
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
