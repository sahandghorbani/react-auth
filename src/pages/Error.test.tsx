import { render , screen } from "@testing-library/react";
import Error from "./Error";

test("renders error message", () => {
   render(<Error />);

  const errorMessage = screen.getByText(/An error occurred/i);
  expect(errorMessage).toBeInTheDocument();
});
