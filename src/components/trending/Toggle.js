import React from "react";
import { Box, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useGlobalContext } from "../../utils/context";

const Toggle = () => {
  const { setIsDay, isDay } = useGlobalContext();
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setIsDay(!isDay);
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "35px auto",
      }}
    >
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
        style={{ border: "1px solid white" }}
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
