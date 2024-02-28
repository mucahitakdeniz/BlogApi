import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useCommentCall from "../hooks/useCommentCall";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Comments = ({ blog_id }) => {
  const { getComment, createComment } = useCommentCall();

  const { comments } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.auth);
  // console.log(author_name);
  console.log(currentUser);
  const [comment, setComment] = useState({ content: "", blog_id: "" });
  const handleChange = (e) => {
    setComment({ ...comment, content: e.target.value });
  };
  const handleSubmit = () => {
    createComment(comment);
  };
  useEffect(() => {
    if (blog_id) getComment(blog_id);
    setComment({ ...comment, blog_id: blog_id });
  }, [blog_id]);
  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "1rem",
        boxShadow: "30px 11px 17px 10px rgba(150, 53, 53, 0.9)",
      }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignContent="flex-end"
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Yorum yaz ..."
          type="text"
          id="comment"
          name="comment"
          required
          onChange={(e) => handleChange(e)}
          sx={{ width: "85%", bgcolor: "#ff7961" }}
        ></TextField>
        <Button
          type="submit"
          sx={{
            bgcolor: "#cddc39",
            color: "#9c27b0",
            "&:hover": { bgcolor: "#ffeb3b" },
          }}
        >
          Gönder
        </Button>
      </Box>
      {comments &&
        comments.map((item) => (
          <Box
            key={item._id}
            display="flex"
            justifyContent="space-between"
            marginTop={1}
            padding={2}
            border="1px solid lightblue"
            borderRadius={3}
          >
            {/* {currentUser == item.author_name && (
              <DeleteIcon
                sx={{
                  color: "darkred",
                  fontSize: "2.5rem",
                  marginRight: 3,

                  "&:hover": { color: "darkmagenta", cursor: "pointer" },
                }}
                // onClick={() => hendleDelete(card.id)}
              />
            )} */}
            <Typography variant="p" component="p" maxWidth="80%" minHeight={1}>
              {item.content}
            </Typography>
            <Typography>{item.author_name}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export default Comments;
