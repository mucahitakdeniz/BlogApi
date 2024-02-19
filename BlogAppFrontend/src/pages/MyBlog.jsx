import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import Cards from "../component/Cards";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useBloggsFn from "../hooks/useBlogsFn";

const MyBlog = () => {
  const { blogsData } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);

  const cardsData = blogsData.filter((card) => card.author == currentUser);
  const navigate = useNavigate();
  const { getBlogs } = useBloggsFn();

  useEffect(() => {
      getBlogs();
  }, []);
  return (
    <Box sx={{ marginY: "2rem", justifyContent: "center" }}>
      {cardsData.length == 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="error" padding="4rem">
            Bu hesaba ait hiç blog yok
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/newblog")}
          >
            Blog Yaz
          </Button>
        </Box>
      ) : (
        <Cards blogsData={cardsData} />
      )}
    </Box>
  );
};

export default MyBlog;
