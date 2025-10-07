
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PlaylistDetailPage } from "../PlaylistDetailPage";
import { PLAYLISTS } from "../../../data/playlists";
import "@testing-library/jest-dom";


describe("PlaylistDetailPage", () => {
  it("отображает данные плейлиста, если он доступен", () => {

    const testPlaylist = PLAYLISTS[0];

    render(
      <MemoryRouter initialEntries={[`/playlists/${testPlaylist.id}`]}>
        <Routes>
          <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
        </Routes>
      </MemoryRouter>
    );


    const genreLink = screen.getByRole("link", { name: testPlaylist.genre });
    expect(genreLink).toBeInTheDocument();
    expect(genreLink).toHaveAttribute(
      "href",
      `/playlists?genre=${encodeURIComponent(testPlaylist.genre)}`
    );


    expect(
      screen.getByRole("heading", { level: 3, name: new RegExp(testPlaylist.name, "i") })
    ).toBeInTheDocument();


    const songItems = screen.getAllByRole("listitem");
    expect(songItems.length).toBe(testPlaylist.songs.length);
  });
});
