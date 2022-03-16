import React from "react";
import { Box, Container, List } from "@mui/material";

function Footer() {
  return (
    <div style={{ position: "relative", marginTop: "40px" }}>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          color: "black",
          width: "100%",
        }}
      >
        <Box bgcolor="text.secondary" color="white">
          <Container maxWidth="lg"></Container>
          <List>Footer</List>
        </Box>
      </footer>
    </div>
  );
}

export default Footer;
