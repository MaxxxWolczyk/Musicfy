import React from "react";
import { useGetSongsBySearchQuery } from "../../redux/services/ShazamCore";
import { useSearchParams } from "react-router-dom";
import MusicElement from "../MusicElement";
import MusicElementSkeleton from "../MusicElementSkeleton";
import ArtistElement from "../ArtistElement";
import ArtistElementSkeleton from "../ArtistElementSkeleton";
import { useDispatch } from "react-redux";
import { setCurrentSongs } from "../../redux/features/PlayerSlice";

const SearchOutput = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useGetSongsBySearchQuery(
    searchParams.get("q")
  );

  const handlePlay = () => {
    const songsArr = [];
    data?.tracks.hits.map((item) => {
      if (item.track.hub.actions === undefined) return;
      songsArr.push({
        key: item.track.hub.actions[0].id,
        id: item.track.hub.actions[0].id,
        image: item.track.images.coverart,
        src: item.track.hub.actions[1].uri,
        title: item.track.title,
        artists: [{ alias: item.track.subtitle, ...item.track.artists[0] }],
      });
    });
    dispatch(setCurrentSongs(songsArr));
  };

  if (error)
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl text-white">
          Brak wyników dla hasła{" "}
          <span className="font-bold">"{searchParams.get("q")}"</span>
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4 overflow-x-scroll pb-8 px-4">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <ArtistElementSkeleton />
            ))
          : data?.artists?.hits?.map((item) => (
              <ArtistElement
                key={item?.hub?.actions[0].id}
                avatarUrl={item?.artist.avatar}
                name={item?.artist.name}
                id={item?.artist.adamid}
              />
            ))}
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-8 overflow-y-scroll justify-center sm:justify-start pb-32">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <MusicElementSkeleton />
            ))
          : data?.tracks?.hits?.map((item) => (
              <MusicElement
                key={item?.track?.key}
                id={item?.track.hub.actions[0].id}
                imageURL={item?.track?.images.coverart}
                title={item?.track?.title}
                subtitle={item?.track?.subtitle}
                handlePlay={handlePlay}
                songKey={item?.track.hub.actions[0].id}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchOutput;
