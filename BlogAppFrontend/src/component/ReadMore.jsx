import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Container } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useCardsFn from "../hooks/useBlogsFn";
import {  useState } from "react";

const ReadMore = () => {
  const { likesBlog, readMore } = useCardsFn();

  const card = useSelector((state) => state.card);
  const { currentUserId } = useSelector((state) => state.auth);
  const [like, setLike] = useState(
    card?.likes_n && card?.likes_n.includes(currentUserId)
  );
  const handleLike = (id) => {
    likesBlog(id, true);
    readMore(card);
    setLike(!like);
  };
  return (
    <Container
      sx={{
        height: "50rem",
        marginTop: "2rem",
        marginBottom: "1px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "50%",
          height: "90%",
          padding: 1,
          borderBottom: "1px solid  white",
        }}
      >
        <CardMedia
          sx={{
            height: "20rem",
            maxwidth: "20rem",
            padding: 1,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "auto",
          }}
          image={card.image}
          title={card.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {card.content}
          </Typography>
        </CardContent>
        <CardContent
          sx={{ marginY: "1rem", display: "flex", alignItems: "center" }}
        >
          <AccountCircle sx={{ fontSize: "3rem" }} />
          <CardContent>
            <Typography variant="body1" color="text.secondary" fontSize={20}>
              {card.author}
            </Typography>
            <Typography variant="body2" color="text.secondary" marginTop={1}>
              {card.createds}
            </Typography>
          </CardContent>
        </CardContent>

        <CardActions>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <FavoriteIcon
                sx={{
                  color: like ? "red" : "",
                  fontSize: "2.5rem",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => handleLike(card.id)}
              />
              <Typography variant="h5" color="text.secondary">
                {card.likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <ChatBubbleOutlineIcon
                sx={{ fontSize: "2.5rem", "&:hover": { cursor: "pointer" } }}
              />
              <Typography variant="h5" color="text.secondary">
                {card.comment_count}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <RemoveRedEyeIcon sx={{ fontSize: "2.5rem" }} />

              <Typography variant="h5" color="text.secondary">
                {card.post_views}
              </Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                marginLeft: "1rem",
              }}
              onClick={() => handleReadMore(item._id)}
            >
              Delete{" "}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ReadMore;
