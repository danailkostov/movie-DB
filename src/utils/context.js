import React, { useContext, useEffect, useState } from "react";
import {
  fetchSearch,
  fetchPopular,
  fetchGenres,
  fetchPopularTV,
  fetchGenresTV,
  fetchTrendingDay,
  fetchTrendingWeek,
} from "../services/services";

const AppContext = React.createContext();

const posterUrl = "https://image.tmdb.org/t/p/w342";
const backdropUrl = "https://image.tmdb.org/t/p/w780";

const AppProvider = ({ children }) => {
  //date maximum 2021-02-27  minimum - 2021-01-10
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchItems, setSearchItems] = useState(null);
  const [nowItems, setNowItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState(null);
  const [tvs, setTvs] = useState(null);
  const [isMovies, setIsMovies] = useState(true);
  const [tvGenres, setTvGenres] = useState(null);
  const [trendingDayList, setTrendingDayList] = useState(null);
  const [trendingWeekList, setTrendingWeekList] = useState(null);
  const [isDay, setIsDay] = useState(true);
  console.log(tvGenres);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setNowItems(await fetchPopular());
      setGenres(await fetchGenres());
      setTvs(await fetchPopularTV());
      setTvGenres(await fetchGenresTV());
      setTrendingDayList(await fetchTrendingDay());
      setTrendingWeekList(await fetchTrendingWeek());
      setIsLoading(false);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      setSearchItems(await fetchSearch(searchQuery, searchPage));
    };
    fetchAPI();
  }, [searchQuery]);

  return (
    <AppContext.Provider
      value={{
        setSearchQuery,
        searchQuery,
        searchItems,
        nowItems,
        isLoading,
        posterUrl,
        backdropUrl,
        genres,
        tvs,
        isMovies,
        setIsMovies,
        tvGenres,
        trendingDayList,
        trendingWeekList,
        isDay,
        setIsDay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
