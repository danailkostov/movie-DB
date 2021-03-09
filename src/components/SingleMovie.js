import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCrew,
  fetchMovieCast,
} from "../services/services";
import { useGlobalContext } from "../utils/context";

const SingleMovie = () => {
  let { id } = useParams();
  const { posterUrl } = useGlobalContext();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCrew, setMovieCrew] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const directors = movieCrew.filter((member) => member.job === "Director");

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setMovieDetails(await fetchMovieDetails(id));
      setMovieCrew(await fetchMovieCrew(id));
      setMovieCast(await fetchMovieCast(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }
  console.log(movieCast);
  const {
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    tagline,
    overview,
    runtime,
    status,
    budget,
    revenue,
  } = movieDetails;
  const allGenres = genres.map((item, index) =>
    index === genres.length - 1 ? ` ${item.name}` : ` ${item.name},`
  );

  return (
    <Container maxWidth="lg" component="section">
      <Grid
        container
        alignItems="center"
        spacing={5}
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={4}>
          <img
            src={`${posterUrl}${poster_path}`}
            alt={title}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title} (Year)
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            {release_date} - {allGenres} - {runtime} mins
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            {vote_average} || IMDB link
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            {tagline}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Overview
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            {overview}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Directors
          </Typography>
          <Typography variant="subtitle1" component="p">
            {directors.map((director) => director.name)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "30px" }}>
        <Grid item xs={12}>
          <Typography variant="h6" component="p">
            Top Billed Cast
          </Typography>
        </Grid>
        {movieCast.map((person, index) => {
          const { profile_path, name, character } = person;
          return index < 5 ? (
            <Grid item xs={2}>
              <img
                src={`${posterUrl}${profile_path}`}
                alt={name}
                style={{ width: "100%" }}
              />
              <Typography component="h1" variant="h6">
                {name}
              </Typography>
              <Typography component="p" variant="p">
                {character}
              </Typography>
            </Grid>
          ) : null;
        })}
        <Grid item xs={2} style={{ paddingLeft: "50px" }}>
          <Typography component="h1" variant="h6">
            Status
          </Typography>
          <Typography gutterBottom paragraph component="p" variant="p">
            {status}
          </Typography>
          <Typography component="h1" variant="h6">
            Budget
          </Typography>
          <Typography gutterBottom paragraph component="p" variant="p">
            ${budget}
          </Typography>
          <Typography component="h1" variant="h6">
            Revenue
          </Typography>
          <Typography gutterBottom paragraph component="p" variant="p">
            ${revenue}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="p">
            Full Cast & Crew
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleMovie;
