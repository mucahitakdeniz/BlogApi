import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Navbar  />
      <Container sx={{ minHeight: "75vh" }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
