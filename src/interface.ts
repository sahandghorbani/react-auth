export interface IGetState {
  getState: (slice: string, state: string) => any;
}

export interface ISetState {
  setState: (state: any) => void;
}

export interface ISetDispatch {
  setDispatch: (username: string, password: string) => void;
}
