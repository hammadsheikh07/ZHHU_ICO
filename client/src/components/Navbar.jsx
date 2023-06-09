import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#121212", boxShadow: "none" }}
    >
      <Toolbar sx={{ borderBottom: "1px solid #FFFF00" }}>
        <Button variant="contained" sx={{ ml: "auto", fontWeight: "bold" }}>
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
