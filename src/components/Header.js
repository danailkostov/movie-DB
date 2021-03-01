import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Paper,
  InputBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useGlobalContext } from "../utils/context";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { setSearchQuery } = useGlobalContext();
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(value);
  };

  return (
    <AppBar>
      <Toolbar
        style={{ display: "flex", justifyContent: "space-between" }}
        component="nav"
      >
        <Paper
          component="form"
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search for movie, tv or person"
            inputProps={{ "aria-label": "search for movie, tv or person" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // this is if i want to make API request on every change not just on submit
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginRight: "20px" }}
          >
            Login
          </Button>
          <Button color="secondary" variant="contained">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
