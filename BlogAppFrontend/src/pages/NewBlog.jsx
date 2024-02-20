 import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useBlogsFn from "../hooks/useBlogsFn";
import { useSelector } from "react-redux";

const NewBlog = () => {
  const navigate = useNavigate();
  const { createBlog, getCategories } = useBlogsFn();

  const { categories } = useSelector((state) => state.blogs);
  const status = ["Draft", "Publish"];
  const handleChange = (e) => {
    setNewBlogInfo({
      ...newBlogInfo,
      [e.target.name]: e.target.value,
    });
  };
  const [newBlogInfo, setNewBlogInfo] = useState({
    title: "",
    content: "",
    image: "",
    category_id: "",
    status: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(newBlogInfo);
    setNewBlogInfo({
      title: "",
      content: "",
      image: "",
      category: "",
      status: "",
    });
  };
  useEffect(() => {
    getCategories();
  }, []);

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
            label="Category"
            id="category-select"
            name="category_id"
            required
            onChange={handleChange}
          >
            {categories?.map((item, i) => {
              return (
                <MenuItem key={i} value={item._id}>
                  {item.name}
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
            <MenuItem onClick={() => navigate("/newblog/status")} />

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
          rows={4}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
          Yeni Blog
        </Button>
      </Box>
    </Box>
  );
};
export default NewBlog;
