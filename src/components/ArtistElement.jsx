import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistElement = ({ avatarUrl, name, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center gap-2 text_primary flex-shrink-0 hover:text-white transition-all max-w-[160px] "
      onClick={() => {
        navigate(`/artists/${id}`);
        document
          .getElementById("routeContainer")
          .scroll({ top, behavior: "smooth" });
      }}
    >
      {avatarUrl === undefined ? (
        <div className="h-28 w-28 sm:w-40 sm:h-40 rounded-full bg-black cursor-pointer flex items-center justify-center">
          <p className="text-2xl font-bold">{name.slice(0, 1)}</p>
        </div>
      ) : (
        <img
          src={avatarUrl}
          alt="avatar"
          className="h-28 w-28 sm:w-40 sm:h-40 rounded-full object-contain cursor-pointer"
        />
      )}

      <p className="text-sm  sm:text-base font-bold truncate max-w-[160px] cursor-pointer">
        {name}
      </p>
    </div>
  );
};

export default ArtistElement;
