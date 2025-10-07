import React from "react";
import { render } from "@testing-library/react";
import MainPage from "../MainPage";

describe("MainPage", () => {
  it("renders correctly", () => {
    const { container } = render(<MainPage />);
    expect(container).toMatchSnapshot();
  });
});
