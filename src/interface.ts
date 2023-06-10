import { AuthState } from "./types/ITypes";
type RootState = {
  AuthSlice: AuthState;
  // ...other slices
};
export interface IGetState {
  getState(
    slice: keyof RootState,
    state: keyof AuthState
  ): any;
}
export interface ISetState {
  setState: (state: any) => void;
}

export interface ISetDispatch {
  setDispatch: (username: string, password: string) => void;
  setToken: (token: string) => void;
  setUsers: () => void;
  logout:()=>void
}

// export interface IFetchToken {
//   setDispatch: (token: string) => void;
// }
