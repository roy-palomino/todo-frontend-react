import axios from "axios";

import { API_BASE_URL, LIST_TAGS } from "../shared/constants";
import { Tag, CreateTagPayload } from "../models";

export async function listTags(): Promise<Tag[]> {
  try {
    const result = await axios.get<Tag[]>(`${API_BASE_URL}${LIST_TAGS}`);
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function createTag(tag: CreateTagPayload): Promise<Tag> {
  const access = localStorage.getItem("access");
  try {
    const result = await axios.post(`${API_BASE_URL}${LIST_TAGS}`, tag, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
