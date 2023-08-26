import React from "react";

const ArtistElementSkeleton = () => {
  return (
    <div className="blur-lg flex flex-col items-center gap-2 text_primary flex-shrink-0 hover:text-white transition-all max-w-[160px]">
      <div className="w-40 h-40 rounded-full bg_primary" />

      <p className="text-base font-bold truncate max-w-[160px]">Name</p>
    </div>
  );
};

export default ArtistElementSkeleton;
