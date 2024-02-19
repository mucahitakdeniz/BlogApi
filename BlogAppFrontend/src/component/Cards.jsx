import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import useCardsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../helper/sweetaAlert";

const Cards = ({ blogsData }) => {
  const { likesBlog } = useCardsFn();
  const { currentUser, currentUserId,isActive } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleReadMore = (id) => {
    if (currentUser) {
      navigate(`/readmore/${id}`);
    } else {
      notify("Bu işlemi yapmak için giriş yapmalısın", "error");
      navigate("login");
    }
  };
  const handleLike = (id) => {
    if (currentUser) {
      likesBlog(id);
    } else {
      notify("Bu işlemi yapmak için giriş yapmalısın", "error");
      navigate("login");
    }
  };
  const handleComment = (id) => {
    if (currentUser) {
      likesBlog(id);
    } else {
      notify("Bu işlemi yapmak için giriş yapmalısın", "error");
      navigate("login");
    }
  };
  return (
    <Grid container spacing={4} marginTop={5} marginBottom={7}>
      {blogsData?.map((item) => (
        <Grid item key={item._id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: "1rem",
              width: "17",
              height: "30rem",
              boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "7px",
            }}
          >
            <CardMedia
              sx={{
                height: "19rem",
                width: "19rem",
                padding: "1rem",
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "auto",
              }}
              image={item.image}
              title={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxHeight: "2.5rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mb: 1,
                }}
              >
                {item.content}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary.dark"
                sx={{ mt: 1 }}
              >
                {item.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.createds}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Box sx={{ display: "flex" }}>
                  <FavoriteIcon
                    sx={{
                      color: item.likes_n.includes(currentUserId) ? "red" : "",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      handleLike(item._id);
                    }}
                  />
                  <Typography variant="body3" color="text.secondary">
                    {item.likes}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <ChatBubbleOutlineIcon
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleComment(item._id)}
                  />
                  <Typography variant="body3" color="text.secondary">
                    {item.comment_count}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <RemoveRedEyeIcon />
                  <Typography variant="body3" color="text.secondary">
                    {item.post_views}
                  </Typography>
                </Box>
              </Box>
              {isActive && <Button
                sx={{
                  backgroundColor: "lightgreen",
                  marginLeft: "5rem",
                  "&:hover": { backgroundColor: "lightsalmon", color: "black" },
                }}
                onClick={() => handleReadMore(item._id)}
              >
                Daha Fazla
              </Button>}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
