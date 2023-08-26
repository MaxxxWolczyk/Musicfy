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

const PopularSongsArtist = ({ topSongs, id }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  console.log(topSongs);

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
      <h3 className="text-white font-bold text-lg sm:text-3xl mb-2">
        Top Songs:
      </h3>
      <div className={`flex flex-col gap-4 w-full`}>
        {topSongs.data.map((item, index) => (
          <div
            className={`flex w-full items-center p-2 ${
              item.id === activeSong?.id ? "text_green-primary" : "text_primary"
            }`}
            key={item.id}
          >
            {item.id === activeSong?.id ? (
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

            <img
              src={item.attributes.artwork.url}
              alt=""
              className="w-10 h-10"
            />
            <p className=" truncate max-w-[83px] sm:max-w-[250px] font-semibold ml-2 sm:ml-4">
              {item.attributes.name}
            </p>
            <div className=" flex gap-2 items-center ml-auto pr-8">
              <PlaylistPopupButton width={8} heigth={8} />
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
