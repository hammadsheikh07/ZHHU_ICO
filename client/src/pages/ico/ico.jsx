import React from "react";
import { Box, Button, Input } from "@mui/material";

const Ico = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
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
          sx={{ color: "#FFFF00", textAlign: "right" }}
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
};

export default Ico;
