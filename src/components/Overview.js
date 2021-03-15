import React, { useState } from "react";
import { Grid, Button, Tabs, Tab, Typography, Box } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useGlobalContext } from "../utils/context";
import PropTypes from "prop-types";

const Overview = ({ movieDetails, directors, writers, reviews }) => {
  const { posterUrl } = useGlobalContext();
  const {
    poster_path,
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    tagline,
    overview,
    budget,
    homepage,
    spoken_languages,
    production_companies,
    revenue,
    status,
  } = movieDetails;
  const [value, setValue] = useState(0);
  const allGenres = genres.map((item, index) =>
    index === genres.length - 1 ? ` ${item.name}` : ` ${item.name},`
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
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
          <Typography variant="subtitle1" component="p" gutterBottom paragraph>
            {writers.map((writer, index) =>
              index === writers.length - 1 ? writer.name : `${writer.name}, `
            )}
          </Typography>
          <Button variant="contained">Add to Wishlist</Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">A review by {reviews[0].author}</Typography>
          <Typography variant="body2" gutterBottom paragraph>
            Written by {reviews[0].author} on {reviews[0].created_at}
          </Typography>
          <Typography gutterBottom paragraph>
            {reviews[0].content.substr(0, 1550)}...
            <Button color="inherit">Read more</Button>
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
  );
};

export default Overview;
