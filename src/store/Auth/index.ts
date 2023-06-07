import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { AuthState, UserData } from "../../types/ITypes";

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  users:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAllUsers(state ,action: PayloadAction<any>) {
      state.users =action.payload ;
      // console.log(state.users);
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserData>) {
      state.loading = false;
      state.user = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      // console.log(state.user);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure,setAllUsers } = authSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
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
        const newUser: UserData = {
          username,
          password,
          token: Math.random().toString(36).substring(7),
        };

        // const response = await addUser(newUser);
        const response = await axios.post(
          "http://localhost:3001/users",
          newUser
        );

        dispatch(loginSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return false;
    }
  };
};

// by refreshing the mainlayout, this function will be called again
export const fethUserByToken = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let user = await fetchUser(token);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      console.error("Error fetching data:", error);
    }
  };
};

export const fetchAllUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const users = await fetchUsers();
      dispatch(setAllUsers(users));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      console.error("Error fetching data:", error);
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

// const addUser = async (user: UserData) => {
//   const response = await axios.post("http://localhost:3001/users", user);
//   return response.data;
// };

export default authSlice.reducer;
