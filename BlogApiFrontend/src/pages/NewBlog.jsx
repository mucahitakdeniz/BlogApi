import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCardsFn from "../hooks/useCardsFn";

const NewBlog = () => {
  const navigate = useNavigate();
  const { createBlog } = useCardsFn();

  const category = [
    "Trivia",
    "Travel",
    "Web development",
    "Al",
    "Science",
    "Fashion",
  ];
  const status = ["Draft", "Published"];
  const handleChange = (e) => {
    setNewBlogInfo({
      ...newBlogInfo,
      [e.target.name]: e.target.value,
    });
    console.log(newBlogInfo);
  };
  const [newBlogInfo, setNewBlogInfo] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    status: "",
  });
  const [showCategory, setshowCategory] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newBlogInfo);
    createBlog(newBlogInfo);
    setNewBlogInfo({
      title: "",
      content: "",
      image: "",
      category: "",
      status: "",
    });
  };
  return (
    <Box sx={{ width: "25rem", margin: "auto", marginTop: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "1rem",
          boxShadow: "30px 11px 17px 10px rgba(0, 0, 0, 0.9)",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Title"
          name="title"
          id="title"
          type="text"
          variant="outlined"
          required
          onChange={handleChange}
        />

        <TextField
          label=" Image Url"
          name="image"
          id="image"
          type="url"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <FormControl>
          <InputLabel variant="outlined" id="category-select-label">
            Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            label="category"
            id="category-select"
            name="category"
            value={newBlogInfo.category==0 ? "0" : newBlogInfo.category}
            required
            onChange={handleChange}
          >
            <MenuItem onClick={() => navigate("/newblog/categorys")}/>
              Please Choose
            {category?.map((item, i) => {
              return (
                <MenuItem key={i} value={i}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel variant="outlined" id="status-select-label">
            Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            label="status"
            id="status-select"
            name="status"
            value={newBlogInfo.status || ""}
            required
            onChange={handleChange}
          >
            <MenuItem onClick={() => navigate("/newblog/status")}/>

            {status.map((item, i) => {
              return (
                <MenuItem key={i} value={i == 0 ? "d" : "p"}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          sx={{ height: "5rem", marginBottom: "2rem" }}
          label="Content"
          name="content"
          id="content"
          type="text"
          variant="outlined"
          required
          multiline
          rows={2}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit">
          New Blog
        </Button>
      </Box>
    </Box>
  );
};
export default NewBlog;
