"use client";

import { FC } from "react";
import { Flex } from "antd";
import { Albums, Photos } from "../../models";
import Album from "../Album/Album";

type Props = {
  albums: Albums;
  albumsWithPhotos: {
    albumId: number;
    photos: Photos;
  }[];
};

const AlbumsList: FC<Props> = ({ albums, albumsWithPhotos }) => {
  return (
    <Flex wrap="wrap" gap="middle" justify="center">
      {albums.map((album) => {
        const albumPhotos =
          albumsWithPhotos.find((a) => a.albumId === album.id)?.photos || [];
        return <Album albumId={album.id} key={album.id} photos={albumPhotos} />;
      })}
    </Flex>
  );
};

export default AlbumsList;
