// actions.ts

import { Dispatch } from "redux";
import { AuthStart, AuthSuccess, AuthFailure, setAllUsers } from "./authSlice";
import { fetchUsers, findUserByUsername, fetchUser , handleExistingUser  ,handleNewUser } from "./helpers";

export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(AuthStart());
    try {
      const users = await fetchUsers();
      const user = findUserByUsername(users, username);

      if (user) {
         handleExistingUser(dispatch, user, password);
      } else {
         handleNewUser(dispatch, username, password);
      }
    } catch (error: any) {
      dispatch(AuthFailure(error.message));
      return false;
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
