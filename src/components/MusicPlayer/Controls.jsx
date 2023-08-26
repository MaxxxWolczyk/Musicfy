import React from "react";

// icons
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { FaRepeat, FaShuffle } from "react-icons/fa6";

const Controls = ({
  handlePrev,
  handlePlay,
  isPlaying,
  handleNext,
  loop,
  setLoop,
  currentTime,
  duration,
  handleShuffle,
  shuffle,
  audioRef,
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-col gap-4 items-center">
      <div className="flex items-center gap-8  sm:gap-3 md:gap-6">
        <FaShuffle
          className="player_icon"
          fill={shuffle ? "rgb(35, 192, 91)" : "rgb(167, 167, 167)"}
          onClick={handleShuffle}
        />
        <TbPlayerTrackPrevFilled className="player_icon" onClick={handlePrev} />
        {isPlaying ? (
          <FaPauseCircle
            className="w-10 h-10 cursor-pointer"
            onClick={handlePlay}
          />
        ) : (
          <FaPlayCircle
            className="w-10 h-10 cursor-pointer"
            onClick={handlePlay}
          />
        )}
        <TbPlayerTrackNextFilled className="player_icon" onClick={handleNext} />
        <FaRepeat
          className="player_icon"
          fill={loop ? "rgb(35, 192, 91)" : "rgb(167, 167, 167)"}
          onClick={() => setLoop((prevState) => !prevState)}
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="text_primary font-semibold">{`${Math.floor(
          currentTime / 60
        )}:${`0${Math.floor(currentTime % 60)}`.slice(-2)}`}</p>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
          className="cursor-pointer w-[200px] sm:w-[200px] md:w-[200px] lg:w-[400px] xl:w-[600px] outline-none border-none bg-slate-500"
          style={{ background: "green" }}
        />
        <p className="text_primary">
          {duration === 0
            ? "0:00"
            : `${Math.floor(duration / 60)}:${`0${Math.floor(
                duration % 60
              )}`.slice(-2)}`}
        </p>
      </div>
    </div>
  );
};

export default Controls;
