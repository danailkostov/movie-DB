import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";

const Cast = ({ movieCast }) => {
  const posterUrl = "https://image.tmdb.org/t/p/w185";

  return (
    <Grid container spacing={2} style={{ marginTop: "30px" }}>
      <Grid item xs={12}>
        <Divider light={true} style={{ backgroundColor: "#45A29E" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          component="p"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Top Billed Cast
          <Typography variant="body1" component="p">
            Full Cast & Crew
          </Typography>
        </Typography>
      </Grid>
      {movieCast.map((person, index) => {
        const { profile_path, name, character } = person;
        return index < 6 ? (
          <Grid item xs={2}>
            <img
              src={`${posterUrl}${profile_path}`}
              alt={name}
              style={{
                width: "100%",
                borderRadius: "5px",
              }}
            />
            <Typography component="h1" variant="h6">
              {name}
            </Typography>
            <Typography component="p" variant="p">
              {character}
            </Typography>
          </Grid>
        ) : null;
      })}
    </Grid>
  );
};

export default Cast;
