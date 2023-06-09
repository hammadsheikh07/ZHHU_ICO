import { Box, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        borderTop: "1px solid white",
        py: 5,
      }}
    >
      <Typography variant="p">All rights reserved © 2023</Typography>
    </Box>
  );
};

export default Footer;
