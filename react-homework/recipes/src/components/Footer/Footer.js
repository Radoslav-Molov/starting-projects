import React from "react";
import { Box, Container, List } from "@mui/material";

function Footer() {
  return (
    <footer
      style={{ position: "absolute", bottom: 0, width: "100%", color: "black" }}
    >
      <Box bgcolor="text.secondary" color="white">
        <Container maxWidth="lg"></Container>
        <List>Footer</List>
      </Box>
    </footer>
  );
}

export default Footer;
