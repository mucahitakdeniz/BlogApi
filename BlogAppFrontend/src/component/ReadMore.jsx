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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useCardsFn from "../hooks/useBlogsFn";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReadMore = () => {
  const { likesBlog, readMore, deleteBlog } = useCardsFn();
  const { id } = useParams();
  const card = useSelector((state) => state.card);
  const { currentUserId, isAdmin, currentUser } = useSelector(
    (state) => state.auth
  );

  const handleLike = (id) => {
    likesBlog(id, true);
    readMore(card.id);
  };
  const hendleDelete = (id) => {
    deleteBlog(id);
  };
  useEffect(() => {
    readMore(id);
  }, []);

  return (
    <Container
      sx={{
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "50%",
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

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <FavoriteIcon
                sx={{
                  color: card?.likes_n.includes(currentUserId) ? "red" : "",
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
          </Box>
          <Box>
            {(isAdmin || card.author == currentUser) && (
              <ModeEditIcon
                sx={{
                  color: "darkgreen",
                  fontSize: "2.5rem",
                  marginRight:3
,                  "&:hover": { color: "blue", cursor: "pointer" },
                }}
                onClick={() => hendleDelete(card.id)}
              />
            )}

            {(isAdmin || card.author == currentUser) && (
              <DeleteIcon
                sx={{
                  color: "darkred",
                  fontSize: "2.5rem",
                  marginRight:3,

                  "&:hover": { color: "darkmagenta", cursor: "pointer" },
                }}
                onClick={() => hendleDelete(card.id)}
              />
            )}
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ReadMore;
