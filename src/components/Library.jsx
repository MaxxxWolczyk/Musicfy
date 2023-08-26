import React from "react";
import { SiBookstack } from "react-icons/si";
import { useLocation } from "react-router-dom";

function Library() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-8">
      {location.pathname !== "/library" ? (
        <h2 className="flex text_primary items-center gap-4">
          <SiBookstack className="w-8 h-8" />
          <p className="text-xl font-semibold">Biblioteka</p>
        </h2>
      ) : (
        <h2 className="text-3xl text-white font-bold">Biblioteka</h2>
      )}
      <div className="flex gap-2">
        <button className="btn_primary">Albumy</button>
        <button className="btn_primary">Playlisty</button>
      </div>
    </div>
  );
}

export default Library;
