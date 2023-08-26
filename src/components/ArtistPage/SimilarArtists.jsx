import React from "react";
import ArtistElement from "../ArtistElement";

const SimilarArtists = ({ artists }) => {
  return (
    <div className="flex gap-8 overflow-x-scroll pb-4">
      {artists.map((artist) => (
        <ArtistElement
          key={artist.id}
          avatarUrl={artist.attributes.artwork?.url}
          name={artist.attributes.name}
          id={artist.id}
        />
      ))}
    </div>
  );
};

export default SimilarArtists;
