import React, { useContext, useEffect, useState } from "react";
import {
  fetchSearch,
  fetchNowPlayingMovies,
  fetchGenres,
  fetchNowPlayingTV,
  fetchGenresTV,
  fetchTrendingDay,
  fetchTrendingWeek,
  fetchTopRatedMovies,
  fetchTopRatedTVs,
  fetchUpcoming,
} from "../services/services";

const AppContext = React.createContext();

const posterUrl = "https://image.tmdb.org/t/p/w342";
const backdropUrl = "https://image.tmdb.org/t/p/w780";

const AppProvider = ({ children }) => {
  //date maximum 2021-02-27  minimum - 2021-01-10
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchItems, setSearchItems] = useState([]);
  const [nowItems, setNowItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState(null);
  const [tvs, setTvs] = useState(null);
  const [isMovies, setIsMovies] = useState(true);
  const [tvGenres, setTvGenres] = useState(null);
  const [trendingDayList, setTrendingDayList] = useState(null);
  const [trendingWeekList, setTrendingWeekList] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [topRatedTVs, setTopRatedTVs] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [isTV, setIsTV] = useState(false);
  const [upcomingList, setUpcomingList] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setNowItems(await fetchNowPlayingMovies(searchPage));
      setGenres(await fetchGenres());
      setTvs(await fetchNowPlayingTV());
      setTvGenres(await fetchGenresTV());
      setTrendingDayList(await fetchTrendingDay());
      setTrendingWeekList(await fetchTrendingWeek());
      setTopRatedMovies(await fetchTopRatedMovies(searchPage));
      setTopRatedTVs(await fetchTopRatedTVs());
      setUpcomingList(await fetchUpcoming(searchPage));
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
        isTV,
        setIsTV,
        topRatedMovies,
        topRatedTVs,
        upcomingList,
        setSearchItems,
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
