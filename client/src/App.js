import Home from "./pages/home/home";
import Container from "./components/Container";
import theme from "./static/theme/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invalid from "./pages/invalid";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Invalid />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
