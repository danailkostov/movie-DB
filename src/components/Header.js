import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Paper,
  Container,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fetchSearch } from "../services/services";
import { useGlobalContext } from "../utils/context";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 400,
    backgroundColor: "black",
    border: "1px solid white",
    height: "50px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
    width: "100%",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  inputRoot: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "black",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "black",
    },
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

  const [searchItems, setSearchItems] = useState([]);

  const handleChange = async (event) => {
    if (event.target.value.length > 0) {
      setSearchItems(await fetchSearch(event.target.value, 1));
    } else {
      setSearchItems([]);
    }
    setValue(event.target.value);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "black", padding: "10px" }}
    >
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
            <Autocomplete
              freeSolo
              classes={classes}
              options={searchItems}
              renderOption={(option) => (
                <Typography>
                  <Link
                    href="#"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {option.title ? option.title : option.name}
                  </Link>
                </Typography>
              )}
              getOptionLabel={(option) =>
                option.title ? option.title : option.name
              }
              style={{ width: 300, borderRight: "none", borderLeft: "none" }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    placeholder="Search for movie, tv or person"
                    value={value}
                    onChange={(e) => handleChange(e)}
                  />
                );
              }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={handleSubmit}
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
