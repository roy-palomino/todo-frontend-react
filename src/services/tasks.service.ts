import axios from "axios";

import { Task, CreateTaskPayload } from "../models";

import { API_BASE_URL, LIST_TASKS } from "../shared/constants";

export const listTasks = async (): Promise<Task[]> => {
  const access = localStorage.getItem("access");
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
  const access = localStorage.getItem("access");
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
