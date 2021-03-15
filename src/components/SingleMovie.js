import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Cast from "./Cast";
import Recommended from "./Recommended";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCrew,
  fetchMovieCast,
  fetchMovieImages,
  fetchMovieReviews,
  fetchRecMovies,
} from "../services/services";

const SingleMovie = () => {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCrew, setMovieCrew] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const directors = movieCrew.filter((member) => member.job === "Director");
  const writers = movieCrew.filter((member) => member.department === "Writing");

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setMovieDetails(await fetchMovieDetails(id));
      setMovieCrew(await fetchMovieCrew(id));
      setMovieCast(await fetchMovieCast(id));
      setImages(await fetchMovieImages(id));
      setReviews(await fetchMovieReviews(id));
      setRecMovies(await fetchRecMovies(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }

  return (
    <Container maxWidth="lg" component="section">
      {/* Overview Section */}
      <Overview
        movieDetails={movieDetails}
        directors={directors}
        writers={writers}
        reviews={reviews}
      />
      {/* Cast Section*/}
      <Cast movieCast={movieCast} />
      {/* Recommended Section */}
      <Recommended recMovies={recMovies} />
    </Container>
  );
};

export default SingleMovie;
