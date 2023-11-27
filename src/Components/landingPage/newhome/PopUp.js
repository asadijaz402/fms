import * as React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Grid,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUpdateData } from '../../../slices/CustomSlices/actions/apiActions';
import { useTheme } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

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
  {
    name: 'Description',
    value: 'body',
  },
];

const defaults = {
  bgColor: '#242D38',
};

export default function AlertDialog({ openPopUp, setOpenPopUp }) {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
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

  const handleClose = () => {
    setOpenPopUp(false);
  };

  const handleOnClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      // Prevent closing the dialog when clicking outside or pressing the escape key
      return;
    }
    handleClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUpdateData(data, 'account/contactUs')).then((res) => {
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

  return (
    <Dialog
      open={openPopUp}
      onClose={handleOnClose}
      fullWidth
      maxWidth="lg"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Box
        sx={{
          backgroundColor: defaults.bgColor,
          width: '100%',
          textAlign: 'right',
        }}
      >
        <IconButton onClick={handleOnClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ background: defaults.bgColor }}>
        <Grid container spacing={mobileDevice ? 3 : 0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom color="#fff">
                Manage Your Fleet
              </Typography>
              <Typography variant={'h4'} gutterBottom color="#fff">
                At
              </Typography>
            </Box>
            <Box
              sx={{
                height: mobileDevice ? '3rem' : '5rem',
                background: '#01ab56',
                ml: mobileDevice ? 0 : -3,
              }}
              textAlign="center"
            >
              <Typography
                variant={mobileDevice ? 'h5' : 'h1'}
                gutterBottom
                color="#fff"
              >
                Amazing Discounts
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 4, pr: 2 }}>
              <Typography variant="h4" gutterBottom color="#fff">
                Exclusive Offer
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                variant="h5"
                gutterBottom
                color="#01ab56"
              >
                Manage 10 vehicles free of cost!
              </Typography>
            </Box>
            <Box pr={2} mt={4}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                component={RouterLink}
                to="/authentication/register"
                sx={{
                  color: '#ffffff',
                  backgroundColor: '#01ab56',
                  fontSize: '30px',
                  '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: 'rgb(0, 119, 60)',
                    boxShadow:
                      '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                  },
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              textAlign="left"
              p={2}
              sx={{
                background: 'black',
                border: '4px solid #01ab56',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h4" gutterBottom color="#fff">
                Connect with Us
              </Typography>
              <Typography
                sx={{ mt: 2 }}
                variant="h3"
                gutterBottom
                color="#01ab56"
              >
                Have Questions or Queries?
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box>
                  {inputName.map((item, index) => {
                    return (
                      <TextField
                        fullWidth
                        required={index <= 1}
                        label={item.name}
                        sx={{ mt: 1 }}
                        multiline={index === 4}
                        rows={2}
                        gutterBottom
                        name={item.value}
                        value={data[item.value]}
                        variant="outlined"
                        onChange={handleChange}
                        inputProps={{
                          autoComplete: 'new-password', // disable autocomplete
                        }}
                      />
                    );
                  })}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    height: '3rem',
                    color: '#ffffff',
                    mt: 2,
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
              </form>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
