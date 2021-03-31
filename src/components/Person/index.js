import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchPerson, fetchKnownFor } from "../../services/services";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import noImg from "../../images/no-cover.png";
const useStyles = makeStyles((theme) => ({
  bio: {
    paddingLeft: "30px",
    alignSelf: "center",
    [theme.breakpoints.only("sm")]: {
      paddingLeft: "0px",
    },
  },
}));

const SinglePerson = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [knownFor, setKnownFor] = useState({});
  const {
    name,
    profile_path,
    biography,
    known_for_department,
    gender,
    birthday,
    place_of_birth,
  } = person;

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setPerson(await fetchPerson(id));
      setKnownFor(await fetchKnownFor(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading person...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w300${profile_path}`;
  return (
    <Container maxWidth="lg" component="section">
      <Grid container style={{ margin: "30px 0px" }}>
        <Grid item xs={12} sm={3}>
          <img
            src={profile_path ? posterUrl : noImg}
            alt={name}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </Grid>
        <Grid item xs={12} md={8} className={classes.bio}>
          <Typography variant="h4" gutterBottom paragraph>
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom paragraph>
            Biography :
          </Typography>
          <Typography variant="body1" gutterBottom paragraph>
            {biography ? biography : `We don't have a biography for ${name}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom paragraph>
            Personal Info
          </Typography>
          <Typography variant="subtitle2">Department</Typography>
          <Typography variant="body1" paragraph>
            {known_for_department}
          </Typography>
          <Typography variant="subtitle2">Gender</Typography>
          <Typography variant="body1" paragraph>
            {gender === 1 ? "Female" : "Male"}
          </Typography>
          <Typography variant="subtitle2">Birthday</Typography>
          <Typography variant="body1" paragraph>
            {birthday ? birthday : "-"}
          </Typography>
          <Typography variant="subtitle2">Place of Birth</Typography>
          <Typography variant="body1" paragraph>
            {place_of_birth ? place_of_birth : "-"}
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#45A29E" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Known For</Typography>
          </Grid>
          {known_for_department === "Acting"
            ? knownFor.sortCastMovies.map((movie) => {
                const { title, name, poster_path, id, media_type } = movie;
                const knownPosterUrl = `https://image.tmdb.org/t/p/w154${poster_path}`;
                return (
                  <Grid item xs={6} sm={4} md={2}>
                    <Link to={`/${media_type}/${id}`}>
                      <img
                        src={knownPosterUrl}
                        alt={title ? title : name}
                        style={{ borderRadius: "5px", width: "100%" }}
                      />
                    </Link>
                    <Link
                      to={`/${media_type}/${id}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <Typography align="center" variant="body2">
                        {title ? title : name}
                      </Typography>
                    </Link>
                  </Grid>
                );
              })
            : knownFor.sortCrewMovies.map((movie) => {
                const { title, name, poster_path, id, media_type } = movie;
                const knownPosterUrl = `https://image.tmdb.org/t/p/w154${poster_path}`;
                return (
                  <Grid item xs={6} sm={4} md={2}>
                    <Link to={`/${media_type}/${id}`}>
                      <img
                        src={knownPosterUrl}
                        alt={title ? title : name}
                        style={{ borderRadius: "5px", width: "100%" }}
                      />
                    </Link>
                    <Link
                      to={`/${media_type}/${id}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <Typography align="center" variant="body2">
                        {title ? title : name}
                      </Typography>
                    </Link>
                  </Grid>
                );
              })}
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#45A29E" }} />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ margin: "10px 0px" }}>
          {knownFor.sortProductionsByYear.map((item) => {
            const { department, productions } = item[0];
            console.log(department);
            return (
              <>
                <Accordion
                  style={{
                    backgroundColor: "#45A29E",
                    color: "#1f2833",
                    border: "1px solid #45A29E",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> {department}</Typography>
                  </AccordionSummary>
                  {productions.map((production) => {
                    const { title, id, character, job, date } = production;
                    return (
                      <>
                        <AccordionDetails
                          style={{
                            backgroundColor: "#1f2833",
                            color: "#45A29E",
                          }}
                        >
                          <Box
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid white",
                            }}
                          >
                            <Typography variant="subtitle2" gutterBottom>
                              <Link
                                to={"/movie/" + id}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {title}
                              </Link>
                              <Typography variant="body2">
                                {character ? `as ${character}` : `as ${job}`}
                              </Typography>
                            </Typography>
                            <Typography variant="body2">
                              {date
                                ? moment(date, "YYYY-MM-DD").year()
                                : "in production"}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </>
                    );
                  })}
                </Accordion>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePerson;
