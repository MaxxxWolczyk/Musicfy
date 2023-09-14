import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPlayerRefresh } from "../../redux/features/DesignSlice";
import { BiPlusMedical } from "react-icons/bi";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config.cjs";
import PlaylistShortcut from "../Playlists/PlaylistShortcut";

const PlaylistOutput = () => {
  const dispatch = useDispatch();
  const { selectedSong } = useSelector((state) => state.player);
  const { userPlaylists } = useSelector((state) => state.design);

  const createPLaylist = async () => {
    const docRef = await addDoc(collection(db, "playlists"), {
      name: selectedSong.title,
      tracks: [selectedSong],
      userRefs: [auth.currentUser.uid],
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID:", docRef.id);
    dispatch(setPlayerRefresh());
  };

  const udpatePlaylist = async (playlistId) => {
    const docRef = doc(db, "playlists", playlistId);
    await updateDoc(docRef, { tracks: arrayUnion(selectedSong) });
    dispatch(setPlayerRefresh());
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div
        className="flex gap-4 items-center w-full bg_secondary hover:bg-white/30 p-2 rounded-md cursor-pointer"
        onClick={createPLaylist}
      >
        <div className="flex justify-center items-center w-14 h-14 bg_primary rounded-md">
          <BiPlusMedical className="text-white w-8 h-8" />
        </div>
        <p className="text-white font-semibold">Stwórz nową playlistę</p>
      </div>
      {userPlaylists &&
        userPlaylists.map((playlist) => (
          <PlaylistShortcut func={udpatePlaylist} playlist={playlist} />
        ))}
    </div>
  );
};

export default PlaylistOutput;
