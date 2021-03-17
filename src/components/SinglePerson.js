import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPerson, fetchKnownFor } from "../services/services";

const SinglePerson = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [knownFor, setKnownFor] = useState({});
  const {
    name,
    profile_path,
    biography,
    known_for_department,
    gender,
    birthday,
    place_of_birth,
  } = person;

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setPerson(await fetchPerson(id));
      setKnownFor(await fetchKnownFor(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading person...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w300${profile_path}`;
  return (
    <Container maxWidth="lg" component="section">
      <Grid container style={{ margin: "30px 0px" }}>
        <Grid item xs={3}>
          <img
            src={posterUrl}
            alt={name}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </Grid>
        <Grid item xs={9} style={{ paddingLeft: "30px", alignSelf: "center" }}>
          <Typography variant="h4" gutterBottom paragraph>
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom paragraph>
            Biography :
          </Typography>
          <Typography variant="body1" gutterBottom paragraph>
            {biography}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom paragraph>
            Personal Info
          </Typography>
          <Typography variant="subtitle2">Department</Typography>
          <Typography variant="body1" paragraph>
            {known_for_department}
          </Typography>
          <Typography variant="subtitle2">Gender</Typography>
          <Typography variant="body1" paragraph>
            {gender === 1 ? "Female" : "Male"}
          </Typography>
          <Typography variant="subtitle2">Birthday</Typography>
          <Typography variant="body1" paragraph>
            {birthday}
          </Typography>
          <Typography variant="subtitle2">Place of Birth</Typography>
          <Typography variant="body1" paragraph>
            {place_of_birth}
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Known For</Typography>
          </Grid>
          {known_for_department === "Acting"
            ? knownFor.sortCastMovies.map((movie) => {
                const { title, name, poster_path } = movie;
                const knownPosterUrl = `https://image.tmdb.org/t/p/w154${poster_path}`;
                return (
                  <Grid item xs={2}>
                    <img
                      src={knownPosterUrl}
                      alt={title ? title : name}
                      style={{ borderRadius: "5px", width: "100%" }}
                    />
                    <Typography align="center" variant='body2'>
                      {title ? title : name}
                    </Typography>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePerson;
