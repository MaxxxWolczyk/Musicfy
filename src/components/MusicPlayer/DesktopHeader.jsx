import React from "react";
import { Link } from "react-router-dom";

const DesktopHeader = ({ activeSong }) => {
  return (
    <div className="flex-col sm:flex-row flex sm:gap-3 items-center sm:w-[150px] md:w-[300px]">
      <img
        src={activeSong?.image}
        alt=""
        className="w-72 h-72 mb-8 sm:mb-0 sm:w-20 sm:h-20 sm:object-fill"
      />
      <div>
        <p className="text-3xl sm:text-base font-bold truncate w-[280px] sm:w-[100px] md:w-[250px]">
          {activeSong?.title}
        </p>
        <div className="flex">
          {activeSong?.artists.map((item, index) => (
            <Link
              key={item.adamid}
              to={`/artists/${item.adamid}`}
              className="text_primary hover:text-white border-2 border-transparent hover:underline"
            >
              <p className="text-xl sm:text-xs">
                {item?.alias
                  .split("-")
                  .map((item) =>
                    decodeURIComponent(
                      ` ${item[0].toUpperCase() + item.slice(1, item.length)}`
                    )
                  )}
                {index !== activeSong.artists.length - 1 && ", "}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
