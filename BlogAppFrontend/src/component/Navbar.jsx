import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
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
              sx={{ "&:hover": { color: "lightpink" } }}
            >
              Ana Sayfa{" "}
            </Link>
            <Link
              color="#01020c"
              variant="button"
              underline="none"
              marginX={1}
              href="/newblog"
              sx={{ "&:hover": { color: "lightpink" } }}
            >
              Yeni Blog{" "}
            </Link>
            <Link
              color="#01020c"
              variant="button"
              underline="none"
              marginX={1}
              href="/about"
              sx={{ "&:hover": { color: "lightpink" } }}
            >
              Hakkında
            </Link>
          </Box>
          <Box>
            {auth && (
              <div>
                {image ? (
                  <Avatar
                    src={image}
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      marginTop: "1rem",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={handleMenu}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      marginTop: "1rem",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={handleMenu}
                  />
                )}
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
                        Bloglarım{" "}
                      </MenuItem>,
                      <MenuItem
                        key="profile"
                        onClick={() => {
                          handleClose();
                          navigate("/profile");
                        }}
                      >
                        Profil{" "}
                      </MenuItem>,
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          logout();
                          handleClose();
                        }}
                      >
                        Çıkiş
                      </MenuItem>,
                    ]
                  ) : (
                    <MenuItem onClick={() => navigate("/login")}>
                      Giriş yap
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
