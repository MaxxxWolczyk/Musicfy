import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGradient } from "../../redux/features/DesignSlice";
import { useParams } from "react-router-dom";

const ArtistHeader = ({ avatarUrl, name, gradient }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [imgBlur, setImgBlur] = useState(true);

  useEffect(() => {
    setImgBlur(true);
    dispatch(setGradient(gradient));
  }, [name]);

  return (
    <div className="sm:px-4 flex flex-col sm:flex-row items-center gap-4 ">
      <div className="shadow-xl rounded-full overflow-hidden flex-shrink-0">
        <img
          src={avatarUrl}
          alt="avatar"
          className={`${
            imgBlur ? "blur-lg" : "blur-none"
          } w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 `}
          onLoad={() => {
            setImgBlur(false);
          }}
        />
      </div>
      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white self-start sm:self-auto">
        {name}
      </h1>
    </div>
  );
};

export default ArtistHeader;
