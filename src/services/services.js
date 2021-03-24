// const apiKey = `api_key=${process.env.REACT_APP_API_KEY}`;
const apiKey = "api_key=626eebde47750fb57144ba7fcfb85a26";
const mainUrl = "https://api.themoviedb.org/3";
const searchUrl = `${mainUrl}/search/multi?${apiKey}&language=en-US&query=`;
const videosUrl = `${mainUrl}/movie/`;
const youtubeUrl = "https://www.youtube.com/watch?v=";
const genresUrl = `${mainUrl}/genre/movie/list?${apiKey}&language=en-US`;
const tvUrl = `${mainUrl}/tv/popular?${apiKey}&language=en-US&page=1`;
const tvVideosUrl = `${mainUrl}/tv/`;
const tvGenresUrl = `${mainUrl}/genre/tv/list?${apiKey}&language=en-US`;
const trendingDayUrl = `${mainUrl}/trending/all/day?${apiKey}&page=1`;
const trendingWeekUrl = `${mainUrl}/trending/all/week?${apiKey}&page=1`;
const topRatedTVsUrl = `${mainUrl}/tv/top_rated?${apiKey}&language=en-US&page=1`;

const fetchSearch = async (searchQuery, searchPage) => {
  const query = searchQuery;
  const page = `&page=${searchPage}`;
  const response = await fetch(`${searchUrl}${query}${page}`);
  const searchListArray = await response.json();
  return searchListArray.results;
};

const fetchNowPlayingMovies = async (page) => {
  const playingNowUrl = `${mainUrl}/movie/now_playing?${apiKey}&language=en-US&page=${page}`;
  const response = await fetch(playingNowUrl);
  const nowList = await response.json();
  return nowList.results.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
};

const fetchNowPlayingMoviesPages = async () => {
  const url = `${mainUrl}/movie/now_playing?${apiKey}&language=en-US&page=1`;
  const response = await fetch(url);
  const moviesList = await response.json();
  return moviesList.total_pages;
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
  return trailerKey.length > 0 ? `${youtubeUrl}${trailerKey[0]}` : null;
};

const fetchGenres = async () => {
  const response = await fetch(genresUrl);
  const genresList = await response.json();
  return genresList.genres;
};

const fetchNowPlayingTV = async () => {
  const response = await fetch(tvUrl);
  const tvList = await response.json();
  return tvList.results.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
};

const fetchVideoTV = async (id) => {
  const tvID = id;
  const response = await fetch(
    `${tvVideosUrl}${tvID}/videos?${apiKey}&language=en-US`
  );
  const videosData = await response.json();
  const trailerKey = videosData.results
    .filter((video) => video.type === "Trailer")
    .map((item) => item.key);

  return trailerKey.length > 0 ? `${youtubeUrl}${trailerKey[0]}` : null;
};

const fetchGenresTV = async () => {
  const response = await fetch(tvGenresUrl);
  const genresList = await response.json();
  return genresList.genres;
};

const fetchTrendingDay = async () => {
  const response = await fetch(trendingDayUrl);
  const dayList = await response.json();
  return dayList.results.sort((a, b) =>
    a.vote_average < b.vote_average ? 1 : -1
  );
};
const fetchTrendingWeek = async () => {
  const response = await fetch(trendingWeekUrl);
  const dayList = await response.json();
  return dayList.results.sort((a, b) =>
    a.vote_average < b.vote_average ? 1 : -1
  );
};

const fetchPopularMovies = async (page) => {
  const url = `${mainUrl}/movie/popular?${apiKey}&page=${page + 1}`;
  const response = await fetch(url);
  const moviesList = await response.json();
  return moviesList.results;
};

const fetchPopularMoviesPages = async () => {
  const url = `${mainUrl}/movie/popular?${apiKey}&language=en-US&page=1`;
  const response = await fetch(url);
  const moviesList = await response.json();
  return moviesList.total_pages;
};

const fetchTopRatedMovies = async (page) => {
  const topRatedMoviesUrl = `${mainUrl}/movie/top_rated?${apiKey}&language=en-US&page=${
    page + 1
  }`;
  const response = await fetch(topRatedMoviesUrl);
  const moviesList = await response.json();
  return moviesList.results;
};
const fetchTopRatedMoviesPages = async () => {
  const topRatedMoviesUrl = `${mainUrl}/movie/top_rated?${apiKey}&language=en-US&page=1`;
  const response = await fetch(topRatedMoviesUrl);
  const moviesList = await response.json();
  return moviesList.total_pages;
};

const fetchTopRatedTVs = async () => {
  const response = await fetch(topRatedTVsUrl);
  const tvsList = await response.json();
  return tvsList.results.sort((a, b) =>
    a.vote_average < b.vote_average ? 1 : -1
  );
};

const fetchUpcoming = async (page) => {
  const upcomingUrl = `${mainUrl}/movie/upcoming?${apiKey}&language=en-US&page=${page}`;
  const response = await fetch(upcomingUrl);
  const upcomingList = await response.json();
  return upcomingList.results.sort((a, b) =>
    a.popularity < b.popularity ? 1 : -1
  );
};

const fetchUpcomingPages = async () => {
  const topRatedMoviesUrl = `${mainUrl}/movie/upcoming?${apiKey}&language=en-US&page=1`;
  const response = await fetch(topRatedMoviesUrl);
  const moviesList = await response.json();
  return moviesList.total_pages;
};

const fetchMovieDetails = async (id) => {
  const singleMovieUrl = `${mainUrl}/movie/${id}?${apiKey}&language=en-US`;
  const response = await fetch(singleMovieUrl);
  const movieDetails = await response.json();
  return movieDetails;
};
const fetchMovieCrew = async (id) => {
  const singleMovieUrl = `${mainUrl}/movie/${id}/credits?${apiKey}&language=en-US`;
  const response = await fetch(singleMovieUrl);
  const movieCredits = await response.json();
  return movieCredits.crew;
};
const fetchMovieCast = async (id) => {
  const singleMovieUrl = `${mainUrl}/movie/${id}/credits?${apiKey}&language=en-US`;
  const response = await fetch(singleMovieUrl);
  const movieCredits = await response.json();
  return movieCredits.cast;
};

const fetchMovieImages = async (id) => {
  const movieImagesUrl = `${mainUrl}/movie/${id}/images?${apiKey}`;
  const response = await fetch(movieImagesUrl);
  const images = await response.json();
  return images.backdrops;
};

const fetchMovieReviews = async (id) => {
  const reviewsUrl = `${mainUrl}/movie/${id}/reviews?${apiKey}&page=1`;
  const response = await fetch(reviewsUrl);
  const reviews = await response.json();
  return reviews.results;
};

const fetchRecMovies = async (id) => {
  const recUrl = `${mainUrl}/movie/${id}/recommendations?${apiKey}&page=1`;
  const response = await fetch(recUrl);
  const rec = await response.json();
  return rec.results;
};

const fetchCertification = async (id) => {
  const certUrl = `${mainUrl}/movie/${id}/release_dates?${apiKey}`;
  const response = await fetch(certUrl);
  const certs = await response.json();
  const certUS = certs.results.filter((cert) => cert.iso_3166_1 === "US");
  return certUS.length > 0 ? certUS[0].release_dates[0].certification : null;
};

const fetchTVDetails = async (id) => {
  const detailsUrl = `${mainUrl}/tv/${id}?${apiKey}`;
  const response = await fetch(detailsUrl);
  const tvDetails = await response.json();
  return tvDetails;
};

const fetchTVReviews = async (id) => {
  const reviewsUrl = `${mainUrl}/tv/${id}/reviews?${apiKey}&page=1`;
  const response = await fetch(reviewsUrl);
  const reviews = await response.json();
  return reviews.results;
};

const fetchTVCerts = async (id) => {
  const certUrl = `${mainUrl}/tv/${id}/content_ratings?${apiKey}`;
  const response = await fetch(certUrl);
  const certs = await response.json();
  const certUS = certs.results.filter((cert) => cert.iso_3166_1 === "US");
  return certs.length > 0
    ? certUS
      ? certUS[0].rating
      : certs.results[0].rating
    : null;
};

const fetchTVCast = async (id) => {
  const castUrl = `${mainUrl}/tv/${id}/aggregate_credits?${apiKey}`;
  const response = await fetch(castUrl);
  const cast = await response.json();
  return cast.cast;
};
const fetchTVCrew = async (id) => {
  const castUrl = `${mainUrl}/tv/${id}/aggregate_credits?${apiKey}`;
  const response = await fetch(castUrl);
  const cast = await response.json();
  return cast.crew;
};

const fetchRecTV = async (id) => {
  const recUrl = `${mainUrl}/tv/${id}/recommendations?${apiKey}&page=1`;
  const response = await fetch(recUrl);
  const rec = await response.json();
  return rec.results;
};

const fetchPerson = async (id) => {
  const personUrl = `${mainUrl}/person/${id}?${apiKey}`;
  const response = await fetch(personUrl);
  const person = await response.json();
  return person;
};

const fetchKnownFor = async (id) => {
  const url = `${mainUrl}/person/${id}/combined_credits?${apiKey}`;
  const response = await fetch(url);
  const knownFor = await response.json();
  const obj = {};
  const castCredits = knownFor.cast;
  const crewCredits = knownFor.crew;
  castCredits.map((item) => {
    const { id, title, name, release_date, first_air_date, character } = item;
    const movieObj = {
      id: id,
      title: title ? title : name,
      date: release_date ? release_date : first_air_date,
      character: character,
    };
    if (obj.Acting) {
      obj.Acting.push(movieObj);
    } else {
      obj.Acting = [];
    }
    return obj;
  });
  const customCrew = crewCredits.reduce((acc, item) => {
    const {
      department,
      id,
      title,
      name,
      release_date,
      first_air_date,
      job,
    } = item;
    const movieObj = {
      id: id,
      title: title ? title : name,
      date: release_date ? release_date : first_air_date,
      job: job,
    };
    if (obj[department]) {
      obj[department].push(movieObj);
    } else {
      obj[department] = [movieObj];
    }
    return obj;
  }, {});

  const sortByDepartmentsCount = Object.keys(customCrew)
    .map((k) => {
      return { department: k, productions: customCrew[k] };
    })
    .sort((a, b) => b.productions.length - a.productions.length);

  const sortProductionsByYear = sortByDepartmentsCount.map((item) => {
    const { productions, department } = item;
    const sorted = [];
    const updated = {
      department: department,
      productions: productions.sort((a, b) =>
        new Date(a.date === undefined ? "3000-10-10" : a.date) <
        new Date(b.date === undefined ? "3000-10-10" : b.date)
          ? 1
          : -1
      ),
    };
    sorted.push(updated);
    return sorted;
  });

  const sortCastMovies = castCredits
    .sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1))
    .slice(0, 6);

  const sortCrewMovies = Array.from(new Set(crewCredits.map((s) => s.id)))
    .map((id) => {
      return {
        id: id,
        name:
          crewCredits.find((s) => s.id === id).name ||
          crewCredits.find((s) => s.id === id).title,
        vote_count: crewCredits.find((s) => s.id === id).vote_count,
        media_type: crewCredits.find((s) => s.id === id).media_type,
        poster_path: crewCredits.find((s) => s.id === id).poster_path,
      };
    })
    .sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1))
    .slice(0, 6);

  return {
    sortCastMovies,
    sortCrewMovies,
    sortProductionsByYear,
  };
};

const fetchSingleReview = async (id) => {
  const reviewUrl = `${mainUrl}/review/${id}?${apiKey}`;
  const response = await fetch(reviewUrl);
  const review = await response.json();
  return review;
};

export {
  fetchSearch,
  fetchNowPlayingMovies,
  fetchVideo,
  fetchGenres,
  fetchNowPlayingTV,
  fetchVideoTV,
  fetchGenresTV,
  fetchTrendingDay,
  fetchTrendingWeek,
  fetchTopRatedMovies,
  fetchTopRatedTVs,
  fetchUpcoming,
  fetchMovieDetails,
  fetchMovieCrew,
  fetchMovieCast,
  fetchMovieImages,
  fetchMovieReviews,
  fetchRecMovies,
  fetchCertification,
  fetchTVDetails,
  fetchTVReviews,
  fetchTVCerts,
  fetchTVCast,
  fetchRecTV,
  fetchPerson,
  fetchKnownFor,
  fetchSingleReview,
  fetchTVCrew,
  fetchTopRatedMoviesPages,
  fetchPopularMoviesPages,
  fetchPopularMovies,
  fetchNowPlayingMoviesPages,
  fetchUpcomingPages,
};
