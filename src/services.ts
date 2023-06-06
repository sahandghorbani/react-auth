import { injectable } from "inversify";
import { IGetState, ISetState, ISetDispatch } from "./interface";
import store from "./store/index";
import { loginUser } from "./store/Auth";

@injectable()
export class GetStateService implements IGetState {
  getState(slice: string, state: string): any {
    return store.getState()[slice][`${state}`];
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
}


