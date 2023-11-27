import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useDispatch } from 'react-redux';
import { createUpdateData } from '../slices/CustomSlices/actions/apiActions';
import Header from '../Components/landingPage/Header';
import HeroSection from '../Components/contact/HeroSection';
import { Phone } from '@mui/icons-material';
import { Footer } from '../Components/landingPage/Footer';

export const ContactUs = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    company: '',
    contactNumber: '',
    body: '',
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUpdateData(data, 'account/contactUs'));
    setData({
      name: '',
      email: '',
      subject: '',
      company: '',
      contactNumber: '',
      body: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Fleet Vantage</title>
      </Helmet>
      <Header />
      <HeroSection />
      <Box
        sx={{
          backgroundColor: '#242D38',
          display: 'flex',
          flexDirection: 'column',
          mt: 6,
          mb: 4,
          pt: 4,
          pb: 4,
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 3,
                    }}
                  >
                    <div>
                      <Typography color="textPrimary" gutterBottom variant="h4">
                        Contact Us
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        Get in touch with us and streamline your fleet
                        management operations with ease.
                      </Typography>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      mt: 3,
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            required
                            value={data.name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            required
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            label="Subject"
                            variant="outlined"
                            fullWidth
                            name="subject"
                            required
                            value={data.subject}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Company"
                            variant="outlined"
                            fullWidth
                            name="company"
                            value={data.company}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            name="contactNumber"
                            value={data.contactNumber}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            label="Details"
                            variant="outlined"
                            fullWidth
                            name="body"
                            multiline
                            rows={4}
                            value={data.body}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                  {/* <Divider sx={{ my: 3 }} /> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography
                variant="body1"
                sx={{ color: '#fff', lineHeight: 2, mt: 4 }}
                align="justify"
              >
                We value your feedback and are committed to providing
                exceptional customer service. If you have any questions about
                our web app, need technical support, or would like to request a
                demo, please don't hesitate to contact us. Our dedicated team of
                experts is here to help you make the most of our fleet
                management web app.
                <br />
                <br />
                We look forward to hearing from you and helping you optimize
                your fleet management operations.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display={'flex'} sx={{ alignItems: 'center', mt: 4 }}>
                    <Button
                      startIcon={<Phone />}
                      variant="contained"
                      fullWidth
                      color="primary"
                      component={'a'}
                      size="large"
                      href="tel:+18554440797"
                    >
                      +1 855 444 0797
                    </Button>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="GrayText">
                      Our toll free number
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display={'flex'} sx={{ alignItems: 'center', mt: 4 }}>
                    <Button
                      startIcon={<WhatsAppIcon />}
                      variant="contained"
                      fullWidth
                      color="primary"
                      size="large"
                      component={'a'}
                      href="https://wa.me/+447729039243"
                    >
                      WhatsApp
                    </Button>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="GrayText">
                      Connect on WhatsApp
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
