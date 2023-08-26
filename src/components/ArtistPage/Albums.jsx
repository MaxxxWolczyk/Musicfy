import React from "react";

const Albums = ({ albums }) => {
  console.log(albums);
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:overflow-y-scroll pb-4">
      {albums.map((album) => (
        <div className="flex flex-row sm:flex-col gap-4 bg-black/30 rounded-lg p-4 flex-shrink-0 sm:h-[240px]">
          <img
            src={album.attributes.artwork.url}
            alt=""
            className="w-14 h-14 sm:w-36 sm:h-36 object-contain rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <p className="text_primary truncate w-[150px] sm:w-36 font-bold">
              {album.attributes.name}
            </p>
            <p className="text_primary text-xs">
              {album.attributes.releaseDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
