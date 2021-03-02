import {
  Grid,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../utils/context";
import SingleItem from "./SingleItem";
import InitContent from "./InitContent";

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
      <Grid container component="section" spacing={4}>
        {searchItems.map((item) => {
          return (
            <Grid item xs={3} component="article">
              <SingleItem {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Content;
