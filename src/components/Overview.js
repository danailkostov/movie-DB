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
import { useGlobalContext } from "../utils/context";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import StarIcon from "@material-ui/icons/Star";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import noImg from "../images/no-cover.png";
import SingleReview from "../components/SingleReview";
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

const Overview = ({
  movieDetails,
  directors,
  writers,
  reviews,
  video,
  cert,
}) => {
  const classes = useStyles();
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
    spoken_languages,
    production_companies,
    revenue,
    status,
    id,
  } = movieDetails;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const premiereDate = moment(release_date, "YYYY-MM-DD").year();
  const releaseDate = moment(release_date, "YYYY-MM-DD").format("MMMM Do YYYY");
  const reviewDate =
    reviews.length > 0
      ? moment(reviews[0].created_at, "YYYY-MM-DD").format("MMMM Do[,] YYYY")
      : null;
  const duration = moment
    .utc(moment.duration(runtime, "minutes").asMilliseconds())
    .format("H[h] m[min]");

  const allGenres = genres.map((item, index) =>
    index === genres.length - 1 ? (
      <Link
        to={"/movies/" + item.id}
        style={{ color: "#45A29E", textDecoration: "none" }}
      >
        {" "}
        {item.name} |
      </Link>
    ) : (
      <Link
        to={"/movies/" + item.id}
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
          {video && (
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
            src={poster_path ? `${posterUrl}${poster_path}` : noImg}
            alt={title}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ alignSelf: "start" }}>
          <Typography variant="h4" component="h1" className={classes.headline}>
            {title}
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
            {premiereDate ? `${premiereDate} |` : null}{" "}
            {allGenres.length > 0 ? allGenres : null}{" "}
            {runtime > 0 ? `${duration} |` : null} {cert}
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
            <Typography variant="h6" component="h2">
              Directors
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {directors.map((director, index) =>
                index === directors.length - 1 ? (
                  <Link
                    to={"/person/" + director.id}
                    style={{ textDecoration: "none", color: "#45A29E" }}
                  >
                    {director.name}
                  </Link>
                ) : (
                  <Link
                    to={"/person/" + director.id}
                    style={{ textDecoration: "none", color: "#45A29E" }}
                  >
                    {director.name},{" "}
                  </Link>
                )
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
                index === writers.length - 1 ? (
                  <Link
                    to={"/person/" + writer.id}
                    style={{ textDecoration: "none", color: "#45A29E" }}
                  >
                    {writer.name}
                  </Link>
                ) : (
                  <Link
                    to={"/person/" + writer.id}
                    style={{ textDecoration: "none", color: "#45A29E" }}
                  >
                    {writer.name},{" "}
                  </Link>
                )
              )}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {reviews.length > 0 ? (
              <>
                <Typography variant="h6">
                  A review by {reviews[0].author}
                </Typography>
                <Typography variant="body2" gutterBottom paragraph>
                  Written by{" "}
                  <span style={{ fontWeight: "500" }}>{reviews[0].author}</span>{" "}
                  on {reviewDate}
                </Typography>
                <Typography gutterBottom paragraph>
                  {reviews[0].content.substr(0, 1000)}...
                  <Button
                    onClick={() => setIsReviewOpen(true)}
                    style={{ color: "white" }}
                  >
                    Read more
                  </Button>
                </Typography>
                <Typography variant="h6" component="p">
                  <Link
                    to={`/movie/${id}-${title}/reviews`}
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
              Budget:{" "}
              <Typography variant="body2">
                {budget === 0 ? "-" : `${currency.format(budget)}`}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Languages:
              <Typography variant="body2">
                {spoken_languages.length > 0
                  ? spoken_languages.map((lang) => lang.name)
                  : "-"}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Production Companies:
              <Typography variant="body2">
                {production_companies.length > 0
                  ? production_companies.map((comp, index) =>
                      index === production_companies.length - 1
                        ? comp.name
                        : `${comp.name}, `
                    )
                  : "-"}
                {}
              </Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Release Date:
              <Typography variant="body2">{releaseDate}</Typography>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Revenue:
              <Typography variant="body2">
                {revenue === 0 ? "-" : `${currency.format(revenue)}`}
              </Typography>
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
        <ReactPlayer url={video} width="100%" height="100%" controls />
      </Modal>
      <Modal open={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
        <SingleReview id={reviews[0].id} />
      </Modal>
    </>
  );
};

export default Overview;
