import React, { useEffect, useState } from "react";
import { useGetSongsByGenreQuery } from "../../redux/services/ShazamCore";
import TopCharts from "./TopCharts";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];

const TopChartsGenre = () => {
  const [genre, setGenre] = useState("POP");
  const [genresIndex, setGrenresIndex] = useState(0);
  const [translate, setTranslate] = useState(0);

  const { data, isFetching, error } = useGetSongsByGenreQuery(genre);

  useEffect(() => {
    setGenre(genres[genresIndex].value);
  }, [genresIndex]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap w-full justify-between">
        <h2 className="text-3xl text-white font-bold w-full sm:w-auto mb-2">
          Top {genres[genresIndex].title}
        </h2>
        <div className="border-2 border-white flex gap-3 justify-center items-center px-2 py-1 bg-white rounded-lg">
          <button
            onClick={() => {
              if (genresIndex === 0) return;
              setGrenresIndex((prev) => prev - 1);
              setTranslate((prev) => prev + 80);
            }}
          >
            <FaAngleLeft className="w-4 h-4 hover:scale-110 transition-transform" />
          </button>
          <div className="flex w-[80px] overflow-hidden">
            {genres.map((item, index) => (
              <div
                key={item.title}
                className="w-[80px] flex-shrink-0 text-center transition-transform font-semibold"
                style={{
                  transform: `translateX(${translate}px)`,
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              if (genresIndex === genres.length - 1) return;
              setGrenresIndex((prev) => prev + 1);
              setTranslate((prev) => prev - 80);
            }}
          >
            <FaAngleRight className="w-4 h-4 hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <TopCharts data={data} isFetching={isFetching} error={error} />
    </div>
  );
};

export default TopChartsGenre;
