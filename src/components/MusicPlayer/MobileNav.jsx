import React from "react";
import { Link } from "react-router-dom";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const MobileNav = ({ setShowMobileNav, activeSong, isPlaying, handlePlay }) => {
  return (
    <div className="w-full bg-black bg-opacity-90 rounded-md flex justify-between sm:hidden px-4 py-2">
      <div
        className="flex gap-2 items-center"
        onClick={() => setShowMobileNav(true)}
      >
        <img src={activeSong?.image} alt="" className="w-12 h-12" />
        <div className="flex flex-col">
          <p className="text-base font-bold truncate w-[100px]">
            {activeSong?.title}
          </p>
          <div className="flex overflow-x-hidden">
            {activeSong?.artists.map((item, index) => (
              <Link className="text_primary">
                <p className="text-xs">
                  {item?.alias
                    .split("-")
                    .map((item) =>
                      ` ${
                        item[0].toUpperCase() + item.slice(1, item.length)
                      }`.replaceAll("%C5%82", "ł")
                    )}
                  {index !== activeSong.artists.length - 1 && ", "}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default MobileNav;
