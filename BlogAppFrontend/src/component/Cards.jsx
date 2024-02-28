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
  const { currentUser, currentUserId, isActive } = useSelector(
    (state) => state.auth
  );
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
    <Grid container spacing={7} marginTop={4} marginBottom={7}>
      {blogsData?.map((item) => (
        <Grid item key={item._id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: "1.2rem",
              width: "21rem",
              height: "40rem",
              borderRadius: "1rem",
              boxShadow: "5px 10px 18px rgba(3, 2, 2, 0.788)",
              display: "flex",
              flexDirection: "column",
              marginRight: "1rem",
            }}
          >
            <CardMedia
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                margin: "auto",
                marginBottom: "1rem",
                borderRadius: "1rem",
                boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
              }}
              image={item.image}
              title={item.title}
              component="img"
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
              <Box sx={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}>
                <Box sx={{ display: "flex" }}>
                  <FavoriteIcon
                    sx={{
                      color: item.likes_n.includes(currentUserId) ? "red" : "",
                      fontSize: "2rem",
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
                      fontSize: "2rem",
                    }}
                    onClick={() => handleComment(item._id)}
                  />
                  <Typography variant="body3" color="text.secondary">
                    {item.comment_count}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <RemoveRedEyeIcon sx={{ fontSize: "2rem" }} />
                  <Typography variant="body3" color="text.secondary">
                    {item.post_views}
                  </Typography>
                </Box>
              </Box>
              {isActive && (
                <Button
                  sx={{
                    backgroundColor: "lightgreen",
                    marginLeft: "3rem",
                    "&:hover": {
                      backgroundColor: "lightsalmon",
                      color: "black",
                    },
                  }}
                  onClick={() => handleReadMore(item._id)}
                >
                  Daha Fazla
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
