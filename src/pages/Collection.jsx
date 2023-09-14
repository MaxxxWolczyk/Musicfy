import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { setGradient } from "../redux/features/DesignSlice";
import { useDispatch } from "react-redux";
import PlaylistOutput from "../components/Playlists/PlaylistOutput";
import {
  setActiveSong,
  setCurrentSongs,
  setCurrentKey,
  playPause,
} from "../redux/features/PlayerSlice";
import { setUserFavSongs } from "../redux/features/DesignSlice";

import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase.config.cjs";

const Collection = () => {
  const { userFavSongs } = useSelector((state) => state.design);
  const { currentSongs } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGradient("4338ca"));
  }, []);

  const handlePlay = (id) => {
    dispatch(playPause(false));
    dispatch(setCurrentSongs(userFavSongs));
    dispatch(setCurrentKey(id));
    dispatch(setActiveSong());
    dispatch(playPause(true));
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const updatedFavSongs = userFavSongs.filter((item) => item.id !== id);
    await updateDoc(docRef, { ["favSongs"]: updatedFavSongs });
    if (
      [userFavSongs.map((item) => item.id)].join(",") ===
      [currentSongs.map((item) => item.id)].join(",")
    )
      dispatch(setCurrentSongs(updatedFavSongs));
    dispatch(setUserFavSongs(updatedFavSongs));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 px-6">
        <div className="w-48 h-48 bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-100  flex justify-center items-center shadow-xl flex-shrink-0">
          <FaHeart className="text-white w-24 h-24" />
        </div>
        <div className="flex flex-col justify-between sm:mt-10">
          <h2 className="text-white text-5xl 2xl:text-8xl font-bold">
            Polubione Utwory
          </h2>
          <div className="flex gap-2 text-white font-semibold items-center mt-4 sm:mt-0">
            <img
              src={auth?.currentUser?.photoURL}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="cursor-pointer hover:underline">
              {auth?.currentUser?.displayName}
            </p>
            <BsDot className="hidden lg:block w-8 h-8" />
            <p className="hidden lg:block font-normal">
              {userFavSongs.length === 1
                ? "1 utwór"
                : userFavSongs.length + " utworów"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-black/20 mt-8 px-6 pt-4">
        <div>
          <FaPlayCircle
            className="w-14 h-14 text_green-primary hover:scale-110 cursor-pointer transition-transform"
            onClick={() => handlePlay(userFavSongs[0].id)}
          />
        </div>
        <PlaylistOutput
          tracks={userFavSongs}
          handlePlay={handlePlay}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Collection;
