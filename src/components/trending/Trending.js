import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Toggle from "./Toggle";

const Trending = () => {
  return (
    <>
      <Toggle />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{ backgroundColor: "white", width: "100%", height: "300px" }}
          >
            Test
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Trending;
