import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPopularPeople } from "../services/services";
const posterUrl = "https://image.tmdb.org/t/p/w300";

const PopularPeople = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setPeople(await fetchPopularPeople());
      setIsLoading(false);
    };
    fetchAPI();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Most Popular People
          </Typography>
        </Grid>
        {people.map((person) => {
          const { profile_path, name, id } = person;
          return (
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                style={{
                  backgroundColor: "rgb(31, 40, 51)",
                  padding: "10px",
                }}
                elevation="5"
              >
                <Link to={`/person/${id}`}>
                  <img
                    src={`${posterUrl}${profile_path}`}
                    alt={name}
                    style={{
                      width: "100%",
                    }}
                  />
                </Link>
                <Link
                  to={`/person/${id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6">{name}</Typography>
                </Link>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default PopularPeople;
