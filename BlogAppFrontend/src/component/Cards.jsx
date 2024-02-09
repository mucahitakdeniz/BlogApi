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
import useCardsFn from "../hooks/useCardsFn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../helper/sweetaAlert";

const Cards = ({ blogsData }) => {
  const { readMore, likesBlog } = useCardsFn();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleReadMore = (id) => {
    if (currentUser) {
      readMore(id);
    } else {
      notify("You must be logged in to use this feature", "error");
      navigate("login");
    }
  };
  return (
    <Grid container spacing={4} marginTop={5} marginBottom={7}>
      {blogsData?.map((item) => (
        <Grid item key={item._id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: "2.3rem",
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
              <Typography variant="body2" color="text.secondary">
                {item.createds}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary.dark"
                sx={{ mt: 1 }}
              >
                {item.author}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: "flex", gap: "5px" }}>
                <Box sx={{ display: "flex" }}>
                  <FavoriteIcon
                    onClick={() => {
                      likesBlog(item._id)
                        .then(() => {
                          navigate("/");
                        })
                        .catch((error) => {
                          console.error("Beğeni işlemi hatası:", error);
                        });
                    }}
                  />
                  <Typography variant="body3" color="text.secondary">
                    {item.likes}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <ChatBubbleOutlineIcon />
                  <Typography variant="body3" color="text.secondary">
                    {/* {item.comment_count} */} 0
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <RemoveRedEyeIcon />
                  <Typography variant="body3" color="text.secondary">
                    {item.post_views}
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  backgroundColor: "lightgreen",
                  marginLeft: "2rem",
                }}
                onClick={() => handleReadMore(item._id)}
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
