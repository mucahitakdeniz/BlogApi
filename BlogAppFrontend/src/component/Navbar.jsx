import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { Avatar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";

const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuthCall();

  const { currentUser, image } = useSelector((state) => state.auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAuth(true);
  };

  return (
    <Box sx={{ with: "100%", height: "8rem" }}>
      <AppBar
        position="static"
        sx={{ with: "100%", height: "8rem", backgroundColor: "lightseagreen" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://lms.clarusway.com/pluginfile.php/1/core_admin/logocompact/300x300/1688763931/clarusway_LOGO_tek_png.png"
              width="50rem"
              height="50rem"
              alt="logo"
            />
            <Link
              color="#01020c"
              variant="button"
              underline="none"
              marginX={1}
              href="/"
            >
              Dashboard
            </Link>
            <Link
              color="#01020c"
              variant="button"
              underline="none"
              marginX={1}
              href="/newblog"
            >
              New Blog
            </Link>
            <Link
              color="#01020c"
              variant="button"
              underline="none"
              marginX={1}
              href="/about"
            >
              About
            </Link>
          </Box>
          <Box>
            {auth && (
              <div>
               
                  <Avatar
                    src={image}
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      marginTop:"1rem","&:hover":{cursor:"pointer"}
                    }}
                    onClick={handleMenu}
                  />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {currentUser ? (
                    [
                      <MenuItem
                        key="my-blog"
                        onClick={() => {
                          handleClose();
                          navigate("myblog");
                        }}
                      >
                        My Blog
                      </MenuItem>,
                      <MenuItem
                        key="profile"
                        onClick={() => {
                          handleClose();
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </MenuItem>,
                      <MenuItem key="logout" onClick={() => logout()}>
                        Log Out
                      </MenuItem>,
                    ]
                  ) : (
                    <MenuItem onClick={() => navigate("/login")}>
                      Login
                    </MenuItem>
                  )}
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
