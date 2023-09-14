import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { auth, db } from "../firebase.config.cjs";
import { doc, getDoc } from "firebase/firestore";

import Loading from "../components/Loading";
import PlaylistOutput from "../components/Playlists/PlaylistOutput";

import { FaPlayCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

const Playlist = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState({});

  const getPlaylist = async () => {
    const docRef = doc(db, "playlists", params.playlistId);
    const docSnap = await getDoc(docRef);
    setPlaylist(docSnap.data());
    setLoading(false);
  };

  const handleDelete = async () => {
    const docRef = doc(db, "playlists", params.playlistId);
  };

  useEffect(() => {
    setLoading(true);
    getPlaylist();
  }, [params.playlistId]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 px-6">
        <div className="flex flex-wrap justify-center items-center w-48 h-48 bg_primary rounded-md overflow-hidden shadow-xl">
          {playlist.tracks.length < 4 ? (
            <img src={playlist.tracks[0].image} />
          ) : (
            <>
              <img src={playlist.tracks[0].image} className="w-24 h-24" />
              <img src={playlist.tracks[1].image} className="w-24 h-24" />
              <img src={playlist.tracks[2].image} className="w-24 h-24" />
              <img src={playlist.tracks[3].image} className="w-24 h-24" />
            </>
          )}
        </div>
        <div className="flex flex-col justify-between sm:mt-10">
          <h2 className="text-white text-5xl 2xl:text-8xl font-bold">
            {playlist.name}
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
              {playlist.tracks.length === 1
                ? "1 utwór"
                : playlist.tracks.length + " utworów"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-black/20 mt-8 px-6 pt-4">
        <div>
          <FaPlayCircle
            className="w-14 h-14 text_green-primary hover:scale-110 cursor-pointer transition-transform"
            // onClick={() => handlePlay(userFavSongs[0].id)}
          />
        </div>
        <PlaylistOutput
          tracks={playlist.tracks}
          handlePlay={() => {}}
          handleDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default Playlist;
