import React, { useState } from "react";
import MusicElement from "../MusicElement";
import MusicElementSkeleton from "../MusicElementSkeleton";
import { useDispatch } from "react-redux";
import { setCurrentSongs } from "../../redux/features/PlayerSlice";

const TopCharts = ({ data, isFetching, error }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
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
    dispatch(setCurrentSongs(songsArr));
  };

  return (
    <div className="flex gap-4 mt-4 mb-4 pb-4 overflow-x-scroll">
      {isFetching
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <MusicElementSkeleton key={index} color={item} />
          ))
        : data.map((item) => (
            <>
              {item.hub.actions !== undefined && (
                <MusicElement
                  key={item?.hub.actions[0].id}
                  id={item?.hub.actions[0].id}
                  handlePlay={handlePlay}
                  songKey={item?.hub?.actions[0].id}
                  imageURL={item?.images?.coverart}
                  title={item?.title}
                  subtitle={item?.subtitle}
                  songObj={{
                    key: item.hub.actions[0].id,
                    id: item.hub.actions[0].id,
                    image: item.images.coverart,
                    src: item.hub.actions[1].uri,
                    title: item.title,
                    artists: item.artists,
                  }}
                />
              )}
            </>
          ))}
    </div>
  );
};

export default TopCharts;
