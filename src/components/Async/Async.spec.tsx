import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();

  // await waitForElementToBeRemoved(screen.queryByText("Button"));
  await waitFor(() => {
    return expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
