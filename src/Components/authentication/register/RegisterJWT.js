import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';
import { useSelector } from 'react-redux';
const RegisterJWT = (props) => {
  const mounted = useMounted();
  const { register } = useAuth();
  let errorMsg = useSelector((state) => state.user.message);
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        policy: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        name: Yup.string().max(255).required('Name is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(
            values.email,
            values.name,
            values.password,
            values.companyName
          );

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}>
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
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label='Name'
            margin='normal'
            name='name'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label='Email Address'
            margin='normal'
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label='Password'
            margin='normal'
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            type='password'
            value={values.password}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.companyName && errors.companyName)}
            fullWidth
            helperText={touched.companyName && errors.companyName}
            label='Company Name'
            margin='normal'
            name='companyName'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.companyName}
            variant='outlined'
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 2,
            }}>
            <Checkbox
              checked={values.policy}
              color='primary'
              name='policy'
              onChange={handleChange}
            />
            <Typography color='textSecondary' variant='body2'>
              I have read the{' '}
              <Link color='primary' component='a' href='/termsandconditions'>
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          {errorMsg && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorMsg}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color='primary'
              disabled={isSubmitting}
              fullWidth
              size='large'
              type='submit'
              variant='contained'>
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterJWT;
