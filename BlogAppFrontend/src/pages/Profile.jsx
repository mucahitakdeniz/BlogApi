import { Card, CardActions, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  console.log(currentUser.image);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "4vh",
          height: "45vh",
          width: "40vh",
          padding: "12vh",
          boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            width: "12rem",
            height: "12rem",
            fontSize: "10rem",
            marginTop: "1rem",
          }}
        >
          {currentUser.image ? (
            <img
              sx={{ width: 54, height: 54 
              }}
              src={currentUser.image}
            />
          ) : (
            currentUser.username[0].toLocaleUpperCase()
          )}
        </Avatar>

        <Typography variant="h3" color="dark" fontWeight="500">
          {currentUser?.username}
        </Typography>
        <Typography variant="h4" color="dark" fontWeight="100">
          {currentUser?.first_name + " " + currentUser?.last_name}
        </Typography>
        <Typography variant="h4" color="dark" fontWeight="100">
          {currentUser?.email}
        </Typography>
      </Card>
    </Box>
  );
};

export default Profile;
