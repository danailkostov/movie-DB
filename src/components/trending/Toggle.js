import React from "react";
import { Box, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useGlobalContext } from "../../utils/context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-around",
    margin: "35px auto",
    [theme.breakpoints.only("xs")]: {
      display: "grid",
    },
  },
  btnGrp: {
    border: "1px solid white",
    zIndex: "1",
    [theme.breakpoints.only("xs")]: {
      marginTop: "5px",
    },
  },
}));

const Toggle = () => {
  const classes = useStyles();
  const { setIsDay, isDay } = useGlobalContext();
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setIsDay(!isDay);
  };
  return (
    <Box className={classes.box}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{
          fontWeight: "500",
        }}
      >
        Trending
      </Typography>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className={classes.btnGrp}
      >
        <ToggleButton
          value="left"
          aria-label="left aligned"
          style={{ color: "white" }}
        >
          Today
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
          style={{ color: "white" }}
        >
          This Week
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
