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

const Toggle = ({ text, prev, next }) => {
  const classes = useStyles();
  const { setIsDay, isDay, isTV, setIsTV } = useGlobalContext();
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (text === "Trending") {
      setIsDay(!isDay);
    } else {
      setIsTV(!isTV);
    }
    // setIsDay(!isDay);
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
        {text}
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
          {prev}
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
          style={{ color: "white" }}
        >
          {next}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
