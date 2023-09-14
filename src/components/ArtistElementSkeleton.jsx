import React from "react";

const ArtistElementSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 text_primary flex-shrink-0 hover:text-white transition-all max-w-[160px]">
      <div className="w-40 h-40 rounded-full bg_secondary" />

      <div className="bg_secondary rounded-2xl w-28 h-4"></div>
    </div>
  );
};

export default ArtistElementSkeleton;
