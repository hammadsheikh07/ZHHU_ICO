import React, { useState } from "react";
import SideBySide from "../../components/SideBySide";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../static/images/logo1500.png";

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(19);

  const leftComponent = (
    <>
      <Typography variant="h2" sx={{ my: 0.5, color: "white" }}>
        Welcome to ZHHU!
      </Typography>
      <Typography variant="h5" sx={{ my: 0.5, color: "white" }}>
        Its an NFT collection for developers in Crypto.
      </Typography>
      <Typography variant="h5" sx={{ my: 0.5, color: "white" }}>
        <Typography variant="span" sx={{ color: "red" }}>
          {totalMinted}/20
        </Typography>{" "}
        have been minted
      </Typography>
      <Button
        variant="contained"
        sx={{ my: 0.5, fontWeight: "bold" }}
      >
        Connect Wallet
      </Button>
    </>
  );

  const rightComponent = (
    <>
      <img style={{ width: "50%" }} src={logo} />
    </>
  );
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SideBySide
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        leftStyles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        rightStyles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      ;
    </Box>
  );
};

export default Home;
