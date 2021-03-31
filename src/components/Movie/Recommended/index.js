import { Grid, Divider, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import NoPoster from "../../../images/no-cover.png";

const posterUrl = "https://image.tmdb.org/t/p/w300";

const Recommended = ({ recMovies }) => {
  return (
    <Grid container style={{ marginTop: "10px" }} spacing={2}>
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
        </Typography>
      </Grid>
      {recMovies.map((movie, index) => {
        const { backdrop_path, vote_average, title, id } = movie;
        return index < 4 ? (
          <Grid item xs={12} sm={6} md={3}>
            <Link to={"/movie/" + id}>
              <img
                src={backdrop_path ? `${posterUrl}${backdrop_path}` : NoPoster}
                alt={title}
                style={{ width: "100%", borderRadius: "5px", height: "200px" }}
              />
            </Link>
            <Typography
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link
                to={"/movie/" + id}
                style={{ color: "#45A29E", textDecoration: "none" }}
              >
                {title.length > 29 ? title.substr(0, 30) + "..." : title}
              </Link>
              <span>
                {vote_average}{" "}
                <StarIcon
                  style={{
                    color: "yellow",
                  }}
                  fontSize="inherit"
                />
              </span>
            </Typography>
          </Grid>
        ) : null;
      })}
      {/* <Grid item xs={12}>
        <Typography align="right" variant="body1" component="p">
          <Link
            to={"/recommendations"}
            style={{ color: "#45A29E", textDecoration: "none" }}
          >
            All Recomendations
          </Link>
        </Typography>
      </Grid> */}
    </Grid>
  );
};

export default Recommended;
