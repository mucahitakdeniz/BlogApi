import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useCommentCall from "../hooks/useCommentCall";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Comments = ({ blog_id }) => {
  const { getComment, createComment, deleteComment } = useCommentCall();

  const { comments } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.auth);
  const [comment, setComment] = useState({ content: "", blog_id: "" });
  const handleChange = (e) => {
    setComment({ ...comment, content: e.target.value });
  };
  const handleSubmit = () => {
    createComment(comment);
  };
  const handleDeleteCommnet = (id) => {
    deleteComment(id);
    getComment(blog_id);
  };
  useEffect(() => {
    if (blog_id) getComment(blog_id);
    setComment({ ...comment, blog_id: blog_id });
  }, [blog_id]);
  return (
    <Box
      sx={{
        width: "85%",
        margin: "auto",
        marginTop: "1rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "1rem",
        bgcolor: "#ffea98",
        boxShadow: "0 5px 5px rgba(3, 2, 2, 0.788)",
        borderRadius: "0.5rem",
      }}
    >
      <br />
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
          sx={{ width: "85%", bgcolor: "#ffcf33" }}
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
        comments.map((item, i) => (
          <Box
            key={item._id}
            display="flex"
            justifyContent="space-between"
            marginTop={1}
            padding={2}
            border="1px solid lightblue"
            borderRadius={3}
          >
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              width="100%"
              height="2rem"
            >
              <Typography maxWidth="80%" sx={{ wordWrap: "break-word" }}>
                {item.content}
              </Typography>
              <Typography>
                {currentUser == item.author_name && (
                  <DeleteIcon
                    sx={{
                      color: "darkred",
                      fontSize: "1.5rem",
                      marginRight: 3,

                      "&:hover": { color: "darkmagenta", cursor: "pointer" },
                    }}
                    onClick={() => handleDeleteCommnet(item._id)}
                  />
                )}
              </Typography>
            </Box>

            <Typography>{item.author_name}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export default Comments;
