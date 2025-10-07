import AlbumsList from "../../components/AlbumsList/AlbumsList";
import Api from "@/api/api";
import type { Albums, Photos } from "../../models";

type AlbumsWithPhotos = {
  albumId: number;
  photos: Photos;
}[];

const AlbumsPage = async () => {
  let albums: Albums = [];
  let albumsWithPhotos: AlbumsWithPhotos = [];

  try {
    albums = await Api.getAlbums();

  const photosPromises = albums.map((album) =>
  Api.getPhotos(album.id)
);

    const allPhotos = await Promise.all(photosPromises);

    albumsWithPhotos = albums.map((album, index) => ({
      albumId: album.id,
      photos: allPhotos[index],
    }));
  } catch (error) {
    console.error("Failed to load albums or photos:", error);
  }

  return (
    <div className="page-wrapper">
      <h1>Albums</h1>
      <AlbumsList albums={albums} albumsWithPhotos={albumsWithPhotos} />
    </div>
  );
};

export default AlbumsPage;
