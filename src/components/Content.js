import {
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../utils/context";
import InitContent from "./initContent/InitContent";
import SearchContent from "./search/SearchContent";

const Content = () => {
  const { searchItems, isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <Typography align="center" style={{ marginTop: "100px" }}>
        <CircularProgress size={160} />
      </Typography>
    );
  } else if (!searchItems) {
    return (
      <Container component="main">
        <InitContent />
      </Container>
    );
  }

  return (
    <Container component="main" style={{ marginTop: "50px" }}>
      <SearchContent />
    </Container>
  );
};

export default Content;
