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
        key: track.key,
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
        ? [
            "#F6FFDE",
            "#E3F2C1",
            "#C9DBB2",
            "#AAC8A7",
            "#FFF8D6",
            "#F7E1AE",
            "#A4D0A4",
            "#617A55",
            "#9E6F21",
            "#D4FAFC",
          ].map((item, index) => (
            <MusicElementSkeleton key={index} color={item} />
          ))
        : data.map((item) => (
            <MusicElement
              key={item.key}
              id={item.key}
              handlePlay={handlePlay}
              songKey={item.key}
              imageURL={item?.images?.coverart}
              title={item?.title}
              subtitle={item?.subtitle}
            />
          ))}
    </div>
  );
};

export default TopCharts;
