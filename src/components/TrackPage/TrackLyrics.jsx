import React from "react";

const TrackLyrics = ({ lyrics }) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold text-white mb-4">Teskt</p>
      {lyrics.map((line, i) => (
        <p key={`${line}-${i}`} className="text-white">
          {line === "" ? <br /> : line}
        </p>
      ))}
    </div>
  );
};

export default TrackLyrics;
