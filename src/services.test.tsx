import { GetStateService, SetStateService, SetDispatchService } from "./services";
import store from "./store";
import {  logoutUser } from "./store/Auth/index";
import "reflect-metadata";

describe("GetStateService", () => {
  let getStateService: GetStateService;

  beforeEach(() => {
    getStateService = new GetStateService();
  });

  it("should get state from the store", () => {
    const authState = { loading: true, user: null, token: null, message: null, users: [] };
    store.getState = jest.fn().mockReturnValue({ AuthSlice: authState });

    const state = getStateService.getState("AuthSlice", "loading");

    expect(state).toBe(true);
    expect(store.getState).toHaveBeenCalled();
  });
});

describe("SetStateService", () => {
  let setStateService: SetStateService;

  beforeEach(() => {
    setStateService = new SetStateService();
  });

  it("should dispatch an action to set state in the store", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const state = { loading: true, user: "testUser", token: null, message: null, users: [] };
    setStateService.setState(state);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "mySlice/setState", payload: state });
  });
});

describe.only("SetDispatchService", () => {
  let setDispatchService: SetDispatchService;

  beforeEach(() => {
    setDispatchService = new SetDispatchService();
  });

  it("should dispatch an action to login a user", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const username = "testUser";
    const password = "testPassword";
    setDispatchService.setDispatch(username, password);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should dispatch an action to fetch user by token", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const token = "testToken";
    setDispatchService.setToken(token);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should dispatch an action to fetch all users", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    setDispatchService.setUsers();

    expect(mockDispatch).toHaveBeenCalled()
  });

  it("should dispatch an action to logout a user", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    setDispatchService.logout();

    expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
  });
});
