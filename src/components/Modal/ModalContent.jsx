import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddtoLiked from "../TrackPage/AddtoLiked";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import PlaylistOutput from "./PlaylistOutput";

const ModalContent = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { selectedSong } = useSelector((state) => state.player);

  if (checkingStatus)
    return (
      <div className="w-full h-full bg_secondary_100">
        <p className="text-lg font-bold text-white">Loading...</p>
      </div>
    );

  return (
    <>
      {loggedIn ? (
        <>
          <div className="flex w-full h-full bg_secondary_100 flex-col py-8">
            <h3 className="my-4 text-white font-bold px-2 sm:px-8">
              Wybrana piosenka:
            </h3>
            <div className="flex gap-4 bg-black/40 py-4 px-2 sm:px-8 flex-col sm:items-center sm:flex-row">
              <img
                src={selectedSong.image}
                alt="coverart"
                className="w-20 h-20 object-cover shadow-lg rounded-md self-center"
              />
              <div className="flex items-center flex-grow">
                <div className="flex flex-col text-white  justify-center mr-auto">
                  <p className="text-lg font-bold truncate max-w-[200px]">
                    {selectedSong.title}
                  </p>

                  <div className="flex">
                    {selectedSong.artists.map((item, index) => (
                      <p className="sm:text-xs">
                        {item?.alias
                          .split("-")
                          .map((item) =>
                            decodeURIComponent(
                              ` ${
                                item[0].toUpperCase() +
                                item.slice(1, item.length)
                              }`
                            )
                          )}
                        {index !== selectedSong.artists.length - 1 && ", "}
                      </p>
                    ))}
                  </div>
                </div>
                <AddtoLiked />
              </div>
            </div>
            <h3 className="text-white font-bold px-2 sm:px-8 my-4">
              Dodaj do playlisty
            </h3>
            <div className="flex flex-col px-2 sm:px-8 py-2 gap-4 bg-black/40 flex-grow overflow-y-scroll">
              <PlaylistOutput />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg_secondary_100 rounded-lg flex justify-center items-center">
          <p className="text-lg font-bold text-white">
            Musisz się zalogować aby dodać utwór do playlisty
          </p>
        </div>
      )}
    </>
  );
};

export default ModalContent;
