import { injectable } from "inversify";
import { IGetState, ISetState, ISetDispatch } from "./interface";
import store from "./store/index";
import { AuthState } from "./types/ITypes";
import { fetchAllUsers, fethUserByToken, loginUser } from "./store/Auth";
import { logoutUser } from "./store/Auth/authSlice";

type RootState = {
  AuthSlice: AuthState;
  // ...other slices
};
@injectable()
export class GetStateService implements IGetState {
  getState(slice: keyof RootState, state: keyof AuthState): any {
    return store.getState()[slice][state] as any;
  }
}


@injectable()
export class SetStateService implements ISetState {
  setState(state: any): void {
    store.dispatch({ type: "mySlice/setState", payload: state });
  }
}

@injectable()
export class SetDispatchService implements ISetDispatch {
  setDispatch(username:string , password:string): void {
    store.dispatch(loginUser(username , password));
  }
  setToken(token:string) {
    store.dispatch(fethUserByToken(token));
  }
  setUsers() {
    store.dispatch(fetchAllUsers());
  }
  logout() {
    store.dispatch(logoutUser())
  }
}


