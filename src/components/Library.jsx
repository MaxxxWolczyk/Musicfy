import React, { useState, useEffect } from "react";
import { SiBookstack } from "react-icons/si";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserFavSongs,
  setUserPlaylists,
} from "../redux/features/DesignSlice";
import PlaylistShortcut from "./LibraryPage/PlaylistShortcut";
import { useAuthStatus } from "../hooks/useAuthStatus";

import {
  getDoc,
  doc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase.config.cjs";
import { auth } from "../firebase.config.cjs";
import LikedShortcut from "./LibraryPage/LikedShortcut";

function Library() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userFavSongs, userPlaylists, playlistRefresh } = useSelector(
    (state) => state.design
  );
  const { loggedIn, checkingStatus } = useAuthStatus();

  const getFavSongs = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      dispatch(setUserFavSongs(userData.favSongs));
      console.log("Pobrano polubione piosenki");
    } else {
      console.log("No such document");
    }
  };

  const getPlaylists = async () => {
    try {
      const q = query(
        collection(db, "playlists"),
        where("userRefs", "array-contains", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const playlistsArr = [];

      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        delete data.timestamp;
        playlistsArr.push(data);
      });
      dispatch(setUserPlaylists(playlistsArr));
      console.log("Pobrano playlisty");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loggedIn) return;
    getFavSongs();
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    getPlaylists();
  }, [loggedIn, playlistRefresh]);

  return (
    <div className="flex flex-col gap-8 min-h-screen px-4 sm:px-0">
      {location.pathname !== "/library" ? (
        <h2 className="flex text_primary items-center gap-4">
          <SiBookstack className="w-8 h-8" />
          <p className="text-xl font-semibold">Biblioteka</p>
        </h2>
      ) : (
        <h2 className="text-3xl text-white font-bold">Biblioteka</h2>
      )}
      <div className="flex gap-2">
        <button className="btn_primary">Albumy</button>
        <button className="btn_primary">Playlisty</button>
      </div>
      {checkingStatus ? (
        <p>Loading...</p>
      ) : (
        <>
          {loggedIn ? (
            <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
              {userFavSongs.length > 0 && (
                <LikedShortcut
                  title={"Polubione utwory"}
                  imgs={false}
                  tracks={userFavSongs}
                />
              )}
              {userPlaylists.map((playlist) => (
                <PlaylistShortcut
                  key={playlist.id}
                  id={playlist.id}
                  tracks={playlist.tracks}
                  title={playlist.name}
                />
              ))}
            </div>
          ) : (
            <p className="text-white font-semibold">
              Zaloguj się aby uzyskać dostęp do biblioteki
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Library;
