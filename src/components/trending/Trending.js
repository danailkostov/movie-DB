import React from "react";
import Toggle from "./Toggle";
import { useGlobalContext } from "../../utils/context";
import TrendingList from "./TrendingList";

const Trending = () => {
  const { trendingDayList, trendingWeekList, isDay } = useGlobalContext();
  const posterUrl = "https://image.tmdb.org/t/p/w342";

  return (
    <>
      <Toggle />
      <TrendingList
        movies={isDay ? trendingDayList : trendingWeekList}
        imageUrl={posterUrl}
      />
    </>
  );
};

export default Trending;
