import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

it("submits", () => {
  const onSubmit = jest.fn();
  render(<App onSubmit={onSubmit} />);
  fireEvent.submit(screen.getByTestId("form"));
  expect(onSubmit).toHaveBeenCalled();
});
