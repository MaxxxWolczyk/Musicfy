import { FaPlayCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentKey,
  setActiveSong,
  playPause,
} from "../redux/features/PlayerSlice";
import PlaylistPopupButton from "./PlaylistPopupButton";

const MusicElement = ({
  imageURL,
  title,
  subtitle,
  handlePlay,
  songKey,
  id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="bg-black/40 flex-shrink-0 w-[176px] rounded-xl shadow-xl">
      <div className="flex flex-col p-4 rounded-lg">
        <div className="relative mb-4  rounded-md overflow-hidden group transition-all">
          <div
            className={`${
              songKey === activeSong?.key
                ? "flex opacity-100"
                : "hidden  group-hover:flex "
            } absolute w-full h-full justify-center items-center opacity-0 hover:opacity-100 bg-black/50 transition-all`}
          >
            <PlaylistPopupButton width={10} heigth={10} />
            <FaPlayCircle
              className={`${
                songKey === activeSong?.key
                  ? "text-white"
                  : "text_primary hover:text-white"
              } w-10 h-10  transition-all cursor-pointer`}
              onClick={() => {
                dispatch(playPause(false));
                handlePlay();
                dispatch(setCurrentKey(songKey));
                dispatch(setActiveSong());
                dispatch(playPause(true));
              }}
            />
          </div>
          {imageURL ? (
            <img
              src={imageURL}
              alt="coverart"
              className="w-36 h-36 object-fill"
            />
          ) : (
            <div className="w-36 h-36 bg_primary flex items-center justify-center">
              <p className="text-white font-bold">Musicfy</p>
            </div>
          )}
        </div>

        <p
          className="text-white font-semibold truncate"
          onClick={() => navigate(`/track/${id}`)}
        >
          {title}
        </p>
        <p className="text-gray-400 text-xs font-semibold truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default MusicElement;
