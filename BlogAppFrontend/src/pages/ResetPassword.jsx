import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import LockIcon from "@mui/icons-material/Lock";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const { currentUserId } = useSelector((state) => state.auth);
  const passwordShema = object({
    password: string()
      .required("Bu alan boş kırakılamaz")
      .max(6, "doğrulama şifresi 6 karakterden çok olamaz")
      .min(6, "doğrulama şifresi 6 karakterden az olamaz"),
  });
  const [time, setTime] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
          initialValues={{ password: "" }}
          validationSchema={passwordShema}
          onSubmit={(values, actions) => {
            // sendResetPasswordToEmail(values.email);
            actions.resetForm();
            actions.setSubmitting();
          }}
        >
          {({ handleChange, values, errors, handleBlur, touched }) => (
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
                {time > 0 ? (
                  <Box>
                    <Typography variant="h6" color="#0277bd" width="18rem">
                      Kalan süre : {time}
                    </Typography>
                    <Typography variant="h6" color="#0277bd" width="18rem">
                      Email adresinize gelen dogrulama şifresini giriniz
                    </Typography>
                    <TextField
                      type="text"
                      name="password"
                      label="Doğrulama Şifresi"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password || null}
                      error={touched.password && Boolean(errors.password)}
                      helperText={errors.password}
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
                ) : (
                  <Box>
                    <Typography>Yeniden deneyin </Typography>
                    <Button> Sifreyi Sıfırla</Button>
                  </Box>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
