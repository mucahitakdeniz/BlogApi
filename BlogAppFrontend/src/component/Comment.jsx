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
    if (comment) createComment(comment);
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
        bgcolor: "#f1f8e9",
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
          label="Yorum yaz"
          type="text"
          id="comment"
          name="comment"
          onChange={(e) => handleChange(e)}
          sx={{ width: "85%", bgcolor: "#dcedc8" }}
        ></TextField>
        <Button
          disabled={comment.content === ""}
          type={comment ? "submit" : "h1"}
          sx={{
            bgcolor: "#4caf50",
            color: "black",
            padding: "15px",
            "&:hover": { bgcolor: "#43a047" },
            ...(comment.content === "" && {
              opacity: "0.5",
              cursor: "not-allowed",
            }),
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
            alignItems="center"
            marginTop={1}
            padding={2}
            border="1px solid lightblue"
            borderRadius={3}
            bgcolor={currentUser == item.author_name ? "#dce775" : "#f0f4c3"}
          >
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="80%"
              minHeight="2rem"
            >
              <Typography
                maxWidth="85%"
                sx={{ wordWrap: "break-word" }}
                color="#5d4037"
              >
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

            <Typography color={currentUser == item.author_name && "#4e342e"}>
              {item.author_name}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default Comments;
