import { Container } from "@material-ui/core";
import React from "react";
import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <Container component='header'>
      <Navbar />
    </Container>
  );
};

export default Header;
