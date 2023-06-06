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
      console.log(state.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const loginUser = (username: string, password: string) => {
  console.log(username , password);
  return async (dispatch: any) => {
    dispatch(loginStart());
    const token = Math.random().toString(36).substring(7);

    try {
      const response = await axios.post("http://localhost:3001/users", {
        username,
        password,
        token,
      });
      
      dispatch(loginSuccess(response.data));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };
};

export default authSlice.reducer;
