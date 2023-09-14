import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const LikedShortcut = ({ tracks, title }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 items-center hover:bg-black/30 p-3 rounded-md cursor-pointer"
      onClick={() => navigate("/collection/liked")}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-100 rounded-md flex justify-center items-center">
        <FaHeart className="text-white text-2xl shadow-xl" />
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

export default LikedShortcut;
