import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGradient } from "../../redux/features/DesignSlice";
import { Link } from "react-router-dom";

const TrackHeader = ({ coverart, title, gradientColor, artists }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGradient(gradientColor));
  }, [title]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <img
        src={coverart}
        alt=""
        className="w-36 h-36 sm:w-52 sm:h-52 object-cover self-center mb-4 sm:mb-0 mr-0 sm:mr-8"
      />
      <div className="flex flex-col  sm:h-52 justify-center">
        <h3 className="text-white font-bold text-3xl sm:text-6xl">{title}</h3>
        <div className="flex ">
          {artists?.map((item, index) => (
            <Link
              key={item.adamid}
              to={`/artists/${item.adamid}`}
              className="text_primary hover:text-white border-2 border-transparent hover:underline"
            >
              <p className="">
                {item?.alias
                  .split("-")
                  .map((item) =>
                    decodeURIComponent(
                      ` ${item[0].toUpperCase() + item.slice(1, item.length)}`
                    )
                  )}
                {index !== artists.length - 1 && ", "}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackHeader;
