import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  playPause,
  setNextSong,
  setPrevSong,
  setShuffle,
} from "../redux/features/PlayerSlice";

//icons import
import { FaAngleDown } from "react-icons/fa";

import DesktopHeader from "./MusicPlayer/DesktopHeader";
import Controls from "./MusicPlayer/Controls";
import VolumeBar from "./MusicPlayer/VolumeBar";
import MobileNav from "./MusicPlayer/MobileNav";

function Player() {
  const { isPlaying, activeSong, currentSongs, shuffle } = useSelector(
    (state) => state.player
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [preVolume, setPreVolume] = useState(0.3);
  const [loop, setLoop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dispatch = useDispatch();

  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying === true) audioRef?.current.play();
  }, [activeSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlay = () => {
    if (isPlaying === false) {
      audioRef.current.play();
      dispatch(playPause(true));
    } else if (isPlaying === true) {
      audioRef.current.pause();
      dispatch(playPause(false));
    }
  };

  const handlePrev = (event) => {
    switch (event.detail) {
      case 1: {
        audioRef.current.currentTime = 0;
        break;
      }
      case 2: {
        dispatch(setPrevSong());
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleNext = () => dispatch(setNextSong());

  const handleShuffle = () => dispatch(setShuffle());

  if (currentSongs.length === 0) return <div></div>;

  return (
    <div
      className={`${
        showMobileNav
          ? "h-full flex-col justify-end gap-8 bg-black bg-opacity-90 p-4 "
          : "h-auto justify-between "
      } absolute z-50 bottom-0 sm:translate-y-0 w-full sm:bg-black bg-opacity-90 sm:p-4 text-white flex px-2 xl:px-14 items-center`}
    >
      {showMobileNav || window.innerWidth > 500 ? (
        <>
          {" "}
          <FaAngleDown
            className="block sm:hidden justify-self-start h-10 w-10 absolute top-0 mt-8"
            onClick={() => setShowMobileNav(false)}
          />{" "}
          {/* first component */}
          <DesktopHeader activeSong={activeSong} />
          {/* Second component */}
          <Controls
            handlePrev={handlePrev}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            handleNext={handleNext}
            loop={loop}
            setLoop={setLoop}
            currentTime={currentTime}
            duration={duration}
            shuffle={shuffle}
            handleShuffle={handleShuffle}
            audioRef={audioRef}
          />
          {/* third component */}
          <VolumeBar
            volume={volume}
            setVolume={setVolume}
            preVolume={preVolume}
            setPreVolume={setPreVolume}
          />
        </>
      ) : (
        <MobileNav
          setShowMobileNav={setShowMobileNav}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePlay={handlePlay}
        />
      )}

      <audio
        ref={audioRef}
        src={activeSong?.src}
        onEnded={() => dispatch(setNextSong())}
        loop={loop}
        onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
      />
    </div>
  );
}

export default Player;
