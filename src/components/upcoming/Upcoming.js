import { Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../../utils/context";
import { fetchVideo } from "../../services/services";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  slide: {
    transition: "transform 300ms",
    height: "400px",
    width: "500px",
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
}));

const Upcoming = () => {
  const classes = useStyles();
  const { upcomingList } = useGlobalContext();
  const [test, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    upcomingList.map(async (movie) => {
      const { id } = movie;
      const movieVideo = await fetchVideo(id);
      setTest((state) => [...state, movieVideo]);
    });
    setIsLoading(false);
  }, []);

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
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: 0,
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
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{
          fontWeight: "500",
          margin: "35px auto",
        }}
      >
        Coming soon to theaters
      </Typography>
      <Slider {...settings}>
        {test.map((video) => {
          return (
            <div className={classes.slide}>
              <Link href={video} target='_blank'>
                <ReactPlayer
                  light={true}
                  url={video}
                  width="80%"
                  height="100%"
                  controls
                  style={{ margin: "0 auto" }}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Upcoming;
