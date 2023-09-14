import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFavSongs } from "../../redux/features/DesignSlice";

import { db } from "../../firebase.config.cjs";
import { auth } from "../../firebase.config.cjs";
import { doc, updateDoc } from "firebase/firestore";

import { FaRegHeart, FaHeart } from "react-icons/fa";
const AddtoLiked = () => {
  const { selectedSong } = useSelector((state) => state.player);
  const { userFavSongs } = useSelector((state) => state.design);

  const dispatch = useDispatch();

  const addFavSong = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const updatedFavSongs = [...userFavSongs, selectedSong];
    await updateDoc(docRef, { ["favSongs"]: updatedFavSongs });
    dispatch(setUserFavSongs(updatedFavSongs));
  };

  const removeFavSong = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const updatedFavSongs = userFavSongs.filter(
      (item) => item.id !== selectedSong.id
    );
    await updateDoc(docRef, { ["favSongs"]: updatedFavSongs });
    dispatch(setUserFavSongs(updatedFavSongs));
  };

  return (
    <div>
      {userFavSongs.find((item) => item.id === selectedSong.id) ? (
        <FaHeart
          className="w-8 h-8 text_green-primary cursor-pointer hover:scale-110 transition-transform"
          onClick={removeFavSong}
        />
      ) : (
        <FaRegHeart
          className="ml-auto w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform"
          onClick={addFavSong}
        />
      )}
    </div>
  );
};

export default AddtoLiked;
