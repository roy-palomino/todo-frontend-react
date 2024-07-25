import axios from "axios";

import { API_BASE_URL, LIST_CATEGORIES } from "../shared/constants";
import { Category, CreateCategoryPayload } from "../models";

export async function listCategories(): Promise<Category[]> {
  try {
    const result = await axios.get<Category[]>(
      `${API_BASE_URL}${LIST_CATEGORIES}`,
    );
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function createCategory(tag: CreateCategoryPayload): Promise<Category> {
  const access = localStorage.getItem("access");
  try {
    const result = await axios.post(`${API_BASE_URL}${LIST_CATEGORIES}`, tag, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
