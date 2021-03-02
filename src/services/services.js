const apiKey = "api_key=626eebde47750fb57144ba7fcfb85a26";
const mainUrl = "https://api.themoviedb.org/3";
const searchUrl = `${mainUrl}/search/multi?${apiKey}&language=en-US&query=`;
const playingNowUrl = `${mainUrl}/movie/now_playing?${apiKey}&language=en-US&page=1`;
const videosUrl = `${mainUrl}/movie/`;
const youtubeUrl = "https://www.youtube.com/watch?v=";
//${currentId}/videos?api_key=626eebde47750fb57144ba7fcfb85a26&language=en-US

const fetchSearch = async (searchQuery, searchPage) => {
  const query = searchQuery;
  const page = `&page=${searchPage}`;
  const response = await fetch(`${searchUrl}${query}${page}`);
  const searchListArray = await response.json();
  return searchListArray.results;
};

const fetchPopular = async () => {
  const response = await fetch(playingNowUrl);
  const nowList = await response.json();
  return nowList.results
    .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
    .slice(0, 4);
};


const fetchVideo = async (id) => {
  const movieID = id;
  const response = await fetch(
    `${videosUrl}${movieID}/videos?${apiKey}&language=en-US`
  );
  const videosData = await response.json();
  const trailerKey = videosData.results
    .filter((video) => video.type === "Trailer")
    .map((item) => item.key);

  return `${youtubeUrl}${trailerKey}`;
};

export { fetchSearch, fetchPopular, fetchVideo };
