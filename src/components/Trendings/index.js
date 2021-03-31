import React from "react";
import Toggle from "./Toggle";
import { useGlobalContext } from "../../utils/context";
import TrendingList from "./TrendingList";

const Trending = () => {
  const {
    trendingDayList,
    trendingWeekList,
    isDay,
    isTV,
    topRatedMovies,
    topRatedTVs,
  } = useGlobalContext();
  const posterUrl = "https://image.tmdb.org/t/p/w342";

  return (
    <>
      <Toggle text="Trending" prev="Today" next="This Week" />
      <TrendingList
        movies={isDay ? trendingDayList : trendingWeekList}
        imageUrl={posterUrl}
      />
      <Toggle text="Top Rated" prev="Movies" next="TV" />
      <TrendingList
        movies={isTV ? topRatedTVs : topRatedMovies}
        imageUrl={posterUrl}
      />
    </>
  );
};

export default Trending;
