import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Avatar, Link } from "@mui/material";

const About = () => {
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
          gap: "2rem",
          height: "55vh",
          width: "35vh",
          padding: "2rem",
          boxShadow: "0 10px 18px rgba(3, 2, 2, 0.788)",
        }}
      >
        <Avatar
          alt="My Foto"
          src="https://media.licdn.com/dms/image/D4D03AQGgXcEs_TJetw/profile-displayphoto-shrink_200_200/0/1687379190285?e=1714003200&v=beta&t=5TwUBpNWU9VzIn8diI6qptCtyZ6qghn9aG1wnlUuHvM"
          sx={{ width: 240, height: 250 }}
        />
        <Typography variant="h4" color="dark" fontWeight="100">
          Mücahit Akdeniz
        </Typography>
        <Typography variant="h6" color="dark" fontWeight="100">
          Full Stack Developer{" "}
        </Typography>
        <Typography variant="h6" color="dark" fontWeight="100">
          mucahitakdeniz28@gmail.com{" "}
        </Typography>

        <CardActions>
          <Link
            variant="button"
            target="_blank"
            href="https://www.linkedin.com/in/m%C3%BCcahit-akdeniz-9a477a269/"
          >
            <LinkedInIcon style={{ fontSize: "40px", color: "black" }} />
          </Link>
          <Link
            variant="button"
            target="_blank"
            href="https://twitter.com/Mcht_Akdnz"
          >
            <TwitterIcon style={{ fontSize: "40px", color: "black" }} />
          </Link>

          <Link
            variant="button"
            target="_blank"
            href="https://github.com/mucahitakdeniz"
          >
            <GitHubIcon style={{ fontSize: "40px", color: "black" }} />
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default About;
