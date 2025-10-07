"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Photos } from "../../models";
import "./index.css";

type Props = {
  photos: Photos;
  albumId: number;
};

const placeholderSrc = "/images/placeholder.png";

const Album: FC<Props> = ({ photos }) => {
  const Photo: FC<{ photo: typeof photos[0] }> = ({ photo }) => {
    const [imgSrc, setImgSrc] = useState(photo.url);

    return (
      <div
        className="photo-container"
        key={photo.id}
        style={{ position: "relative", width: "300px", height: "200px" }}
      >
        <Image
          src={imgSrc}
          alt={photo.title}
          fill
          style={{ objectFit: "cover" }}
          className="photo-img"
          priority={false}
          onError={() => setImgSrc(placeholderSrc)}
        />
      </div>
    );
  };

  return (
    <div className="album-container">
      {photos.length === 0 && <p>No photos available</p>}
      {photos.map((photo) => (
        <Photo photo={photo} key={photo.id} />
      ))}
    </div>
  );
};

export default Album;
