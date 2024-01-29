import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import useCardsFn from "../hooks/useCardsFn";

const ReadMore = () => {
  const card = useSelector((state) => state.card);
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
          width: "80%",
          height: "100%",
          margin: "auto",
          borderBottom: "1px solid  white",
        }}
      >
        <CardMedia
          sx={{
            height: "30rem",
            maxwidth: "30rem",
            margin: "auto",
            padding: "1rem",
          }}
          image={card.image}
          title={card.title}
        />
        <CardContent
          sx={{ marginY: "1rem", display: "flex", alignItems: "center" }}
        >
          <AccountCircle sx={{ fontSize: "3rem" }} />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {card.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Intl.DateTimeFormat("tr-TR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }).format(new Date(card.publish_date))}
            </Typography>
          </CardContent>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {card.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ display: "flex" }}>
              <FavoriteIcon sx={{ fontSize: "2.5rem" }} />
              <Typography variant="h5" color="text.secondary">
                {card.likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: "2.5rem" }} />
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
        </CardActions>
      </Card>
    </Container>
  );
};

export default ReadMore;
