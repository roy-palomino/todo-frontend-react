export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password1: string;
  password2: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
