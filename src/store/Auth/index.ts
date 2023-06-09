import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { AuthState, UserData } from "../../types/ITypes";

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  message: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAllUsers(state, action: PayloadAction<any>) {
      state.users = action.payload;
    },
    AuthStart(state) {
      state.loading = true;
      state.message = null;
    },
    AuthSuccess(state, action: PayloadAction<any>) {
      let { user, type } = action.payload;
      state.loading = false;
      state.user = user.username;
      state.token = user.token;
      state.message = type === "exist" ? "Login successful" : "registered";
      localStorage.setItem("token", user.token);
      // console.log(state.user);
    },
    AuthFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    logoutUser(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.message = "logged out";
      localStorage.removeItem("token");
    },
  },
});

export const { AuthStart, AuthSuccess, AuthFailure, setAllUsers, logoutUser } =
  authSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(AuthStart());

    try {
      const users = await fetchUsers();
      const user = findUserByUsername(users, username);
      if (user) {
        if (validatePassword(user, password)) {
          dispatch(AuthSuccess({ user, type: "exist" }));
          return true;
        } else {
          dispatch(AuthFailure("username exist but incorrect password"));
          return false;
        }
      } else {
        const newUser: UserData = {
          username,
          password,
          token: Math.random().toString(36).substring(7),
        };
        const response = await addUser(newUser);
        dispatch(AuthSuccess({ user: response, type: "new" }));
      }
    } catch (error: any) {
      dispatch(AuthFailure(error.message));
      return false;
    }
  };
};

// by refreshing the mainlayout, this function will be called again
export const fethUserByToken = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let user = await fetchUser(token);
      dispatch(AuthSuccess({ user, type: "exist" }));
    } catch (error: any) {
      dispatch(AuthFailure(error.message));
    }
  };
};

export const fetchAllUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const users = await fetchUsers();
      dispatch(setAllUsers(users));
    } catch (error: any) {
      dispatch(AuthFailure(error.message));
    }
  };
};

const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3001/users");
  return response.data;
};

const findUserByUsername = (users: UserData[], username: string) => {
  return users.find((user: UserData) => user.username === username);
};

const validatePassword = (user: UserData, password: string) => {
  return user.password === password;
};

const fetchUser = async (token: string) => {
  const response = await axios.get("http://localhost:3001/users");
  const users = response.data;
  const user = users.find((user: UserData) => user.token === token);
  return user;
};

const addUser = async (user: UserData) => {
  const response = await axios.post("http://localhost:3001/users", user);
  return response.data;
};

export default authSlice.reducer;
