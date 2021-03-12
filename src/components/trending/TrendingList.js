import React, { useState } from "react";
import Slider from "react-slick";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  slide: {
    transition: "transform 300ms",
    height: "400px",
    width: "12vw",
    margin: "0 auto",
    [theme.breakpoints.only("xs")]: {
      width: "70vw",
    },
    [theme.breakpoints.only("sm")]: {
      width: "40vw",
    },
    [theme.breakpoints.only("md")]: {
      width: "28vw",
    },
    [theme.breakpoints.only("lg")]: {
      width: "14vw",
    },
  },
  arrow: {
    backgroundColor: "transparent",
    position: "absolute",
    cursor: "pointer",
    zIndex: "10",
    border: "1px solid white",
    paddingTop: "5px",
  },
  next: {
    right: "0%",
    top: "50%",
  },
  prev: {
    left: "0%",
    top: "50%",
  },
  image: {
    width: "100%",
    margin: "0 auto",
    height: "80%",
  },
}));

const TrendingList = ({ movies, imageUrl }) => {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  const NextArrow = ({ onClick }) => {
    return (
      <div className={`${classes.arrow} ${classes.next}`} onClick={onClick}>
        <NavigateNextIcon fontSize="large" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className={`${classes.arrow} ${classes.prev}`} onClick={onClick}>
        <NavigateBeforeIcon fontSize="large" />
      </div>
    );
  };

  const settings = {
    accessibility: true,
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
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
      <Slider {...settings}>
        {movies.map((movie) => {
          const {
            poster_path,
            title,
            name,
            release_date,
            first_air_date,
          } = movie;
          return (
            <>
              <div className={classes.slide}>
                <img
                  src={`${imageUrl}${poster_path}`}
                  alt={title ? title : name}
                  className={classes.image}
                />
                <Typography variant="subtitle1" component="h1" align="center">
                  {title ? title : name}
                </Typography>
                <Typography variant="subtitle1" component="h1" align="center">
                  {release_date ? release_date : first_air_date}
                </Typography>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
};

export default TrendingList;
