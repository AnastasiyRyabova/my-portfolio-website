import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data/playlists";
import "./PlayListPage.css";

export function PlayListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterName = searchParams.get("name") || "";
  const filterGenre = searchParams.get("genre") || "";

  const genres = Array.from(new Set(PLAYLISTS.map((p) => p.genre))).sort();

  const filteredPlaylists = PLAYLISTS.filter(({ name, genre }) => {
    const matchesName = name.toLowerCase().includes(filterName.toLowerCase());
    const matchesGenre = filterGenre === "" || genre === filterGenre;
    return matchesName && matchesGenre;
  });

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value) {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  function onGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value) {
      searchParams.set("genre", value);
    } else {
      searchParams.delete("genre");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="playlistPage">
      <h2>Список плейлистов</h2>

      <div>
        <label>
          Название:
          <input
            type="text"
            value={filterName}
            onChange={onNameChange}
            placeholder="Поиск по названию"
          />
        </label>
      </div>

      <div>
        <label>
          Жанр:
          <select value={filterGenre} onChange={onGenreChange}>
            <option value="">Все жанры</option>
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="playlist">
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/playlists/${id}`}>{name}</Link>
            </li>
          ))
        ) : (
          <li>Плейлистов не найдено</li>
        )}
      </ul>
    </div>
  );
}
