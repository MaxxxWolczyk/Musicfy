import React from "react";
import TopCharts from "../components/HomePage/TopCharts";
import {
  useGetTopChartsCountryQuery,
  useGetTopChartsQuery,
} from "../redux/services/ShazamCore";
import TopChartsGenre from "../components/HomePage/TopChartsGenre";
import Loading from "../components/Loading";

function HomePage() {
  const {
    data: TCWData,
    isFetching: TCWFetching,
    error: TCWError,
  } = useGetTopChartsQuery();
  const {
    data: TCCData,
    isFetching: TCCFetching,
    error: TCCError,
  } = useGetTopChartsCountryQuery();

  return (
    <div className="flex flex-col gap-14 px-4">
      <div>
        <h2 className="text-3xl text-white font-bold">Top Hits Świat</h2>
        <TopCharts data={TCWData} isFetching={TCWFetching} error={TCWError} />
      </div>
      <div>
        <h2 className="text-3xl text-white font-bold">Top Hits Polska</h2>
        <TopCharts data={TCCData} isFetching={TCCFetching} error={TCCError} />
      </div>
      <TopChartsGenre />
      <div className="mb-4" />
    </div>
  );
}

export default HomePage;
