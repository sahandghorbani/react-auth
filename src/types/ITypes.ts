import { ReactNode } from "react";
export interface AppProviderProps {
  children: ReactNode;
}

export interface AuthState {
    loading: boolean;
    user: string | null;
    token: string | null;
    error: string | null;
    users:UserData[]
  }

  export interface UserData {
    username: string;
    password: string;
    token: string;
    id?: number;
  }

  export interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
    loading: boolean;
    error: string | null;
  }