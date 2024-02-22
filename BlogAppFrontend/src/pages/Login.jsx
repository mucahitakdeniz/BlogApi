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
    user_name: string().required("Bu alan boş kırakılamaz"),
    password: string()
      .required("Bu alan boş kırakılamaz")
      .min(8, "Şifreniz 8 karakterden büyük olmalıdır")
      .max(20, "Şifreniz 20 karakterden küçük olmalıdır")
      .matches(/\d/, "En az bir rakam içermelidir.")
      .matches(/[a-z]/, "En az bir küçük harf içermelidir.")
      .matches(/[A-Z]/, "En az bir büyük harf içermelidir.")
      .matches(/[!,?{}><%&$#*£+-.]/, "En az bir özel karakter içermelidir."),
  });

  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="row-reverse"
      margin="auto"
      maxWidth="lg"
      sx={{
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
          initialValues={{ user_name: "", password: "" }}
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
                  gap: 4,
                  width: "30rem",
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
                  type="text"
                  name="user_name"
                  label="Kullanıcı Adı"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_name}
                  error={touched.user_name && Boolean(errors.user_name)}
                  helperText={errors.user_name}
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
                            <VisibilityOff sx={{ color: "green" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Link to="/sendresetpassword">Şifrenini unuttunuz mu</Link>
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
  );
};

export default Login;
