import React from "react";
import { Container } from "@material-ui/core";
import NowPlaying from "../now/NowPlaying";
import Trending from "../trending/Trending";

const InitContent = () => {
  return (
    <Container style={{ marginTop: "50px" }} maxWidth="lg" component="section">
      <NowPlaying />
      <Trending />
    </Container>
  );
};

export default InitContent;
