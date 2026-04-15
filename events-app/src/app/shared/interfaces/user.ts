export interface User {
  _id: string;
  email: string;
  username: string;
  events: string[];
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
