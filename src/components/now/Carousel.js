import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../utils/context";
import Slider from "react-slick";
import { fetchVideo, fetchVideoTV } from "../../services/services";
import ReactPlayer from "react-player";
import {
  Typography,
  CircularProgress,
  Button,
  Box,
  // Link,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { makeStyles } from "@material-ui/core/styles";
import noImage from "../../images/no-cover.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    margin: "0 auto",
    [theme.breakpoints.between("xs", "md")]: {
      height: "400px",
    },
  },
  slide: {
    transform: "scale(0.7)",
    transition: "transform 300ms",
    opacity: ".5",
  },
  activeSlide: {
    transform: "scale(1.1)",
    opacity: "1",
  },
  arrow: {
    backgroundColor: "transparent",
    position: "absolute",
    cursor: "pointer",
    zIndex: "10",
  },
  arrowIcon: {
    transition: "color 300ms",
    "&:hover": {
      color: "#68edff",
    },
  },
  next: {
    right: "0%",
    top: "50%",
  },
  prev: {
    left: "0%",
    top: "50%",
  },
  desc: {
    margin: "35px auto",
    maxWidth: "500px",
  },
  btn: {
    margin: "10px",
  },
  player: {
    marginTop: "55px",
    height: "600px",
    [theme.breakpoints.between("xs", "md")]: {
      height: "400px",
    },
  },
  title: {
    marginTop: "35px",
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const {
    nowItems,
    posterUrl,
    genres,
    isMovies,
    tvs,
    setIsMovies,
    tvGenres,
  } = useGlobalContext();
  const currentItems = isMovies ? nowItems : tvs;
  const currentGenres = isMovies ? genres : tvGenres;
  const [isLoading, setIsLoading] = useState(true);
  const [currentId, setCurrentId] = useState(currentItems[0].id);
  const [video, setVideo] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [desc, setDesc] = useState(currentItems[0].overview);
  const [genresArray, setGenresArray] = useState(currentItems[0].genre_ids);
  const [movieTitle, setMovieTitle] = useState(nowItems[0].title);
  const [tvTitle, setTvTitle] = useState(tvs[0].original_name);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setVideo(
        isMovies ? await fetchVideo(currentId) : await fetchVideoTV(currentId)
      );
      setIsLoading(false);
    };
    fetchAPI();
  }, [currentId]);

  const NextArrow = ({ onClick }) => {
    return (
      <div className={`${classes.arrow} ${classes.next}`} onClick={onClick}>
        <NavigateNextIcon className={classes.arrowIcon} />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className={`${classes.arrow} ${classes.prev}`} onClick={onClick}>
        <NavigateBeforeIcon className={classes.arrowIcon} />
      </div>
    );
  };

  const settings = {
    accessibility: true,
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    afterChange: (current) => {
      setCurrentId(currentItems[current].id);
      setDesc(currentItems[current].overview);
      setGenresArray(currentItems[current].genre_ids);
      setMovieTitle(nowItems[current].title);
      setTvTitle(tvs[current].original_name);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Typography align="center" gutterBottom paragraph>
        <Button
          color="inherit"
          onClick={() => {
            setCurrentId(tvs[imageIndex].id);
            setDesc(tvs[imageIndex].overview);
            setGenresArray(tvs[imageIndex].genre_ids);
            setIsMovies(false);
          }}
        >
          On TV
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            setCurrentId(nowItems[imageIndex].id);
            setDesc(nowItems[imageIndex].overview);
            setGenresArray(nowItems[imageIndex].genre_ids);
            setIsMovies(true);
          }}
        >
          In Theaters
        </Button>
      </Typography>
      <Slider {...settings}>
        {currentItems.map((item, index) => {
          const { poster_path, title } = item;
          return (
            <div
              className={
                index === imageIndex ? classes.activeSlide : classes.slide
              }
            >
              <img
                src={poster_path ? `${posterUrl}${poster_path}` : noImage}
                alt={title}
                className={classes.image}
              />
            </div>
          );
        })}
      </Slider>
      <Typography
        align="center"
        className={classes.title}
        variant="h4"
        component="h1"
      >
        <Link
          to={isMovies ? "/movie/" + currentId : "/tv/" + currentId}
          style={{ color: "white", textDecoration: "none" }}
        >
          {isMovies ? movieTitle : tvTitle}
        </Link>
      </Typography>
      <Typography
        align="center"
        className={classes.desc}
        gutterBottom
        paragraph
      >
        {desc}
      </Typography>
      <Typography align="center">
        {currentGenres.map((genre) => {
          const { id, name } = genre;
          if (genresArray.includes(id)) {
            return (
              <Button
                color="inherit"
                variant="outlined"
                className={classes.btn}
                size="small"
              >
                <Link
                  to={"/search/genres/" + name}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {name}
                </Link>
              </Button>
            );
          }
          return null;
        })}
      </Typography>
      {isLoading ? (
        <Typography align="center" style={{ marginTop: "100px" }}>
          <CircularProgress size={160} />
        </Typography>
      ) : (
        <Box className={classes.player}>
          <ReactPlayer url={video} width="100%" height="100%" controls />
        </Box>
      )}
    </>
  );
};

export default Carousel;
