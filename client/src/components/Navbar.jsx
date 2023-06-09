import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { WalletContext } from "../WalletContext";
function Navbar() {
  const { connectWallet, walletConnected } = useContext(WalletContext);
  const handleConnect = () => {
    if (!walletConnected) connectWallet();
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#121212", boxShadow: "none" }}
    >
      <Toolbar sx={{ borderBottom: "1px solid #FFFF00" }}>
        <Button
          variant="contained"
          sx={{ ml: "auto", fontWeight: "bold" }}
          onClick={() => handleConnect()}
        >
          {!walletConnected ? "Connect Wallet" : "Wallet Connected"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
