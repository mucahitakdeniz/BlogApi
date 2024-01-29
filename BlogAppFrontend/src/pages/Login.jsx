import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { object, string } from "yup";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {

  const { login } = useAuthCall();
  const [show, setShow] = useState(false);
  const loginSchema = object({
    email: string()
      .email("Lütfen geçerli bir e-posta adresi giriniz!")
      .required("Bu alan boş kırakılamaz"),
    password: string()
      .required("Bu alan boş kırakılamaz")
      .min(8, "Şifreniz 8 karakretden küçük olamaz")
      .max(20, "Şifreniz 20 karakretden büyük olamaz")
      .matches(/\d+/, "En az bir rakam içermelidir.")
      .matches(/[a-z]/, "En az bir küçük harf içermelidir.")
      .matches(/[A-Z]/, "En az bir büyük harf içermelidir.")
      .matches(/[!,?{}><%&$#*£+-.]+/, "En az bir özel karekter içermelidir."),
  });

  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        xs={12}
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          maxWidth: "80vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Avatar
            sx={{
              color: "green",
              backgroundColor: "lightgrey",
              m: "auto",
              width: "5rem",
              height: "5rem",
            }}
          >
            <LockPersonRoundedIcon sx={{ width: "3rem", height: "3rem" }} />
          </Avatar>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    gap: 2,
                    width: "25rem",
                    height: "1.5rem",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="darkgreen"
                    marginX={15}
                    marginY={5}
                  >
                    Üye Girişi
                  </Typography>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                  />

                  <TextField
                    xs={12}
                    type={show ? "text" : "password"}
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {show ? (
                              <Visibility sx={{ color: "red" }} />
                            ) : (
                              <VisibilityOff x={{ color: "green" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button variant="contained" type="submit">
                    Giriş
                  </Button>
                  <Link to="/register">Hesabınız yok mu? Kaydolun</Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
