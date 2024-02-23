import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import { object, string, ref } from "yup";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const { register } = useAuthCall();
  const RegisterSchema = object({
    email: string()
      .email("Lütfen geçerli bir e-posta adresi giriniz!")
      .required("Bu alan boş kırakılamaz"),
    user_name: string()
      .required("Bu alan boş kırakılamaz")
      .max(150, "User name 150 karakretden büyük olamaz"),
    first_name: string()
      .max(150, "First name 150 karakretden büyük olamaz")
      .matches(/^[a-zA-Z0-9\s]*$/, "Bu alana özel karakter içeremez"),
    last_name: string()
      .max(150, "Last name 150 karakretden büyük olamaz")
      .matches(/^[a-zA-Z0-9\s]*$/, "Bu alana özel karakter içeremez"),
    image: string().url("Bir resim veya icon baglantı adresi giriniz"),

    password: string()
      .required("Bu alan boş kırakılamaz")
      .min(8, "Şifreniz 8 karakretden küçük olamaz")
      .max(20, "Şifreniz 20 karakretden büyük olamaz")
      .matches(/\d+/, "En az bir rakam içermelidir.")
      .matches(/[a-z]/, "En az bir küçük harf içermelidir.")
      .matches(/[A-Z]/, "En az bir büyük harf içermelidir.")
      .matches(/[!,?{}><%&$#*£+-.]+/, "En az bir özel karekter içermelidir."),
    password2: string()
      .required("Bu alan boş kırakılamaz")
      .min(8, "Şifreniz 8 karakretden küçük olamaz")
      .max(20, "Şifreniz 20 karakretden büyük olamaz")
      .matches(/\d+/, "En az bir rakam içermelidir.")
      .matches(/[a-z]/, "En az bir küçük harf içermelidir.")
      .matches(/[A-Z]/, "En az bir büyük harf içermelidir.")
      .matches(/[!,?{}><%&$#*£+-.]+/, "En az bir özel karekter içermelidir.")
      .equals([ref("password")], "Şifreler eşleşmiyor"),
  });

  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
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
            <HowToRegIcon sx={{ width: "3rem", height: "3rem" }} />
          </Avatar>

          <Formik
            initialValues={{
              user_name: "",
              first_name: "",
              last_name: "",
              email: "",
              image: "",
              bio: "",
              password: "",
              password2: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              register(values);
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
                    marginY={3}
                  >
                    Kayıt Ol
                  </Typography>
                  <TextField
                    type="text"
                    name="user_name"
                    label="User Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user_name}
                    error={touched.user_name && Boolean(errors.user_name)}
                    helperText={errors.user_name}
                    sx={{ width: "100%" }}
                  />
                  <TextField
                    type="text"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={
                      errors.first_name
                        ? errors.first_name
                        : "Bu alan zorunlu degildir"
                    }
                    sx={{ width: "100%" }}
                  />
                  <TextField
                    type="text"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={
                      errors.last_name
                        ? errors.last_name
                        : "Bu alan zorunlu degildir"
                    }
                    sx={{ width: "100%" }}
                  />
                  <TextField
                    type="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    type="url"
                    name="image"
                    label="Resim"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    error={touched.image && Boolean(errors.image)}
                    helperText={
                      errors.image ? errors.image : "Bu alan zorunlu degildir"
                    }
                  />
                  <TextField
                    type="text"
                    name="bio"
                    label="Bio"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                    helperText={
                      touched.bio
                        ? "Bu alan zorunlu degildir"
                        : "Kendinizi kısaca tanıtınız"
                    }
                  />

                  <TextField
                    xs={12}
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <TextField
                    xs={12}
                    type="password"
                    name="password2"
                    label="Password 2"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                    error={touched.password2 && Boolean(errors.password2)}
                    helperText={errors.password2}
                  />
                  <Button variant="contained" type="submit">
                    GÖNDER
                  </Button>
                  <Link to={"/login"}> Hesabınız var mı? Giriş yapın</Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
