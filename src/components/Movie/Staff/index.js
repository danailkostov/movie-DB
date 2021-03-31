import { Grid, Typography, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieCrew, fetchMovieCast } from "../../../services/services";
import { Link } from "react-router-dom";
import noImg from "../../../images/no-cover.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.up("sm")]: {
      height: "0px",
    },
  },
}));

const posterUrl = "https://image.tmdb.org/t/p/w45";

const MovieStaff = () => {
  const classes = useStyles();
  const { id, title } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cast, setCast] = useState("");
  const [crew, setCrew] = useState("");
  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setCrew(await fetchMovieCrew(id));
      setCast(await fetchMovieCast(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom paragraph>
            <Link
              to={`/movie/${id}`}
              style={{ textDecoration: "none", color: "#45A29E" }}
            >
              Back to main
            </Link>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          spacing={2}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Cast - <span>{cast.length}</span> people
            </Typography>
          </Grid>
          {cast.map((person) => {
            const { profile_path, character, name, id } = person;
            return (
              <Grid item xs={12} style={{ display: "flex" }}>
                <Link to={`/person/${id}`}>
                  <img
                    src={profile_path ? `${posterUrl}${profile_path}` : noImg}
                    alt={title}
                    style={{ borderRadius: "5px", maxWidth: "45px" }}
                  />
                </Link>
                <div style={{ paddingLeft: "20px", alignSelf: "center" }}>
                  <Typography variant="subtitle2">
                    <Link
                      to={`/person/${id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {name}
                    </Link>
                  </Typography>
                  <Typography variant="body2">{character}</Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          spacing={2}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              Crew - <span>{crew.length}</span> people
            </Typography>
          </Grid>
          {crew.map((person) => {
            const { profile_path, job, name, id } = person;
            return (
              <Grid item xs={12} style={{ display: "flex" }}>
                <Link to={`/person/${id}`}>
                  <img
                    src={profile_path ? `${posterUrl}${profile_path}` : noImg}
                    alt={title}
                    style={{ borderRadius: "5px", maxWidth: "45px" }}
                  />
                </Link>
                <div style={{ paddingLeft: "20px", alignSelf: "center" }}>
                  <Typography variant="subtitle2">
                    <Link
                      to={`/person/${id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {name}
                    </Link>
                  </Typography>
                  <Typography variant="body2">{job}</Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieStaff;
