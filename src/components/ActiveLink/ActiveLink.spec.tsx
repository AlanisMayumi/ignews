import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

test("active link renders correctlly", () => {
  const { getByText } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  );

  expect(getByText("Home")).toBeInTheDocument();
});
