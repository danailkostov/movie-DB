import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  fetchTopRatedMovies,
  fetchTopRatedMoviesPages,
} from "../services/services";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

const posterUrl = "https://image.tmdb.org/t/p/w185";

const FilterMovies = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState("");
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setMovies(await fetchTopRatedMovies(page - 1));
      setPagesCount(await fetchTopRatedMoviesPages());
      setIsLoading(false);
    };
    fetchAPI();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginTop: "25px" }} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5">Top Rated Movies</Typography>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ marginBottom: "15px" }}>
            <Typography variant="h6">Sort</Typography>
          </Paper>
          <Paper style={{ marginBottom: "15px" }}>
            <Typography variant="h6">Sort</Typography>
          </Paper>
          <Paper style={{ marginBottom: "15px" }}>
            <Typography variant="h6">Sort</Typography>
          </Paper>
          <Paper style={{ marginBottom: "15px" }}>
            <Typography variant="h6">Sort</Typography>
          </Paper>
        </Grid>
        <Grid item xs={9} container spacing={4}>
          {movies.map((movie) => {
            const {
              poster_path,
              title,
              vote_average,
              release_date,
              id,
            } = movie;
            return (
              <Grid item xs={3} style={{ height: "450px" }}>
                <Paper
                  style={{
                    height: "100%",
                    backgroundColor: "#1f2833",
                    color: "#45A29E",
                  }}
                  elevation={7}
                >
                  <Link to={`/movie/${id}`}>
                    <img
                      src={`${posterUrl}${poster_path}`}
                      alt="#"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderRadius: "5px",
                      }}
                    />
                  </Link>
                  <Typography
                    variant="subtitle2"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                  >
                    <Link
                      to={`/movie/${id}`}
                      style={{ textDecoration: "none", color: "#45A29E" }}
                    >
                      {title}
                    </Link>
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: "10px",
                      paddingBottom: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <Typography variant="body1">
                      {moment(release_date, "YYYY-MM-DD").format(
                        "MMM Do[,] YYYY"
                      )}
                    </Typography>
                    <Typography variant="body1">{vote_average}</Typography>
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={pagesCount}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              classes={{ ul: classes.ul }}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterMovies;
