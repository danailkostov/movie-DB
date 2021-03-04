import React from "react";
import { Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const NowPlaying = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        paragraph
        style={{
          fontWeight: "500",
          paddingBottom: "10px",
        }}
      >
        What's popular
      </Typography>
      <Carousel />
    </>
  );
};

export default NowPlaying;
