import axios from "axios";

import { API_BASE_URL, LIST_TAGS } from "../shared/constants";
import { Tag } from "../models";

export async function listTags(): Promise<Tag[]> {
  try {
    const result = await axios.get<Tag[]>(`${API_BASE_URL}${LIST_TAGS}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
