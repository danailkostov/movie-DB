import { Grid, Divider, Typography } from "@material-ui/core";
import React from "react";

const posterUrl = "https://image.tmdb.org/t/p/w300";

const Recommended = ({ recMovies }) => {
  return (
    <Grid container style={{ marginTop: "30px" }} spacing={2}>
      <Grid item xs={12}>
        <Divider light={true} style={{ backgroundColor: "#45A29E" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          component="h1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Recommendations
          <Typography>All Recomendations</Typography>
        </Typography>
      </Grid>
      {recMovies.map((movie, index) => {
        const { backdrop_path, vote_average, title } = movie;
        return index < 4 ? (
          <Grid item xs={3}>
            <img
              src={`${posterUrl}${backdrop_path}`}
              alt={title}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <Typography
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{title}</span>
              <span>{vote_average}</span>
            </Typography>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
};

export default Recommended;
