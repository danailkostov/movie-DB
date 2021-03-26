import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useGlobalContext } from "../../utils/context";
import { fetchVideo } from "../../services/services";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Modal from "@material-ui/core/Modal";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import noImg from "../../images/no-cover.png";

const useStyles = makeStyles((theme) => ({
  slide: {
    position: "relative",
    transition: "transform 300ms",
    height: "300px",
    width: "20vw",
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
      width: "25vw",
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
  const { upcomingList, posterUrl } = useGlobalContext();
  const [test, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (trailer) => {
    setOpen(true);
    setCurrentVideo(trailer);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <div style={{ paddingBottom: "10px" }}>
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
        {test.map((video, index) => {
          const { backdrop_path, title } = upcomingList[index];
          return (
            <>
              <div className={classes.slide}>
                <Typography align="center">{title}</Typography>
                <Button
                  color="inherit"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => handleOpen(video)}
                >
                  <PlayCircleOutlineIcon style={{ fontSize: "70px" }} />
                </Button>
                <img
                  src={backdrop_path ? `${posterUrl}${backdrop_path}` : noImg}
                  alt={title}
                  style={{ width: "100%", height: "100%", margin: "0 auto" }}
                />
              </div>
              <Modal open={open} onClose={handleClose}>
                <ReactPlayer
                  url={currentVideo}
                  width="80%"
                  height="100%"
                  controls
                  style={{ margin: "0 auto" }}
                />
              </Modal>
            </>
          );
        })}
      </Slider>
    </div>
  );
};

export default Upcoming;
