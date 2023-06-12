import { loginUser } from './../store/Auth/actions';
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { AuthState } from "../types/ITypes";

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  message: null,
  users: [],
};

const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    logoutUser(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload["username"];
        localStorage.setItem("token", action.payload["id"]);
      }
    );
    builder.addMatcher( 
      usersApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
          const user = action.payload.username;
          if (user) {
            state.user = user;
          }
      }
    );
  },
});

export const {logoutUser} = extraSlice.actions;

export default extraSlice.reducer;
