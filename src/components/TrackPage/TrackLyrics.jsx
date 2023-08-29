import React from "react";

const TrackLyrics = ({ lyrics }) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold text-white mb-4">Teskt</p>
      {lyrics.map((line, i) => (
        <>
          {line === "" ? (
            <br key={i} />
          ) : (
            <p key={line} className="text-white">
              {line}
            </p>
          )}
        </>
      ))}
    </div>
  );
};

export default TrackLyrics;
