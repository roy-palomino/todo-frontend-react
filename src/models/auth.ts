import { UserSettings } from "./common";

export type AuthInput = {
  username: string;
  password: string;
};

export interface User {
  readonly id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  settings: UserSettings;
}
