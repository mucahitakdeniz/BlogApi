import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import LockIcon from "@mui/icons-material/Lock";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAuthCall from "../hooks/useAuthCall";

const ResetPassword = () => {
  const { currentUserId, email } = useSelector((state) => state.auth);
  const { sendResetPasswordToEmail } = useAuthCall();

  const handleSendResetPassword = () => {
    sendResetPasswordToEmail(email);
    setTime(120);
  };

  const passwordSchema = object({
    password: string()
      .required("Bu alan boş bırakılamaz")
      .max(6, "doğrulama şifresi 6 karakterden fazla olamaz")
      .min(6, "doğrulama şifresi 6 karakterden az olamaz"),
  });

  const [time, SetTime] = useState();
  useEffect(() => {
    // if (email) {
    //   localStorage.setItem("items", JSON.stringify(items));
    // }
    // const intervalId = setInterval(() => {
    //   setTime(time - 1);
    // }, 1000);

    // return () => clearInterval(intervalId);
  }, [time]);

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
          validationSchema={passwordSchema}
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
                      gap: "2rem",
                    }}
                  >
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
                      gap: "5rem",
                    }}
                  >
                    <Typography>
                      E-mail adresine gönderilen şifreyi 2 dakika içerisinde
                      girmelisiniz{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: "#0277bd",
                        color: "#e1f5fe",
                        "&:hover": { bgcolor: "#f44336" },
                      }}
                    >
                      Tekrar Dene
                    </Button>
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
