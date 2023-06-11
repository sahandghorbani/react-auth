import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter } from "react-router-dom";

describe("LoginForm", () => {
  it("should render the form correctly", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginForm  onSubmit={jest.fn()} loading={false} />
        </Provider>
      </MemoryRouter>
    );

    // Assert that the form elements are rendered
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
  });

  it("should call the onSubmit function with username and password on form submit", async () => {
    const onSubmit = jest.fn();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginForm  onSubmit={onSubmit} loading={false} />
        </Provider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.submit(screen.getByRole("button", { name: "Log In" }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
