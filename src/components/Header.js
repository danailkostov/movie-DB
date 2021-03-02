import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Paper,
  InputBase,
  Container,
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
    backgroundColor: "black",
    border: '1px solid white'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'white'
  },
  iconButton: {
    padding: 10,
    color: 'white',
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
    <AppBar position="static" style={{ backgroundColor: "black", padding: '10px' }}>
      <Container>
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
          <Button color="inherit" variant="outlined">
            Sign in
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
