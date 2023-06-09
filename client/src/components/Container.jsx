import { Box } from "@mui/material";
import React from "react";

const Container = ({ children }) => {
  return <Box sx={{ width: "95%", margin: "0 auto" }}>{children}</Box>;
};

export default Container;
