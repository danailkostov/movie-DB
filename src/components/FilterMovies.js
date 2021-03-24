import {
  Container,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import {
  fetchTopRatedMovies,
  fetchTopRatedMoviesPages,
  fetchPopularMoviesPages,
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchNowPlayingMoviesPages,
  fetchUpcoming,
  fetchUpcomingPages,
} from "../services/services";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

const posterUrl = "https://image.tmdb.org/t/p/w185";

const FilterMovies = () => {
  const { category } = useParams();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState("");
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [age, setAge] = React.useState("popularity");

  const handleSort = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      switch (category) {
        case "top-rated":
          setMovies(await fetchTopRatedMovies(page - 1));
          setPagesCount(await fetchTopRatedMoviesPages());
          break;
        case "popular":
          setMovies(await fetchPopularMovies(page - 1));
          setPagesCount(await fetchPopularMoviesPages());
          break;
        case "now-playing":
          setMovies(await fetchNowPlayingMovies(page));
          setPagesCount(await fetchNowPlayingMoviesPages());
          break;
        case "coming-soon":
          setMovies(await fetchUpcoming(page));
          setPagesCount(await fetchUpcomingPages());
          break;
        default:
          break;
      }
      setIsLoading(false);
    };
    fetchAPI();
  }, [page, category]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <Container maxWidth="lg">
      <Grid
        container
        style={{ marginTop: "25px", placeContent: "center" }}
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h5" style={{ paddingLeft: "15px" }}>
            Top Rated Movies
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Accordion
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              color: "#1f2833",
              backgroundColor: "#45A29E",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Sort</Typography>
            </AccordionSummary>
            <Divider />

            <AccordionDetails>
              <FormControl style={{ width: "100%" }}>
                <Typography gutterBottom>Sorts Results By</Typography>
                <Select
                  value={age}
                  onChange={handleSort}
                  style={{
                    backgroundColor: "#1f2833",
                    borderRadius: "5px",
                    paddingLeft: "15px",
                    border: "none",
                    color: "white",
                  }}
                >
                  <MenuItem value={"popularity"}>Popularity</MenuItem>
                  <MenuItem value={"rating"}>Rating</MenuItem>
                  <MenuItem value={"releaseDate"}>Release Date</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              color: "#1f2833",
              backgroundColor: "#45A29E",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Filters</Typography>
            </AccordionSummary>
            <Divider />

            <AccordionDetails>
              <Typography gutterBottom>Genres</Typography>
            </AccordionDetails>
          </Accordion>
          <Paper
            style={{
              marginBottom: "15px",
              borderRadius: "25px",
              backgroundColor: "#0B0C10",
            }}
          >
            <Button fullWidth style={{ color: "white" }}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} container spacing={4}>
          {movies.map((movie) => {
            const {
              poster_path,
              title,
              vote_average,
              release_date,
              id,
            } = movie;
            return (
              <Grid item xs={12} sm={6} lg={3} style={{ height: "450px" }}>
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
