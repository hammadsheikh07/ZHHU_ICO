import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Invalid = () => {
  const targetString =
    "Uh oh! You seem to have ended up at an invalid route. We're redirecting you back to home page.";
  const [currentString, setCurrentString] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navigateState, setNavigateState] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex + 1);
      setCurrentString(targetString.substring(0, currentIndex));
    }, 50);

    return () => {
      if (currentIndex == targetString.length) {
        setTimeout(() => {
          setNavigateState(true);
        }, 1500);
      }
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <>
      {navigateState && <Navigate to="/" />}
      <Box
        sx={{
          width: "60%",
          margin: "0 auto",
          minHeight: "91vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "white", textAlign: "center" }}>
          {currentString}
        </Typography>
      </Box>
    </>
  );
};

export default Invalid;
