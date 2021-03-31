import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useGlobalContext } from "../../../utils/context";
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
    backgroundColor: "white",
    zIndex: "1",
    [theme.breakpoints.only("xs")]: {
      marginTop: "5px",
    },
  },
  typo: {
    fontWeight: "500",
  },
}));

const Toggle = ({ text, prev, next }) => {
  const classes = useStyles();
  const { setIsDay, isDay, isTV, setIsTV } = useGlobalContext();
  const [alignment, setAlignment] = useState("prev");
  const [active, setActive] = useState(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (text === "Trending") {
      setIsDay(!isDay);
      setActive(!active);
    } else {
      setIsTV(!isTV);
      setActive(!active);
    }
  };
  return (
    <Box className={classes.box}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.typo}
      >
        {text}
      </Typography>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        className={classes.btnGrp}
      >
        <ToggleButton
          value="prev"
          disabled={active ? false : true}
          style={{ color: "black" }}
        >
          {prev}
        </ToggleButton>
        <ToggleButton
          value="next"
          disabled={active ? true : false}
          style={{ color: "black", width: "100%" }}
        >
          {next}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
