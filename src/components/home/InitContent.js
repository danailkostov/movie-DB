import React from "react";
import { Container } from "@material-ui/core";
import NowPlaying from "../NowPlaying";
import Trending from "../Trendings";
import Upcoming from "../Upcoming";

const InitContent = () => {
  return (
    <Container style={{ marginTop: "50px" }} maxWidth="lg" component="section">
      <NowPlaying />
      <Trending />
      <Upcoming />
    </Container>
  );
};

export default InitContent;
