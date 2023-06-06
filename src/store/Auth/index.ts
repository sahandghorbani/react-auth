import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  loading: boolean;
  user: string | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload.username;
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const users = await fetchUsers();

      const user = findUserByUsername(users, username);

      if (user) {
        if (validatePassword(user, password)) {
          dispatch(loginSuccess(user));
          return true;
        } else {
          dispatch(loginFailure("username exist but incorrect password"));
          return false;
        }
      } else {
        const newUser = {
          username,
          password,
          token: Math.random().toString(36).substring(7),
        };

        const response = await addUser(newUser);
        dispatch(loginSuccess(response.data));
        return true;
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return false;
    }
  };
};

const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3001/users");
  return response.data;
};

const findUserByUsername = (users: any[], username: string) => {
  return users.find((user: any) => user.username === username);
};

const validatePassword = (user: any, password: string) => {
  return user.password === password;
};

const addUser = async (user: any) => {
  const response = await axios.post("http://localhost:3001/users", user);
  
  return response.data;
};

export default authSlice.reducer;
