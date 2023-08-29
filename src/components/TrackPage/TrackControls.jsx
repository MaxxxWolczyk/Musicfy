import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import PlaylistPopupButton from "../PlaylistPopupButton";

const TrackControls = ({ handlePlay, songId }) => {
  return (
    <div className="flex w-full items-center gap-10">
      <FaPlayCircle
        className="w-14 h-14 text_green-primary cursor-pointer hover:scale-110 transition-transform"
        onClick={() => handlePlay(songId)}
      />
      <FaRegHeart className="w-10 h-10 text_primary hover:text-white cursor-pointer transition-colors" />
      <PlaylistPopupButton width={10} heigth={10} />
    </div>
  );
};

export default TrackControls;
