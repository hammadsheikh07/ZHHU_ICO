import React from "react";
import { useContext } from "react";
import { WalletContext } from "../WalletContext";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

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
        <Box sx={{ ml: "auto" }}>
          <Button variant="contained" sx={{ fontWeight: "bold", mr: 1 }}>
            Claim Tokens
          </Button>
          <Button
            variant="contained"
            color={walletConnected ? "success" : "primary"}
            sx={{ ml: "auto", fontWeight: "bold", color: "white" }}
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

//pre nft drop
//claim ico tokens
//reward nfts
//whitelist
