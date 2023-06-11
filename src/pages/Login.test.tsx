import {  render } from "@testing-library/react";
import LoginPage from "./Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

const setupTest = () => {
  const {getByRole , container ,queryByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </MemoryRouter>
  );
  return {getByRole, container ,queryByTestId }
};


describe("LoginPage", () => {
  it("should not render Snackbar at first", () => {
    const {queryByTestId} = setupTest();
    const snackbarElement = queryByTestId("the-snackbar");
    expect(snackbarElement).not.toBeInTheDocument();
  });
  it('renders snapshot LoginPage', () => {
    const {container}  = setupTest()

    expect(container.firstChild).toMatchSnapshot()
  })
});
