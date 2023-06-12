// authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload, AuthState, UserData } from "../../types/ITypes";

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
    setAllUsers(state, action: PayloadAction<UserData[]>) {
      state.users = action.payload;
    },
    AuthStart(state) {
      state.loading = true;
      state.message = null;
    },
    AuthSuccess(state, action: PayloadAction<AuthPayload>) {
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
    // logoutUser(state) {
    //   state.loading = false;
    //   state.user = null;
    //   state.token = null;
    //   state.message = "logged out";
    //   localStorage.removeItem("token");
    // },
  },
});

export const { AuthStart, AuthSuccess, AuthFailure, setAllUsers } =
  authSlice.actions;

export default authSlice.reducer;








