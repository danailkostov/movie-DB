import React from "react";
import { Container } from "@material-ui/core";
import NowPlaying from "./NowPlaying";

const InitContent = () => {
  return (
    <Container style={{ marginTop: "50px" }} maxWidth="lg" component="section">
      <NowPlaying />
    </Container>
  );
};

export default InitContent;
