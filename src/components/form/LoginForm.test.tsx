import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter } from "react-router-dom";

describe("LoginForm", () => {
    it.skip("should display an error message if the username has less than 4 characters", () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <LoginForm onSubmit={() => {}} loading={false} />
            </Provider>
          </MemoryRouter>
        );
        const usernameInput = screen.getByPlaceholderText("Username");
        const submitButton = screen.getByRole("button", { name: "Log In" });
      
        fireEvent.change(usernameInput, { target: { value: "abc" } });
        fireEvent.click(submitButton);
      
        const errorMessage = screen.getByText(
          "Username must be at least 4 characters long"
        );
        expect(errorMessage).toBeInTheDocument();
      });
      

  it.skip("should display an error message if the password does not include both letters and numbers", () => {
    render(
        <MemoryRouter>
          <Provider store={store}>
            <LoginForm onSubmit={() => {}} loading={false} />
          </Provider>
        </MemoryRouter>
      );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(
      "Password must include both letters and numbers"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
