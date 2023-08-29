import React, { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import SearchOutput from "../components/SearchPage/SearchOutput";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchHints, setSearchHints] = useState([]);
  const [showHints, setShowHints] = useState(true);

  const getHints = async () => {
    if (!showHints) {
      return;
    }
    if (searchTerm.length < 2) {
      setSearchHints([]);
      return;
    }
    const url = `https://shazam-core.p.rapidapi.com/v1/search/suggest?query=${searchTerm}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setSearchHints(result.hints);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setSearchHints([]);
    setShowHints(true);
    setSearchTerm(e.target.value);
  };

  onsubmit = (e) => {
    e.preventDefault();
    setSearchParams(`q=${searchTerm}`);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      getHints();
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-6 px-10 min-h-screen">
      <h2 className="text-3xl text-white font-bold">Wyszukaj</h2>
      <form className="">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md max-w-[800px]">
          <HiMagnifyingGlass className="w-6 h-6" />
          <input
            type="text"
            className="flex-grow outline-none text-base"
            placeholder="Czego chcesz posłuchać?"
            value={searchTerm}
            onChange={onChange}
          />
        </div>
      </form>
      <div className="flex flex-wrap gap-3 mb-10">
        {searchHints !== undefined && (
          <>
            {searchHints.length > 0 && (
              <p className="w-full text-xl text-white">Tego szukałeś?</p>
            )}
            {searchHints.map((hint, index) => (
              <p
                key={hint.term}
                className="text-white cursor-pointer text_primary hover:text-white"
                onClick={() => {
                  setSearchParams(``);
                  setSearchTerm(hint.term);
                  setShowHints(false);
                  setSearchHints([]);
                  setSearchParams(`q=${hint.term}`);
                }}
              >
                {hint.term}
                {index !== searchHints.length - 1 && ","}
              </p>
            ))}
          </>
        )}
      </div>
      {searchParams.get("q") && <SearchOutput />}
      <div className="mb-20" />
    </div>
  );
};

export default Search;
