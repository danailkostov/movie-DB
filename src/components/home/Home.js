import { Container, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../../utils/context";
import InitContent from "./InitContent";

const Content = () => {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <Typography align="center" style={{ marginTop: "100px" }}>
        <CircularProgress size={160} />
      </Typography>
    );
  }
  return (
    <Container component="main" disableGutters>
      <InitContent />
    </Container>
  );
};

export default Content;
