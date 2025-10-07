import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UsersPage } from "../UsersPage";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

describe("UsersPage", () => {
  test("вызывает setSearchParam при вводе имени пользователя", () => {
    const setSearchParamMock = jest.fn();
    const useSearchParamsMock = require("react-router-dom").useSearchParams;
    useSearchParamsMock.mockReturnValue([new URLSearchParams(), setSearchParamMock]);

    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/введите имя/i);
    fireEvent.change(input, { target: { value: "Ivan" } });

    expect(setSearchParamMock).toHaveBeenCalledWith({ searchName: "ivan" });
  });
});
