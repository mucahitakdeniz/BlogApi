import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import { object, string, ref } from "yup";
import { TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const passwordShema = object({
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

  const { currentUserId } = useSelector((state) => state.auth);
  const { changePasword } = useAuthCall();
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="row-reverse"
      margin="auto"
      maxWidth="lg"
      height="50rem"
      sx={{
        p: 2,
      }}
    >
      <Grid item xs={12}>
        <Formik
          initialValues={{ password: "", password2: "" }}
          validationSchema={passwordShema}
          onSubmit={(values, actions) => {
            changePasword(values.password,currentUserId);
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
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  width: "40rem",
                  height: "40rem",
                  bgcolor: "#eeeeee",
                  gap: "1rem",
                }}
              >
                <LockIcon sx={{ fontSize: "15rem", color: "#0277bd" }} />
                <Typography variant="h6" color="#0277bd">
                  Yeni şifre oluştur
                </Typography>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Yeni şifrenizi giriniz"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password || ""}
                  error={touched.password && Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{ width: "18rem" }}
                />
                <TextField
                  type="password"
                  name="password2"
                  label="Password"
                  variant="outlined"
                  placeholder="Yeni şifrenizi giriniz"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password2 || ""}
                  error={touched.password2 && Boolean(errors.password2)}
                  helperText={errors.password2}
                  sx={{ width: "18rem" }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#0277bd",
                    color: "#e1f5fe",
                    "&:hover": { bgcolor: "#f44336" },
                  }}
                >
                  Gönder
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
