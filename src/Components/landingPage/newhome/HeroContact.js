import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUpdateData } from '../../../slices/CustomSlices/actions/apiActions';
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const inputName = [
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Email',
    value: 'email',
  },
  {
    name: 'Contact Number',
    value: 'contactNumber',
  },
  {
    name: 'Company',
    value: 'company',
  },
];

const useStyles = makeStyles({
  textField: {
    height: 50,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& .MuiOutlinedInput-input': {
        color: 'black',
      },
    },
  },
});

export default function HeroContact() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    email: '',
    subject: 'Free Quote',
    company: '',
    contactNumber: '',
    body: 'I want to request a free quote.',
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUpdateData(data, 'account/contactUs')).then((res) => {
      handleClick();
      setData({
        name: '',
        email: '',
        subject: 'Free Quote',
        company: '',
        contactNumber: '',
        body: 'I want to request a free quote.',
      });
    });
  };

  // const [height, setHeight] = useState(0);

  // const measuredRef = React.useCallback((node) => {
  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //   }
  // }, []);

  return (
    <div
      style={{
        background: '#c0c2c4 url("/images/bg1.png") ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        paddingTop: '16px',
      }}
    >
      <Container
      // ref={measuredRef}
      >
        <Paper
          ref={formRef}
          elevation={4}
          sx={{
            p: 3,
            bgcolor: 'white',
            position: 'relative',
            zIndex: '10',
            // mt: height / 4 + 'px',
            mt: '16px',
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item lg={12} sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: '#01ab56',
                }}
                fontFamily="Roboto Mono"
                fontWeight={700}
              >
                Sign up with FleetVantage
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                color="black"
                // fontFamily="Roboto Mono"
                fontWeight={700}
              >
                Get exclusive discount
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              {inputName.map((item, index) => {
                return (
                  <Grid item xs={12} sm={12} md={2} lg={2}>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      required={index <= 1}
                      label={item.name}
                      // margin="normal"
                      color="primary"
                      name={item.value}
                      value={data[item.value]}
                      variant="outlined"
                      onChange={handleChange}
                      inputProps={{
                        style: {
                          height: '1rem',
                        },
                        autoComplete: 'new-password', // disable autocomplete
                      }}
                    />
                  </Grid>
                );
              })}

              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    height: '3rem',
                    color: '#ffffff',
                    mt: 1,
                    backgroundColor: '#01ab56',
                    '&:hover': {
                      textDecoration: 'none',
                      backgroundColor: 'rgb(0, 119, 60)',
                      boxShadow:
                        '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                    },
                  }}
                >
                  Get Free Quote{' '}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            sx={{ width: '100%', backgroundColor: '#01ab56' }}
          >
            Thanks For Submitting a Request. Our consultant will get back to you
            soon.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
