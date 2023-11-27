import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';
import Alert from '@mui/lab/Alert';
import { useSelector } from 'react-redux';

const LoginJWT = (props) => {
  const mounted = useMounted();
  const { login } = useAuth();
  let errorMsg = useSelector((state) => state.user.message);
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(window?.location.hostname);
    // eslint-disable-next-line
  }, [window]);

  return (
    <Formik
      initialValues={
        host === 'fms-demo.bondwest.co.uk'
          ? {
              email: 'demo@bondwest.co.uk',
              password: 'Password123!',
              submit: null,
            }
          : {
              email: '',
              password: '',
              submit: null,
            }
      }
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.email, values.password);

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          if (mounted.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
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
        <form noValidate onSubmit={handleSubmit} {...props}>
          <TextField
            autoFocus
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errorMsg && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorMsg}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>

          {host === 'fms-demo.bondwest.co.uk' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                <div>
                  Use <b>demo@bondwest.co.uk</b> and password{' '}
                  <b>Password123!</b>
                </div>
              </Alert>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
