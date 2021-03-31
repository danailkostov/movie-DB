import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";
import PeopleIcon from "@material-ui/icons/People";
import {
  Typography,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    padding: 10,
    color: "white",
  },
  lists: {
    justifyContent: "space-evenly",
    backgroundColor: "#0B0C10",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  icon: {
    color: "white",
  },
}));

const Menu = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({ top: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.lists}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <TheatersIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h5">Movies</Typography>}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/movies/top-rated"
                style={{ textDecoration: "none", color: "white" }}
              >
                Top Rated Movies
              </Link>
            }
            inset
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/movies/popular"
                style={{ textDecoration: "none", color: "white" }}
              >
                Most Popular Movies
              </Link>
            }
            inset
          />
        </ListItem>
        {/* <ListItem button>
          <ListItemText primary="Browse Movies By Genre" inset />
        </ListItem> */}
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/movies/now-playing"
                style={{ textDecoration: "none", color: "white" }}
              >
                In Theaters
              </Link>
            }
            inset
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/movies/coming-soon"
                style={{ textDecoration: "none", color: "white" }}
              >
                Coming Soon
              </Link>
            }
            inset
          />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <TvIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h5">TV Shows</Typography>}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/tvs/top-rated"
                style={{ textDecoration: "none", color: "white" }}
              >
                Top Rated Shows
              </Link>
            }
            inset
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/tvs/popular"
                style={{ textDecoration: "none", color: "white" }}
              >
                Most Popular Shows
              </Link>
            }
            inset
          />
        </ListItem>
        {/* <ListItem button>
          <ListItemText primary="Browse TV Shows by Genre" inset />
        </ListItem> */}
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h5">Celebs</Typography>}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={
              <Link
                to="/people/popular"
                style={{ textDecoration: "none", color: "white" }}
              >
                Most Popular Celebs
              </Link>
            }
            inset
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            className={classes.menuIcon}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Menu;
