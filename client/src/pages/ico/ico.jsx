import React from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import SideBySide from "../../components/SideBySide";
import logo from "../../static/images/logo1500.png";

const Ico = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const leftComponent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h2" sx={{ my: 0.5, color: "white" }}>
          Welcome to Z<span style={{ color: "#FFFF00" }}>HH</span>U's
        </Typography>
        <Typography variant="h3" sx={{ color: "white" }}>
          NFT REWARD
        </Typography>
        <Typography variant="h6" sx={{ color: "white", mt: "20px" }}>
          Claim your NFT rewards
        </Typography>
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", marginTop: "20px" }}
      >
        <Input
          sx={{ color: "#FFFF00", textAlign: "center" }}
          placeholder="AMOUNT"
          type="text"
          label="Input"
          variant="outlined"
          fullWidth
        />
        <Button
          sx={{ mt: 2, fontWeight: "bold" }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
  const rightComponent = (
    <>
      <img style={{ width: "50%" }} src={logo} />
    </>
  );

  return (
    <Box
      sx={{
        minHeight: "91vh",
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

export default Ico;
