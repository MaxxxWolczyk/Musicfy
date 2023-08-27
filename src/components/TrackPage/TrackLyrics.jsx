import React from "react";

const TrackLyrics = ({ lyrics }) => {
  return (
    <>
      {lyrics && (
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-white mb-4">Teskt</p>
          {lyrics.text.map((line, i) => (
            <>
              {line === "" ? (
                <br />
              ) : (
                <p key={i} className="text-white">
                  {line}
                </p>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default TrackLyrics;
