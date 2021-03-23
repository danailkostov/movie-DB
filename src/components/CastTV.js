import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const CastTV = ({ tvCast, id, title }) => {
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
        </Typography>
      </Grid>
      {tvCast.map((person, index) => {
        const { profile_path, name, character, id } = person;
        return index < 6 ? (
          <Grid item xs={6} sm={4} md={2}>
            <Link to={"/person/" + id}>
              <img
                src={`${posterUrl}${profile_path}`}
                alt={name}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
            </Link>
            <Typography component="h1" variant="h6">
              <Link
                to={"/person/" + id}
                style={{ color: "#45A29E", textDecoration: "none" }}
              >
                {name}
              </Link>
            </Typography>
            <Typography component="p" variant="p">
              {character}
            </Typography>
          </Grid>
        ) : null;
      })}
      <Grid item xs={12}>
        <Typography variant="body1" component="p" align="right">
          <Link
            to={`/tv/${id}-${title}/cast`}
            style={{ color: "#45A29E", textDecoration: "none" }}
          >
            Full Cast & Crew{" "}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CastTV;
