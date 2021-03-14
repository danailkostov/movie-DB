import {
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCrew,
  fetchMovieCast,
  fetchMovieImages,
  fetchMovieReviews,
} from "../services/services";
import { useGlobalContext } from "../utils/context";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PropTypes from "prop-types";

const SingleMovie = () => {
  let { id } = useParams();
  const { posterUrl } = useGlobalContext();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCrew, setMovieCrew] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const directors = movieCrew.filter((member) => member.job === "Director");
  const writers = movieCrew.filter((member) => member.department === "Writing");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setMovieDetails(await fetchMovieDetails(id));
      setMovieCrew(await fetchMovieCrew(id));
      setMovieCast(await fetchMovieCast(id));
      setImages(await fetchMovieImages(id));
      setReviews(await fetchMovieReviews(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
    vote_count,
    tagline,
    overview,
    runtime,
    status,
    budget,
    revenue,
    homepage,
    spoken_languages,
    production_companies,
  } = movieDetails;
  const allGenres = genres.map((item, index) =>
    index === genres.length - 1 ? ` ${item.name}` : ` ${item.name},`
  );

  return (
    <Container maxWidth="lg" component="section">
      {/* Overview */}
      <Grid
        container
        alignItems="center"
        spacing={5}
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={4} style={{ position: "relative" }}>
          <Button
            color="inherit"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            // onClick={() => handleOpen(video)}
          >
            <PlayCircleOutlineIcon style={{ fontSize: "70px" }} />
          </Button>
          <img
            src={`${posterUrl}${poster_path}`}
            alt={title}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={8} style={{ alignSelf: "start" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Reviews" {...a11yProps(1)} />
            <Tab label="Details" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="h4" component="h1">
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
            <Typography variant="h6" component="h2">
              Overview
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {overview}
            </Typography>
            <Typography variant="h6" component="h2">
              Directors
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {directors.map((director, index) =>
                index === directors.length - 1
                  ? director.name
                  : `${director.name}, `
              )}
            </Typography>
            <Typography variant="h6" component="h2">
              Writers
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              gutterBottom
              paragraph
            >
              {writers.map((writer, index) =>
                index === writers.length - 1 ? writer.name : `${writer.name}, `
              )}
            </Typography>
            <Button variant="contained">Add to Wishlist</Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6">
              A review by {reviews[0].author}
            </Typography>
            <Typography variant="body2" gutterBottom paragraph>
              Written by {reviews[0].author} on {reviews[0].created_at}
            </Typography>
            <Typography gutterBottom paragraph>
              In a magical land known as Kumandra; Humans and Dragons co-exist
              in harmony. When a threat in the form of creatures known as Druun
              arrive and threaten to destroy everything; the Dragons combine
              their power to defeat them but in doing so all but one of the
              Dragons remains. <br />
              <br /> In the new Disney animated film “Raya and the Last Dragon”;
              audiences are introduced to the narrative of the story by Raya
              (Kelly Marie Tran), who tells that the world has become fractured
              and she is to blame. A sacred relic that the Dragons used to
              Defeat the Druun has given her kingdom prosperity but the
              surrounding kingd.
              <br /> <br /> In the new Disney animated film “Raya and the Last
              Dragon”; audiences are introduced to the narrative of the story by
              Raya (Kelly Marie Tran), who tells that the world has become
              fractured and she is to blame. A sacred relic that the Dragons
              used to Defeat the Druun has given her kingdom prosperity but the
              surrounding kingd.
            </Typography>
            <Typography variant="h6" component="p">
              All Reviews
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h6" gutterBottom>
              Budget: <Typography variant="body2">{budget}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Official Website:
              <Typography variant="body2">{homepage}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Languages:
              <Typography variant="body2">
                {spoken_languages.map((lang) => lang.name)}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Production Companies:
              <Typography variant="body2">
                {production_companies.map((comp) => comp.name)}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Release Date:
              <Typography variant="body2">{release_date}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Revenue:
              <Typography variant="body2">{revenue}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Duration:
              <Typography variant="body2">{runtime} min</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Status:
              <Typography variant="body2">{status} min</Typography>
            </Typography>
          </TabPanel>
        </Grid>
      </Grid>

      {/* Cast */}
      <Grid container spacing={2} style={{ marginTop: "30px" }}>
        <Grid item xs={12}>
          <Divider light={true} style={{ backgroundColor: "white" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="p"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Top Billed Cast
            <Typography variant="body1" component="p">
              Full Cast & Crew
            </Typography>
          </Typography>
        </Grid>
        {movieCast.map((person, index) => {
          const { profile_path, name, character } = person;
          return index < 6 ? (
            <Grid item xs={2}>
              <img
                src={`${posterUrl}${profile_path}`}
                alt={name}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                }}
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
      </Grid>
    </Container>
  );
};

export default SingleMovie;
