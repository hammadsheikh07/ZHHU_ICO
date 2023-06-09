import React from "react";
import { useContext } from "react";
import { WalletContext } from "../WalletContext";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import logo from "../static/images/logo1500.png";
import { Link } from "react-router-dom";

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
        <Box>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0",
              padding: "0",
              textDecoration: "none",
            }}
          >
            <img src={logo} style={{ width: "30px" }} />
          </Link>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Link to="/pre-nft-drop">
            <Button sx={{ fontWeight: "bold", mr: 1 }}>Pre nft drop</Button>
          </Link>
          <Link to="/ico">
            <Button sx={{ fontWeight: "bold", mr: 1 }}>Claim Token(s)</Button>
          </Link>
          <Link to="/reward-nft">
            <Button sx={{ fontWeight: "bold", mr: 1 }}>Reward nft(s)</Button>
          </Link>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            color={walletConnected ? "success" : "primary"}
            sx={{
              ml: "auto",
              fontWeight: "bold",
              color: walletConnected ? "white" : "black",
            }}
            onClick={() => handleConnect()}
          >
            {!walletConnected ? "Connect Wallet" : "Wallet Connected"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
