import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserInfoPage } from "../UserInfoPage";
import { USERS } from "../../../data/users";

describe("UserInfoPage", () => {
  test("показывает сообщение если пользователя с таким userId нет", () => {
    const nonExistentUserId = "9999";

    render(
      <MemoryRouter initialEntries={[`/users/${nonExistentUserId}`]}>
        <Routes>
          <Route path="/users/:userId" element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    const message = screen.getByText(/пользователя таким userId нет/i);
    expect(message).toBeInTheDocument();
  });

  test("отображает email, имя и ссылку на плейлист если пользователь существует", () => {
    const userId = Object.keys(USERS)[0];
    const user = USERS[Number(userId)];

    render(
      <MemoryRouter initialEntries={[`/users/${userId}`]}>
        <Routes>
          <Route path="/users/:userId" element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    if (user.email) {
      expect(screen.getByText(user.email)).toBeInTheDocument();
    }

    if (user.fullName) {
      expect(screen.getByText(user.fullName)).toBeInTheDocument();
    }

    if (user.playlist) {
      const playlistLink = screen.getByRole("link", { name: user.playlist.name });
      expect(playlistLink).toBeInTheDocument();
      expect(playlistLink).toHaveAttribute("href", `/playlists/${user.playlist.id}`);
    }
  });
});
