import axios from "axios";

import { API_BASE_URL, LIST_CATEGORIES } from "../shared/constants";
import { Category } from "../models";

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
