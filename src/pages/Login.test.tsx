import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LoginPage from "./Login";
import { dependencies, container } from "../inversify.config";
import { ISetDispatch, IGetState } from "../interface";
import store from "../store";

// Mock dependencies and behavior
const mockSetDispatch: ISetDispatch = {
  setDispatch: jest.fn(),
  setToken: jest.fn(),
  setUsers: jest.fn(),
  logout: jest.fn(),
};

const mockGetState: IGetState = {
  getState: jest.fn(),
};

// Mock the inversify container
container.rebind<ISetDispatch>(dependencies.ISetDispatch).toConstantValue(mockSetDispatch);
container.rebind<IGetState>(dependencies.IGetState).toConstantValue(mockGetState);

describe("LoginPage", () => {
  it("should call setDispatch with username and password on form submit", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // Simulate form submission
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Check if setDispatch was called with the correct arguments
    expect(mockSetDispatch.setDispatch).toHaveBeenCalledWith("testuser", "testpassword");
  });
});
