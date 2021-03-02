import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@material-ui/core";
import React from "react";
import noPosterImg from "../images/no-cover.png";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  media: {
    height: 400,
  },
});

const SingleItem = ({
  poster_path,
  title,
  name,
  profile_path,
  release_date,
  first_air_date,
  known_for_department,
}) => {
  const classes = useStyles();
  const posterUrl = "https://image.tmdb.org/t/p/w342";
  const releaseYear = moment(release_date, "YYYY-MM-DD").year();
  const firstAirDate = moment(first_air_date, "YYYY-MM-DD").year();

  return (
    <Card className={classes.root}>
      <Link
        href="#"
        target="_blank"
      >
        <CardMedia
          className={classes.media}
          image={
            poster_path
              ? `${posterUrl}${poster_path}`
              : profile_path
              ? `${posterUrl}${profile_path}`
              : noPosterImg
          }
          title="Contemplative Reptile"
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="h2">
          {title ? title.toUpperCase() : name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {releaseYear
            ? releaseYear
            : firstAirDate
            ? firstAirDate
            : known_for_department}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleItem;
