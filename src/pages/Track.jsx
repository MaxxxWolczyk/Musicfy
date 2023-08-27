import React from "react";
import { useGetTrackByIdQuery } from "../redux/services/ShazamCore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import TrackHeader from "../components/TrackPage/TrackHeader";
import TrackLyrics from "../components/TrackPage/TrackLyrics";
import TrackControls from "../components/TrackPage/TrackControls";

const Track = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetTrackByIdQuery(params.trackId);
  console.log(data);

  if (isFetching) return <Loading />;

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <TrackHeader
        bgImage={data.images.background}
        coverart={data.images.coverart}
        title={data.title}
        gradientColor={data.images.joecolor.split(":").pop(-1)}
        artists={data.artists}
      />
      <div className="bg-black/50 px-4 pt-4">
        <TrackControls />
        <TrackLyrics
          lyrics={data.sections.filter((item) => item.type === "LYRICS")[0]}
        />
      </div>
    </div>
  );
};

export default Track;
