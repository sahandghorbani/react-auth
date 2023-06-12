// helpers.ts

import axios from "axios";
import { UserData } from "../../types/ITypes";
import { Dispatch } from "@reduxjs/toolkit";
import { AuthStart, AuthSuccess, AuthFailure } from "./authSlice";

export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3001/users");
  return response.data;
};

export const findUserByUsername = (users: UserData[], username: string) => {
  return users.find((user: UserData) => user.username === username);
};

export const validatePassword = (user: UserData, password: string) => {
  return user.password === password;
};

export const fetchUser = async (token: string) => {
  const { data } = await axios.get("http://localhost:3001/users");
  const user = data.find((user: UserData) => user.token === token);
  return user;
};

export const addUser = async (user: UserData) => {
  const response = await axios.post("http://localhost:3001/users", user);
  return response.data;
};

export const handleExistingUser = ( dispatch: Dispatch, user: UserData, password: string) => {
  if (validatePassword(user, password)) {
    dispatch(AuthSuccess({ user, type: "exist" }));
    return true;
  } else {
    dispatch(AuthFailure("Username exists but incorrect password"));
    return false;
  }
};

export const handleNewUser = async (dispatch: Dispatch,username: string,password: string) => {
  const newUser: UserData = {
    username,
    password,
    token: Math.random().toString(36).substring(7),
  };

  try {
    const response = await addUser(newUser);
    dispatch(AuthSuccess({ user: response, type: "new" }));
    return true;
  } catch (error: any) {
    dispatch(AuthFailure(error.message));
    return false;
  }
};
