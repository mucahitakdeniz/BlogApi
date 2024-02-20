import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogsFn from "../hooks/useBlogsFn";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "24rem",
  height: "27rem",
  bgcolor: "background.paper",
  border: "5px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function EditModal({ open, card, handleClose }) {
  const { categories } = useSelector((state) => state.blogs);
  const { getCategories } = useBlogsFn();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const [info, setInfo] = useState({
    id: card.id,
    title: card.title,
    content: card.content,
    image: card.image,
    category_id: card.category_id_id,
    status: card.status,
  });
  const status = ["Draft", "Publish"];
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Başlık"
            name="title"
            id="title"
            type="text"
            variant="outlined"
            value={info?.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Resim"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={info?.image}
            onChange={handleChange}
            required
          />
          <TextField
            label="İçerik"
            name="content"
            id="content"
            type="text"
            variant="outlined"
            value={info?.content}
            onChange={handleChange}
            required
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
              value={card.category.name}
              required
              onChange={handleChange}
            >
              {categories?.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
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
              value={info.status || ""}
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
        </Box>
      </Modal>
    </div>
  );
}
