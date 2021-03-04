import React from "react";
import { Grid } from "@material-ui/core";
import SingleItem from "./SingleItem";
import { useGlobalContext } from "../../utils/context";

const SearchContent = () => {
  const { searchItems } = useGlobalContext();

  return (
    <Grid container component="section" spacing={4}>
      {searchItems.map((item) => {
        return (
          <Grid item xs={3} component="article">
            <SingleItem {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchContent;
