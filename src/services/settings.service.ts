import { getAccessCredential } from "./service-utils";
import axiosInstance from "./axiosInstance";
import { SETTINGS } from "../shared/constants";
import { UserSettings } from "../models";

export async function updateSettings(
  settings: UserSettings,
): Promise<UserSettings> {
  const { id, ...data } = settings;
  try {
    const result = await axiosInstance.patch(
      `${SETTINGS}${id}/`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessCredential()}`,
        },
      },
    );
    return result.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
