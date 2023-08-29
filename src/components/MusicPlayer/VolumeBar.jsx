import React from "react";

import { HiOutlineSpeakerXMark, HiOutlineSpeakerWave } from "react-icons/hi2";

const VolumeBar = ({ volume, setVolume, preVolume, setPreVolume }) => {
  return (
    <div className="hidden sm:flex gap-2">
      {volume === 0 ? (
        <HiOutlineSpeakerXMark
          className="w-6 h-6"
          onClick={() => {
            setVolume(preVolume);
          }}
        />
      ) : (
        <HiOutlineSpeakerWave
          className="w-6 h-6"
          onClick={() => {
            setPreVolume(volume);
            setVolume(0);
          }}
        />
      )}
      <input
        type="range"
        min={0}
        max={1}
        value={volume}
        step="any"
        onChange={(e) => {
          setVolume(e.target.value);
        }}
        className="w-[200px] sm:w-auto"
      />
    </div>
  );
};

export default VolumeBar;
