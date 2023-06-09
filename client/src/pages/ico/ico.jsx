import React from "react";
import { Box, Button, Input } from "@mui/material";
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
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <Input
          sx={{ color: "#FFFF00", textAlign: "center" }}
          placeholder="Amount"
          type="text"
          label="Input"
          variant="outlined"
          fullWidth
        />
        <Button
          sx={{ mt: 5, fontWeight: "bold" }}
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
