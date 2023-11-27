import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateData } from "../../../slices/CustomSlices/actions/apiActions";

const AccountSecuritySettings = (props) => {
  const reduxDispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirm: "",
        old_password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(7, "Must be at least 7 characters")
          .max(255)
          .required("Required"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={(
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        reduxDispatch(
          createUpdateData(
            {
              password: values.old_password,
              newpassword1: values.password,
              newpassword2: values.passwordConfirm,
            },
            "account/changePassword",
            id_token,
            false
          )
        )
          .then((res) => {
            if (res.status === 200) {
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success("Password updated!");
            } else {
              resetForm();
              setStatus({ success: false });
              setSubmitting(false);
              toast.error("Invalid Password!");
              setErrors({ submit: "Invalid Password" });
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Invalid Password");
            setStatus({ success: false });
            setErrors({ submit: "Invalid Password" });
            setSubmitting(false);
          });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit} {...props}>
          <Card>
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.old_password && errors.old_password)}
                    fullWidth
                    helperText={touched.old_password && errors.old_password}
                    label="Old Password"
                    name="old_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.old_password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.passwordConfirm && errors.passwordConfirm
                    )}
                    fullWidth
                    helperText={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                    label="Password Confirmation"
                    name="passwordConfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AccountSecuritySettings;
