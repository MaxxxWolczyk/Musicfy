import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import animatedmusicgreen from "../../assets/animatedmusicgreen.gif";
import musicgreen from "../../assets/musicgreen.svg";
import { useDispatch } from "react-redux";
import {
  setCurrentSongs,
  playPause,
  setActiveSong,
  setCurrentKey,
} from "../../redux/features/PlayerSlice";
import PlaylistPopupButton from "../PlaylistPopupButton";
import { useNavigate } from "react-router-dom";

const PopularSongsArtist = ({ topSongs, id }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlePlay = () => {
    const songsArr = [];
    topSongs.data.map((track) => {
      if (track.attributes.previews[0] === undefined) return;
      songsArr.push({
        key: track.id,
        id: track.id,
        image: track.attributes.artwork.url,
        src: track.attributes.previews[0].url,
        title: track.attributes.name,
        artists: [{ alias: track.attributes.artistName, adamid: id }],
      });
    });
    dispatch(setCurrentSongs(songsArr));
  };

  return (
    <>
      <h3 className="text-white font-bold text-lg sm:text-3xl mb-4 mt-2">
        Top Songs:
      </h3>
      <div className={`flex flex-col gap-4 w-full`}>
        {topSongs.data.map((item, index) => (
          <div
            className={`flex w-full items-center p-2 rounded-md transition-colors hover:bg-white hover:bg-opacity-25 ${
              item.id === activeSong?.id ? "text_green-primary" : "text_primary"
            }`}
            key={item.id}
          >
            {item.id === activeSong?.id ? (
              <img
                src={isPlaying ? animatedmusicgreen : musicgreen}
                alt="plau indicator"
                className="mr-2 sm:mr-4 w-[24px] h-[24px]"
              />
            ) : (
              <p className="w-[24px] text-center mr-2 sm:mr-4 font-bold">
                {index + 1}
              </p>
            )}

            <img
              src={item.attributes.artwork.url}
              alt=""
              className="w-10 h-10"
            />
            <p
              className=" truncate max-w-[83px] sm:max-w-[250px] font-semibold ml-2 sm:ml-4 cursor-pointer"
              onClick={() => navigate(`/track/${item.id}`)}
            >
              {item.attributes.name}
            </p>
            <div className=" flex gap-2 items-center ml-auto ">
              <PlaylistPopupButton
                width={8}
                heigth={8}
                songObj={{
                  key: item.id,
                  id: item.id,
                  image: item.attributes.artwork.url,
                  src: item.attributes.previews[0].url,
                  title: item.attributes.name,
                  artists: [{ alias: item.attributes.artistName, adamid: id }],
                }}
              />
              <FaPlayCircle
                className="w-8 h-8 hover:text-white cursor-pointer"
                onClick={() => {
                  dispatch(playPause(false));
                  handlePlay();
                  dispatch(setCurrentKey(item.id));
                  dispatch(setActiveSong());
                  dispatch(playPause(true));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularSongsArtist;
