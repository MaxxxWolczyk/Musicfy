import React, { useEffect } from "react";
import { useGetRelatedTrackByKeyQuery } from "../../redux/services/ShazamCore";
import { useSelector } from "react-redux";
import animatedmusicgreen from "../../assets/animatedmusicgreen.gif";
import musicgreen from "../../assets/musicgreen.svg";
import PlaylistPopupButton from "../PlaylistPopupButton";
import { FaPlayCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RelatedSongs = ({ trackKey, setSongsArr, handlePlay }) => {
  const { data, isFetching, error } = useGetRelatedTrackByKeyQuery(trackKey);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === undefined) return;
    const songsArr = [];
    data.map((track) => {
      if (track.hub.actions === undefined) return;
      songsArr.push({
        key: track.hub.actions[0].id,
        id: track.hub.actions[0].id,
        image: track.images.coverart,
        src: track.hub.actions[1].uri,
        title: track.title,
        artists: track.artists,
      });
    });
    setSongsArr(songsArr);
  }, [data]);

  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      <h3 className="text-white font-bold text-lg sm:text-3xl mb-2 mt-8">
        Fani lubią też:
      </h3>
      <div className={`flex flex-col gap-4 w-full`}>
        {data.map((item, index) => (
          <>
            {item.hub.actions !== undefined && (
              <div
                className={`hover:bg-white hover:bg-opacity-25 rounded-md transition-colors flex w-full items-center p-2 ${
                  item?.hub?.actions[0]?.id === activeSong?.id
                    ? "text_green-primary"
                    : "text_primary"
                }`}
                key={item.key}
              >
                {item?.hub.actions[0].id === activeSong?.id ? (
                  <img
                    src={isPlaying ? animatedmusicgreen : musicgreen}
                    alt=""
                    className="mr-2 sm:mr-4 w-[24px] h-[24px]"
                  />
                ) : (
                  <p className="w-[24px] text-center mr-2 sm:mr-4 font-bold">
                    {index + 1}
                  </p>
                )}

                <img src={item.images.coverart} alt="" className="w-10 h-10" />
                <p
                  className=" truncate max-w-[83px] sm:max-w-[250px] font-semibold ml-2 sm:ml-4 cursor-pointer"
                  onClick={() => navigate(`/track/${item?.hub.actions[0]?.id}`)}
                >
                  {item.title}
                </p>
                <div className=" flex gap-2 items-center ml-auto pr-8">
                  <PlaylistPopupButton width={8} heigth={8} />
                  <FaPlayCircle
                    className="w-8 h-8 hover:text-white cursor-pointer"
                    onClick={() => handlePlay(item?.hub.actions[0].id)}
                  />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default RelatedSongs;
