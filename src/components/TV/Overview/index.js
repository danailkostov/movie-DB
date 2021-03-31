import React, { useState } from "react";
import {
  Grid,
  Button,
  Tabs,
  Tab,
  Typography,
  Box,
  Modal,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useGlobalContext } from "../../../utils/context";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import StarIcon from "@material-ui/icons/Star";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  headline: {
    display: "flex",
    justifyContent: "space-around",
    marginLeft: "25px",
    [theme.breakpoints.only("xs")]: {
      display: "grid",
      fontSize: "1.3rem",
    },
  },
}));

const OverviewTV = ({ tvDetails, tvReviews, tvCert, tvVideo }) => {
  const classes = useStyles();
  const { posterUrl } = useGlobalContext();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    poster_path,
    name,
    first_air_date,
    episode_run_time,
    genres,
    vote_average,
    tagline,
    overview,
    spoken_languages,
    production_companies,
    status,
    created_by,
    number_of_episodes,
    number_of_seasons,
  } = tvDetails;
  const premiereDate = moment(first_air_date, "YYYY-MM-DD").year();
  const releaseDate = moment(first_air_date, "YYYY-MM-DD").format(
    "MMMM Do YYYY"
  );
  const reviewDate =
    tvReviews.length > 0
      ? moment(tvReviews[0].created_at, "YYYY-MM-DD").format("MMMM Do[,] YYYY")
      : null;
  console.log(reviewDate);
  const allGenres = genres.map((item, index) =>
    index === genres.length - 1 ? (
      <Link
        to={"/tvs/" + item.id}
        style={{ color: "#45A29E", textDecoration: "none" }}
      >
        {" "}
        {item.name}{" "}
      </Link>
    ) : (
      <Link
        to={"/tvs/" + item.id}
        style={{ color: "#45A29E", textDecoration: "none" }}
      >
        {" "}
        {item.name},{" "}
      </Link>
    )
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
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
    <>
      <Grid
        container
        alignItems="center"
        spacing={5}
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={12} md={4} style={{ position: "relative" }}>
          {tvVideo && (
            <Button
              color="inherit"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleOpen()}
            >
              <PlayCircleOutlineIcon style={{ fontSize: "70px" }} />
            </Button>
          )}
          <img
            src={`${posterUrl}${poster_path}`}
            alt={name}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ alignSelf: "start" }}>
          <Typography variant="h4" component="h1" className={classes.headline}>
            {name}
            <Typography
              variant="h4"
              component="p"
              gutterBottom
              style={{ position: "relative" }}
            >
              {vote_average}
              <StarIcon
                style={{
                  color: "yellow",
                  position: "absolute",
                  marginLeft: "10px",
                  top: "2px",
                }}
                fontSize="inherit"
              />
            </Typography>
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            gutterBottom
            style={{ marginLeft: "25px" }}
          >
            {premiereDate} | {allGenres} | {episode_run_time[0]}mins | {tvCert}
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            style={{ marginLeft: "25px", marginTop: "25px" }}
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Reviews" {...a11yProps(1)} />
            <Tab label="Details" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {tagline}
            </Typography>
            <Typography variant="h6" component="h2">
              Overview
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {overview}
            </Typography>
            {created_by.length > 0 && (
              <>
                <Typography variant="h6" component="h2">
                  Creators
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                  {created_by.map((creator, index) =>
                    index === created_by.length - 1 ? (
                      <Link
                        to={"/person/" + creator.id}
                        style={{ textDecoration: "none", color: "#45A29E" }}
                      >
                        {creator.name}
                      </Link>
                    ) : (
                      <Link
                        to={"/person/" + creator.id}
                        style={{ textDecoration: "none", color: "#45A29E" }}
                      >
                        {creator.name},{" "}
                      </Link>
                    )
                  )}
                </Typography>
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {tvReviews.length > 0 ? (
              <>
                <Typography variant="h6">
                  A review by {tvReviews[0].author}
                </Typography>
                <Typography variant="body2" gutterBottom paragraph>
                  Written by{" "}
                  <span style={{ fontWeight: "500" }}>
                    {tvReviews[0].author}
                  </span>{" "}
                  on {reviewDate}
                </Typography>
                <Typography gutterBottom paragraph>
                  {tvReviews[0].content.substr(0, 1000)}...
                  <Link
                    to={"/review/" + tvReviews[0].id}
                    style={{ color: "white" }}
                  >
                    Read more
                  </Link>
                </Typography>
                <Typography variant="h6" component="p">
                  <Link
                    to={"/reviews"}
                    style={{ color: "#45A29E", textDecoration: "none" }}
                  >
                    All Reviews
                  </Link>
                </Typography>
              </>
            ) : (
              <div>No reviews</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h6" gutterBottom>
              Languages:
              <Typography variant="body2">
                {spoken_languages.map((lang) => lang.name)}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Production Companies:
              <Typography variant="body2">
                {production_companies.map((comp, index) =>
                  index === production_companies.length - 1
                    ? comp.name
                    : `${comp.name}, `
                )}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Release Date:
              <Typography variant="body2">{releaseDate}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Seasons:
              <Typography variant="body2">{number_of_seasons}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Episodes:
              <Typography variant="body2">{number_of_episodes}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Status:
              <Typography variant="body2">{status}</Typography>
            </Typography>
          </TabPanel>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ margin: "50px", border: "none" }}
      >
        <ReactPlayer url={tvVideo} width="100%" height="100%" controls />
      </Modal>
    </>
  );
};

export default OverviewTV;
