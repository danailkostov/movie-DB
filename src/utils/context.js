import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();
const searchUrl =
  "https://api.themoviedb.org/3/search/multi?api_key=626eebde47750fb57144ba7fcfb85a26&language=en-US&query=";

const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchItems, setSearchItems] = useState(null);

  const fetchSearch = async () => {
    const query = searchQuery;
    const page = `&page=${searchPage}`;
    const response = await fetch(`${searchUrl}${query}${page}`);
    const searchListArray = await response.json();
    console.log(searchListArray.results);
    setSearchItems(searchListArray.results);
  };

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  return (
    <AppContext.Provider value={{ setSearchQuery, searchQuery, searchItems }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
