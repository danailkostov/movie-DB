import { Grid, Container } from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../utils/context";
import SingleItem from "./SingleItem";

const Content = () => {
  const { searchItems } = useGlobalContext();

  if (!searchItems) {
    return <main>Loading...</main>;
  }

  return (
    <Container component='main' style={{marginTop: '50px'}}>
      <Grid container component='section' spacing={4}>
        {searchItems.map((item) => {
          return (
            <Grid item xs={3} component='article'>
              <SingleItem {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Content;
