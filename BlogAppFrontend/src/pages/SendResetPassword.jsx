import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import { object, string } from "yup";
import { TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import useAuthCall from "../hooks/useAuthCall";

const SendResetPassword = () => {
  const emailShema = object({
    email: string()
      .email("Lütfen geçerli bir e-posta adresi giriniz!")
      .required("Bu alan boş kırakılamaz"),
  });
  const { sendResetPasswordToEmail } = useAuthCall();
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
          initialValues={{ email: "" }}
          validationSchema={emailShema}
          onSubmit={(values, actions) => {
            sendResetPasswordToEmail(values.email);
            actions.resetForm();
            actions.setSubmitting();
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
                  Şifreni Unuttun Mu?{" "}
                </Typography>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Email adresinizi giriniz"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email || ""}
                  error={touched.email && Boolean(errors.email)}
                  helperText={errors.email}
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
                  Şifreyi Resetle
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SendResetPassword;
