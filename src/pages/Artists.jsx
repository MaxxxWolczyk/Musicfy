import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetArtistDataQuery } from "../redux/services/ShazamCore";
import ArtistHeader from "../components/ArtistPage/ArtistHeader";
import PopularSongsArtist from "../components/ArtistPage/PopularSongsArtist";
import SimilarArtists from "../components/ArtistPage/SimilarArtists";
import Albums from "../components/ArtistPage/Albums";
import Loading from "../components/Loading";

const Artists = () => {
  const params = useParams();

  const { data, isLoading, error } = useGetArtistDataQuery(params.artistId);

  useEffect(() => {
    document
      .getElementById("routeContainer")
      .scroll({ top, behavior: "smooth" });
  }, [params.artistId]);

  if (isLoading) return <Loading />;

  if (error) return <p>Error..</p>;

  return (
    <div className="flex flex-col h-auto">
      <ArtistHeader
        avatarUrl={data.data[0].avatar}
        name={data.data[0].attributes.name}
        gradient={data.data[0].attributes.artwork.bgColor}
      />
      <div className="divider" />
      <div className="bg-black/30 px-4 pt-2">
        <PopularSongsArtist
          topSongs={data.data[0].views["top-songs"]}
          id={data.data[0].id}
        />
        <div className="divider" />
        {data.data[0].views["full-albums"].data.length > 0 && (
          <>
            <h3 className="text-white font-bold text-lg sm:text-3xl mb-4">
              Dyskografia:
            </h3>
            <Albums albums={data.data[0].views["full-albums"].data} />
          </>
        )}
        <div className="divider" />
        <h3 className="text-white font-bold text-lg sm:text-3xl mb-8">
          Similar Artists:
        </h3>
        <SimilarArtists artists={data.data[0].views["similar-artists"].data} />
      </div>
    </div>
  );
};

export default Artists;
