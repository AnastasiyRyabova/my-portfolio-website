import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data/playlists";
import "./PlaylistDetailPage.css";

export function PlaylistDetailPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const id = Number(playlistId);
  const playlist = PLAYLISTS.find((p) => p.id === id);

  if (!playlist || !playlist.songs || playlist.songs.length === 0) {
    return (
      <div>
        <h2>Плейлист не найден или пустой</h2>
      </div>
    );
  }

  return (
    <div className="playlistInfo">
      <h2 className="playlistInfo__title">PlaylistinfoPage</h2>
      <p className="playlistInfo__genre">
        <strong className="playlistInfo__label">Жанр: </strong>{" "}
        <Link to={`/playlists?genre=${encodeURIComponent(playlist.genre)}`}>
          {playlist.genre}
        </Link>
      </p>
      <h3 className="playlistInfo__name">
        <strong className="playlistInfo__label">Название: </strong>
        {playlist.name}
      </h3>

      <ul className="playlistInfoList">
        {playlist.songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
}
