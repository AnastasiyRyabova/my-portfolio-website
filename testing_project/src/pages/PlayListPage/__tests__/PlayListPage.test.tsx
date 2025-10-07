import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PlayListPage } from "../PlayListPage";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

describe("PlayListPage", () => {
  const useSearchParamsMock = require("react-router-dom").useSearchParams;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("вызывает setSearchParams при вводе названия", () => {
    const setSearchParamsMock = jest.fn();
    const params = new URLSearchParams();
    useSearchParamsMock.mockReturnValue([params, setSearchParamsMock]);

    render(
      <MemoryRouter>
        <PlayListPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Поиск по названию");
    fireEvent.change(input, { target: { value: "Rock" } });


    expect(setSearchParamsMock).toHaveBeenCalled();

    const updatedParams = setSearchParamsMock.mock.calls[0][0];
    expect(updatedParams.get("name")).toBe("Rock");
  });

  test("вызывает setSearchParams при выборе жанра", () => {
    const setSearchParamsMock = jest.fn();
    const params = new URLSearchParams();
    useSearchParamsMock.mockReturnValue([params, setSearchParamsMock]);

    render(
      <MemoryRouter>
        <PlayListPage />
      </MemoryRouter>
    );

    const select = screen.getByLabelText("Жанр:");
    fireEvent.change(select, { target: { value: "Pop" } });

    expect(setSearchParamsMock).toHaveBeenCalled();

    const updatedParams = setSearchParamsMock.mock.calls[0][0];
    expect(updatedParams.get("genre")).toBe("Pop");
  });
});
