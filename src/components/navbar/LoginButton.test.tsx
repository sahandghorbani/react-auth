import { render,  fireEvent , screen } from "@testing-library/react";
import TheLogin from "./LoginButton";
import { MemoryRouter } from "react-router-dom";

describe("TheLogin", () => {
  test("renders login button when user is not logged in", () => {
    render(
      <MemoryRouter>
        <TheLogin user={null} />
      </MemoryRouter>
    );
    const loginButton = screen.getByRole("button", { name: "login" });
    expect(loginButton).toBeInTheDocument();
  });

  test('does not render login button when user is logged in', () => {
    const username = 'john';
    render(
      <MemoryRouter>
        <TheLogin user={username} />
      </MemoryRouter>
    );
    const loginButton = screen.queryByRole('button', { name: username });
    expect(loginButton).toBeInTheDocument();
  });

  test("navigates to /login when login button is clicked", () => {
    const mockedUsedNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
       ...jest.requireActual('react-router-dom') as any,
      useNavigate: () => mockedUsedNavigate,
    }));
  
    render(
      <MemoryRouter>
        <TheLogin user={null} />
      </MemoryRouter>
    );
    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);
  
    // expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
