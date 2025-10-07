import AlbumsList from "../../components/AlbumsList/AlbumsList";
import Api from "@/api/api";
import type { Albums } from "../../models";

const AlbumsPage = async () => {
  let albums: Albums = [];

  try {
    albums = await Api.getAlbums();
  } catch (error) {
    console.error("Failed to load albums:", error);
  }

  return (
    <div className="page-wrapper">
      <h1>Albums</h1>
      <AlbumsList albums={albums} albumsWithPhotos={[]} />
    </div>
  );
};

export default AlbumsPage;
