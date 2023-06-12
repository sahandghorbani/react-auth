import { ReactNode } from "react";
export interface AppProviderProps {
  children: ReactNode;
}

export interface AuthState {
  loading: boolean;
  user: string | null;
  token: string | null;
  message: string | null;
  users: UserData[];
}

export interface UserData {
  username: string;
  password: string;
  token: string;
  id?: number;
}
export interface UserListProps {
  users: any;
}
export interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  loading: boolean;
  message:string | null;
}

export type UserType = {
  user: AuthState["user"];
};

export interface RootState {
  AuthSlice: AuthState;
}

export interface AuthPayload {
  user: UserData;
  type: string;
}
