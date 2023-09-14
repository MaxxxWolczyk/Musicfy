import React from "react";
import { useSelector } from "react-redux";

import { FaRegTimesCircle, FaPlayCircle } from "react-icons/fa";
import animatedmusicgreen from "../../assets/animatedmusicgreen.gif";
import musicgreen from "../../assets/musicgreen.svg";

const PlaylistOutput = ({ tracks, handlePlay, handleDelete }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  if (tracks.length === 0)
    return (
      <div className="h-36 flex items-center justify-center">
        <p className="text-white text-2xl font-bold">Nie znaleziono utworów</p>
      </div>
    );

  return (
    <div className=" flex flex-col">
      <div className="flex text_primary sm:px-4 ">
        <div className="flex gap-4 w-[480px]">
          <p className="w-[24px] text-center">#</p>
          <p>Tytuł</p>
        </div>
        <p className="hidden md:block w-[150px]">Wykonawca</p>
        <div className="flex gap-4 sm:gap-8 xl:gap-24 ml-auto">
          <p>Usuń</p>
          <p>Play</p>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white/20 h-[1px] gap-5 mt-4" />
      <div className="flex flex-col gap-4 mt-4 mb-4">
        {tracks.map((item, index) => (
          <div
            className={`flex items-center ${
              item.id === activeSong?.id ? "text_green-primary" : "text_primary"
            }  sm:px-4 py-2 rounded-md transition-colors hover:bg-white hover:bg-opacity-25`}
          >
            <div className="flex items-center gap-4 w-[180px] sm:w-[480px]">
              {item.id === activeSong?.id ? (
                <img
                  src={isPlaying ? animatedmusicgreen : musicgreen}
                  alt="plau indicator"
                  className="w-[24px] h-[24px]"
                />
              ) : (
                <p className="w-[24px] text-center  font-bold">{index + 1}</p>
              )}

              <img
                src={item.image}
                alt=""
                className="w-12 h-12 flex-shrink-0"
              />

              <p className="truncate">{item.title}</p>
            </div>
            <p className="hidden md:block w-[150px] truncate">
              {item.artists[0].alias
                .split("-")
                .map((item) =>
                  decodeURIComponent(
                    ` ${item[0].toUpperCase() + item.slice(1, item.length)}`
                  )
                )}
            </p>
            <div className="flex gap-4 sm:gap-8 xl:gap-24 ml-auto">
              <p>
                <FaRegTimesCircle
                  className="w-8 h-8 hover:rotate-180 hover:scale-110 transition-all hover:text-white cursor-pointer"
                  onClick={() => {
                    if (item.id === activeSong?.id) return;
                    handleDelete(item.id);
                  }}
                />
              </p>
              <p>
                <FaPlayCircle
                  className="w-8 h-8 hover:scale-110 hover:text-white transition-all cursor-pointer"
                  onClick={() => handlePlay(item.id)}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistOutput;
