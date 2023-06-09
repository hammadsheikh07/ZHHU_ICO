import { Box, Button, Grid } from "@mui/material";
import React from "react";

const SideBySide = ({
  leftComponent,
  rightComponent,
  gridStyles,
  leftStyles,
  rightStyles,
}) => {
  return (
    <Box>
      <Grid container sx={gridStyles}>
        <Grid item xs={12} md={7} sx={leftStyles}>
          {leftComponent}
        </Grid>
        <Grid item xs={12} md={5} sx={rightStyles}>
          {rightComponent}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SideBySide;
