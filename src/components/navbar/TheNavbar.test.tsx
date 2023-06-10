import { render } from "@testing-library/react";
import TheNavbar from "./TheNavbar";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter } from "react-router-dom";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock dispatcher
const dispatcherMock = {
  setToken: jest.fn(),
};
jest.mock("../../inversify.config", () => ({
  container: {
    get: () => dispatcherMock,
  },
  dependencies: {},
}));

test("calls setToken with token from localStorage", () => {
  const token = "your-token";
  localStorageMock.getItem.mockReturnValue(token);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TheNavbar />
      </MemoryRouter>
    </Provider>
  );
  expect(dispatcherMock.setToken).toHaveBeenCalledWith(token);
});
