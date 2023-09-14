import React from "react";
import { useSelector } from "react-redux";

const PlaylistShortcut = ({ func, playlist }) => {
  return (
    <div
      className="flex gap-4 items-center w-full bg_secondary hover:bg-white/30 p-2 rounded-md cursor-pointer"
      onClick={() => func(playlist.id)}
    >
      <div className="flex flex-wrap justify-center items-center w-14 h-14 bg_primary rounded-md overflow-hidden">
        {playlist.tracks.length < 4 ? (
          <img src={playlist.tracks[0].image} />
        ) : (
          <>
            <img src={playlist.tracks[0].image} className="w-7 h-7" />
            <img src={playlist.tracks[1].image} className="w-7 h-7" />
            <img src={playlist.tracks[2].image} className="w-7 h-7" />
            <img src={playlist.tracks[3].image} className="w-7 h-7" />
          </>
        )}
      </div>
      <p className="text-white font-semibold">{playlist.name}</p>
    </div>
  );
};

export default PlaylistShortcut;
