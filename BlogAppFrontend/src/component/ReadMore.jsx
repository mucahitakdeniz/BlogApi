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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditModal from "./EditModal";

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
  const handleOpen = () => {
    setInfo({
      title: card?.title,
      image: card?.image,
      content: card?.content,
      _id: card?.id,
      status: card?.status,
      category_id: card?.category?._id,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfo({
      title: "",
      image: "",
      content: "",
      _id: "",
      status: "",
      category_id: "",
    });
  };
  const [info, setInfo] = useState({
    title: card?.title,
    image: card?.image,
    content: card?.content,
    _id: card?.id,
    status: card?.status,
    category_id: card?.category?._id,
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    readMore(id);
    console.log("deneme");
  }, [id]);

  return (
    <Container
      sx={{
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <EditModal
        open={open}
        info={info}
        setInfo={setInfo}
        handleClose={handleClose}
      />
      <Card
        sx={{
          width: "50%",
          padding: 1,
          borderRadius: "1rem",
          boxShadow: "0 10px 18px rgba(14, 196, 38, 0.788)"
        }}
      >
        <CardContent>
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
            image={card?.image}
            title={card?._id}
            component="img"
          />

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
                  color:
                    card.likes_n && card.likes_n.includes(currentUserId)
                      ? "red"
                      : "",
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
                  marginRight: 3,
                  "&:hover": { color: "blue", cursor: "pointer" },
                }}
                onClick={handleOpen}
              />
            )}

            {(isAdmin || card.author == currentUser) && (
              <DeleteIcon
                sx={{
                  color: "darkred",
                  fontSize: "2.5rem",
                  marginRight: 3,

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
