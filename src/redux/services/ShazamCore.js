import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { query } from "firebase/firestore";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/v1/charts/world" }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
    }),
    getTopChartsCountry: builder.query({
      query: () => "/v1/charts/country?country_code=PL",
    }),
    getArtistData: builder.query({
      query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/v1/charts/genre-world?genre_code=${genre}`,
    }),
    getTrackById: builder.query({
      query: (trackId) => `/v2/tracks/details?track_id=${trackId}`,
    }),
    getTrackByKey: builder.query({
      query: (trackKey) => `/v1/tracks/details?track_id=${trackKey}`,
    }),
    getRelatedTrackByKey: builder.query({
      query: (trackKey) => `/v1/tracks/related?track_id=${trackKey}`,
    }),
    getSimilarTrackByKey: builder.query({
      query: (trackKey) => `/v1/tracks/similarities?track_id=${trackKey}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTopChartsCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDataQuery,
  useGetSongsByGenreQuery,
  useGetTrackByIdQuery,
  useGetTrackByKeyQuery,
  useGetRelatedTrackByKeyQuery,
  useGetSimilarTrackByKeyQuery,
} = shazamCoreApi;
