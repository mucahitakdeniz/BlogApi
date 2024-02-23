import { Card, CardActions, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const Profile = () => {
  const { currentUser, image,email } = useSelector((state) => state.auth);

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
          width: "30vh",
          padding: "12vh",
          boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
        }}
      >
        {image ? (
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: "15rem",
              height: "15rem",
              margin: "2rem auto",
            }}
            alt="User image"
            src={image}
          />
        ) : (
          <Avatar sx={{
            bgcolor: deepOrange[500],
            width: "15rem",
            height: "15rem",
            margin: "2rem auto",
            fontSize:"5rem"
          }}> {currentUser.slice(0, 4).toLocaleUpperCase()}</Avatar>
        )}
        <Typography variant="h4" color="dark" fontWeight="500">
          {currentUser}
        </Typography>
        <Typography variant="h5" color="dark" fontWeight="500">
          {email}
        </Typography>
      </Card>
    </Box>
  );
};

export default Profile;
