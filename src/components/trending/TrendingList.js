import React from "react";
import { Grid } from "@material-ui/core";

const TrendingList = ({ movies, imageUrl }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        const { poster_path } = movie;
        return (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            style={{
              height: "300px",
            }}
          >
            <img
              src={`${imageUrl}${poster_path}`}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TrendingList;
