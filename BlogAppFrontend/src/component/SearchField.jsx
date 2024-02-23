import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingRight: theme.spacing(6),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "13rem",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function SearchField({ setSearch, search }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "25rem",
        margin: "auto",
        background: "lightseagreen",
        marginTop: "0.5rem",
        height: "2.5rem",
        borderRadius: "0.3rem",
      }}
    >
      <Search
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <SearchIcon />
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search || ""}
          onChange={(e) => handleChange(e)}
        />
        <ClearIcon
          sx={{ "&:hover": { color: "red", cursor: "pointer" } }}
          onClick={() => setSearch("")}
        />
      </Search>
    </Box>
  );
}
