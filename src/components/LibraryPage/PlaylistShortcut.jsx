import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const PlaylistShortcut = ({ tracks, title, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 items-center hover:bg-black/30 p-3 rounded-md cursor-pointer"
      onClick={() => navigate(`/playlist/${id}`)}
    >
      <div className="flex flex-wrap justify-center items-center w-14 h-14 bg_primary rounded-md overflow-hidden">
        {tracks.length < 4 ? (
          <img src={tracks[0].image} />
        ) : (
          <>
            <img src={tracks[0].image} className="w-7 h-7" />
            <img src={tracks[1].image} className="w-7 h-7" />
            <img src={tracks[2].image} className="w-7 h-7" />
            <img src={tracks[3].image} className="w-7 h-7" />
          </>
        )}
      </div>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-xs text-white">
          {tracks.length === 1 ? "1 utwór" : `${tracks.length} utworów`}
        </p>
      </div>
    </div>
  );
};

export default PlaylistShortcut;
