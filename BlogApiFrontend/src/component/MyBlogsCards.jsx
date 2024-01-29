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

const MyBlogsCards = ({ cardsData, authorname }) => {
  const { readMore, likesBlog, deleteBlog } = useCardsFn();
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
  const filterData = cardsData?.filter((item) => item.author === authorname);
  return (
    <Grid
      container
      spacing={5}
      sx={{ marginY: "2rem", justifyContent: "center" }}
    >
      {filterData.length == 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="error" padding="4rem">
            I'm sorry. You don't have any blog!
          </Typography>
          <Button variant="contained" color="success" onClick={()=> navigate("/newblog")}>Write blog</Button>
        </Box>
      ) : (
        filterData.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                padding: "2rem",
                width: "80%",
                height: "30rem",
                boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <CardMedia
                sx={{ height: "100px", width: "100px", margin: "auto" }}
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
                  sx={{ maxHeight: "2.5rem", overflow: "hidden" }}
                >
                  {item.content}
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
                  }).format(new Date(item.publish_date))}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  {item.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Box sx={{ display: "flex" }}>
                    <FavoriteIcon
                      onClick={() => {
                        likesBlog(item.id)
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
                <Button variant="contained" color="lightgreen"
                  sx={{
                    marginLeft: "2rem",
                    width: "6rem",
                  }}
                  onClick={() => handleReadMore(item.id)}
                >
                  Read More
                </Button>
                <Button
                  sx={{
                    backgroundColor: "red",
                    marginLeft: "2rem",
                    height: "4rem",
                  }}
                  onClick={() => deleteBlog(item.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};
export default MyBlogsCards;
