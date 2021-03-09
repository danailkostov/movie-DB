import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Paper,
  MenuItem,
  FormControl,
  Select,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useGlobalContext } from "../../utils/context";
import Autosuggest from "./Autosuggest";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      gridColumn: "1/3",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
  menuIcon: {
    padding: 10,
    color: "white",
    [theme.breakpoints.only("xs")]: {
      order: "-1",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      display: "grid",
      gridTemplateColumns: "50% 50%",
    },
  },
  selects: {
    width: "12%",
    [theme.breakpoints.only("xs")]: {
      width: "40%",
    },
  },
  signBtn: {
    [theme.breakpoints.only("xs")]: {
      order: "-1",
    },
  },
  appBar: {
    backgroundColor: "black",
    padding: "10px",
  },
  menuBar: {
    [theme.breakpoints.only("xs")]: {
      order: "-1",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { setSearchQuery } = useGlobalContext();

  const [searchType, setSearchType] = useState(10);

  const handleType = (event) => {
    setSearchType(event.target.value);
  };

  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(value);
  };

  return (
    <AppBar position="static" className={classes.appBar} component="nav">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.menuIcon} aria-label="menu">
          <Menu />
        </IconButton>
        <Paper
          component="form"
          className={classes.paper}
          onSubmit={handleSubmit}
        >
          <Hidden only={["xs", "sm"]}>
            <FormControl className={classes.selects}>
              <Select
                value={searchType}
                onChange={handleType}
                variant="outlined"
              >
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>Movies</MenuItem>
                <MenuItem value={30}>TV Shows</MenuItem>
                <MenuItem value={40}>People</MenuItem>
              </Select>
            </FormControl>
          </Hidden>
          <Autosuggest value={value} setValue={setValue} />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={handleSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button color="inherit" className={classes.signBtn}>
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
