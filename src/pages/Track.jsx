import React, { useEffect, useState } from "react";
import { useGetTrackByIdQuery } from "../redux/services/ShazamCore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import TrackHeader from "../components/TrackPage/TrackHeader";
import TrackLyrics from "../components/TrackPage/TrackLyrics";
import TrackControls from "../components/TrackPage/TrackControls";
import RelatedSongs from "../components/TrackPage/RelatedSongs";

import {
  setCurrentSongs,
  playPause,
  setActiveSong,
  setCurrentKey,
} from "../redux/features/PlayerSlice";

const Track = () => {
  const [loading, setLoading] = useState(true);
  const [trackKeyData, setTrackKeyData] = useState(null);
  const [songsArr, setSongsArr] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetTrackByIdQuery(params.trackId);

  const fetchHeaderData = async (TrackKey) => {
    const url = `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${TrackKey}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setTrackKeyData(result);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (isFetching) return;
    fetchHeaderData(
      data.resources["shazam-songs"][
        Object.keys(data.resources["shazam-songs"])[0]
      ].id
    );
  }, [data]);

  const handlePlay = (songId) => {
    if (songsArr.length === 0) return;
    dispatch(playPause(false));
    const songIndex = Object.keys(data.resources["shazam-songs"])[0];
    dispatch(
      setCurrentSongs([
        {
          key: data.resources.songs[Object.keys(data.resources.songs)[0]].id,
          id: data.resources.songs[Object.keys(data.resources.songs)[0]].id,
          image:
            data.resources["shazam-songs"][songIndex].attributes.images
              .coverArt,
          src: data.resources["shazam-songs"][songIndex].attributes.streaming
            .preview,
          title: data.resources["shazam-songs"][songIndex].attributes.title,
          artists: [
            {
              alias:
                data.resources["shazam-songs"][songIndex].attributes.artist,
              adamid:
                data.resources["shazam-songs"][songIndex].relationships.artists
                  .data[0].id,
            },
          ],
        },
        ...songsArr,
      ])
    );

    dispatch(setCurrentKey(songId));
    dispatch(setActiveSong());
    dispatch(playPause(true));
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <TrackHeader
        coverart={
          data.resources["shazam-songs"][
            Object.keys(data.resources["shazam-songs"])[0]
          ].attributes.images.coverArt
        }
        title={
          data.resources["shazam-songs"][
            Object.keys(data.resources["shazam-songs"])[0]
          ].attributes.title
        }
        gradientColor={trackKeyData.images.joecolor.split(":").pop(-1)}
        artists={trackKeyData.artists}
      />
      <div className="bg-black/30 px-4 pt-4 flex-col flex gap-4 ">
        <TrackControls
          handlePlay={handlePlay}
          songId={data.resources.songs[Object.keys(data.resources.songs)[0]].id}
          songObj={{
            key: data.resources.songs[Object.keys(data.resources.songs)[0]].id,
            id: data.resources.songs[Object.keys(data.resources.songs)[0]].id,
            image:
              data.resources["shazam-songs"][
                Object.keys(data.resources["shazam-songs"])[0]
              ].attributes.images.coverArt,
            src: data.resources["shazam-songs"][
              Object.keys(data.resources["shazam-songs"])[0]
            ].attributes.streaming.preview,
            title:
              data.resources["shazam-songs"][
                Object.keys(data.resources["shazam-songs"])[0]
              ].attributes.title,
            artists: [
              {
                alias:
                  data.resources["shazam-songs"][
                    Object.keys(data.resources["shazam-songs"])[0]
                  ].attributes.artist,
                adamid:
                  data.resources["shazam-songs"][
                    Object.keys(data.resources["shazam-songs"])[0]
                  ].relationships.artists.data[0].id,
              },
            ],
          }}
        />
        {data.resources.lyrics && (
          <TrackLyrics
            lyrics={
              data?.resources?.lyrics[Object.keys(data?.resources?.lyrics)[0]]
                .attributes.text
            }
          />
        )}
        <RelatedSongs
          trackKey={
            data.resources["shazam-songs"][
              Object.keys(data.resources["shazam-songs"])[0]
            ].id
          }
          setSongsArr={setSongsArr}
          handlePlay={handlePlay}
        />
      </div>
    </div>
  );
};

export default Track;
