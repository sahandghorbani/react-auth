import { render } from "@testing-library/react";
import { dependencies, container } from "../inversify.config";
import { ISetDispatch } from "../interface";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "../store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the setUsers method from the dispatcher", () => {
    // Mock the dependencies and behaviors
    const mockSetDispatch: ISetDispatch = {
      setDispatch: jest.fn(),
      setToken: jest.fn(),
      logout: jest.fn(),
      setUsers: jest.fn(),
    };

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    container
      .rebind<ISetDispatch>(dependencies.ISetDispatch)
      .toConstantValue(mockSetDispatch);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );

    expect(mockSetDispatch.setUsers).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("check the local Storage if the token is setstay on home page", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    // Mock localStorage getItem and setItem methods
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue("token"),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("check the local Storage if the token is not set navigate to login page", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    // Mock localStorage getItem and setItem methods
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalled();
  });
});
