import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  Box,
  Button,
  Container,
  Toolbar,
  IconButton,
  Dialog,
  List,
  Divider,
  Typography,
  ListItemText,
  Slide,
  ListItemButton,
  AppBar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import Logo from '../Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
gsap.registerPlugin(ScrollTrigger);
const socials = [
  {
    name: 'faceook',
    icons: <FacebookIcon />,
    url: 'https://www.facebook.com/InfoBondWest',
  },
  {
    name: 'LinkedIn',
    icons: <LinkedInIcon />,
    url: 'https://www.linkedin.com/company/bondwest/',
  },
  {
    name: 'Twitter',
    icons: <TwitterIcon />,
    url: 'https://twitter.com/InfoBondWest',
  },
  {
    name: 'Instagram',
    icons: <InstagramIcon />,
    url: 'https://www.instagram.com/bondwestofficial/',
  },
];

const pages = [
  {
    name: 'Pricing',
    link: '/pricing',
    target: '',
  },
  {
    name: 'About Us',
    link: 'https://bondwest.co.uk/about/',
    target: '_blank',
  },
  {
    name: 'Features',
    link: '/casestudy',
    target: '',
  },
  {
    name: 'Case Study',
    link: 'casestudy',
    target: '',
  },
  {
    name: 'Contact Us',
    link: '/contactUs',
    target: '',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = ({ targetRef }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const appBarRef = useRef(null);
  const topBarRef = useRef(null);

  useEffect(() => {
    gsap.set(appBarRef.current, { backgroundColor: 'transparent' });
    gsap.set(topBarRef.current, { height: '100%', padding: '8px' });

    ScrollTrigger.create({
      start: 'top',
      end: 'bottom',
      onEnter: () => {
        gsap.to(appBarRef.current, {
          backgroundColor: '#242d38',
          duration: 0.5,
        });
        gsap.to(topBarRef.current, {
          height: 0,
          padding: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(topBarRef.current, { display: 'none' });
          },
        });
      },
      onLeaveBack: () => {
        gsap.set(topBarRef.current, { display: 'block' });
        gsap.to(topBarRef.current, {
          height: '100%',
          padding: '8px',
          duration: 0.2,
        });
        gsap.to(appBarRef.current, {
          backgroundColor: 'transparent',
          duration: 0.3,
        });
      },
    });
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: 'transparent' }}
        ref={appBarRef}
      >
        {!mobileDevice && (
          <Box p={1} sx={{ backgroundColor: '#01ab56' }} ref={topBarRef}>
            <Container>
              <Box display="flex">
                <Box flexGrow={1}>
                  {socials.map((item) => {
                    return (
                      <IconButton
                        href={item.url}
                        target="_blank"
                        aria-label="fingerprint"
                        size="small"
                        sx={{
                          bgcolor: 'white',
                          color: '#01ab56',
                          mr: 1,
                          '&:hover': {
                            backgroundColor: 'rgb(0, 119, 60)',
                            boxShadow:
                              '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                          },
                        }}
                      >
                        {item.icons}
                      </IconButton>
                    );
                  })}
                </Box>
                <Box display="flex" alignItems="center">
                  {/* <Button
                    component={RouterLink}
                    to="/contactUs"
                    variant="outlined"
                    sx={{
                      mr: 1,
                      color: 'white',
                      border: '1px solid white',
                      '&:hover': {
                        border: '1px solid white',
                      },
                    }}
                  >
                    We are Hiring
                  </Button> */}
                  <Button
                    href="tel:+18554440797"
                    sx={{
                      mr: 3,
                      color: 'white',
                      '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '8px',
                      },
                    }}
                  >
                    +1 855 444 0797
                  </Button>
                  <Button
                    component={RouterLink}
                    to="https://fleetvantage.bondwest.co.uk/authentication/login"
                    sx={{
                      color: 'white',
                      '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '8px',
                      },
                    }}
                    endIcon={<LoginIcon />}
                  >
                    log in
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        )}

        <Container>
          <Toolbar disableGutters>
            <Logo
              sx={{
                display: {
                  lg: 'flex',
                  xs: 'none',
                },
                mr: 1,
              }}
              height={52}
              width={52}
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', lg: 'flex' },
                fontWeight: 700,
                color: '#01ab56',
                textDecoration: 'none',
              }}
            >
              FleetVantage
            </Typography>

            <Logo
              sx={{
                display: {
                  xs: 'flex',
                  lg: 'none',
                },
                mr: 1,
              }}
              height={52}
              width={52}
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { lg: 'none', xs: 'flex' },
                fontWeight: 700,
                color: '#01ab56',
                textDecoration: 'none',
              }}
            >
              FleetVantage
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{ flexGrow: 0, mr: 1, display: { xs: 'none', lg: 'flex' } }}
            >
              {pages.map((page, index) => (
                <React.Fragment key={index}>
                  {index === 1 ? (
                    <>
                      <Button
                        key={page.name}
                        // onClick={handleCloseNavMenu}
                        sx={{
                          mr: 2,
                          color: '#01ab56',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '8px',
                          },
                        }}
                        href={page.link}
                        target={page.target}
                      >
                        {page.name}
                      </Button>
                    </>
                  ) : index === 0 ? (
                    <>
                      <Button
                        key={page.name}
                        onClick={scrollToTarget}
                        sx={{
                          mr: 2,
                          color: '#01ab56',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '8px',
                          },
                        }}
                        target={page.target}
                      >
                        {page.name}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        key={page.name}
                        component={RouterLink}
                        to={page.link}
                        sx={{
                          mr: 2,
                          color: '#01ab56',
                          display: 'block',
                          '&:hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '8px',
                          },
                        }}
                        target={page.target}
                      >
                        {page.name}
                      </Button>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'flex' } }}>
              <Button
                component={RouterLink}
                to="https://fms-demo.bondwest.co.uk/authentication/login"
                variant="outlined"
                sx={{
                  mr: 1,
                  color: '#01ab56',
                  border: '1px solid rgba(1, 171, 86, 0.5)',
                  '&:hover': {
                    border: '1px solid rgba(1, 171, 86, 1)',
                  },
                }}
              >
                Demo
              </Button>
              <Button
                component={RouterLink}
                to="/authentication/register"
                variant="contained"
                sx={{
                  color: '#ffffff',
                  backgroundColor: '#01ab56',
                  '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: 'rgb(0, 119, 60)',
                    boxShadow:
                      '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                  },
                }}
              >
                Register For Free
              </Button>
            </Box>
            <Box
              sx={{ flexGrow: 0, mr: 1, display: { xs: 'flex', lg: 'none' } }}
            >
              {/* <Box sx={{ bgcolor: "#242D38" }}> */}
              <IconButton
                size="large"
                onClick={handleOpen}
                color="inherit"
                sx={{
                  color: '#01ab56',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Dialog open={open} fullScreen TransitionComponent={Transition}>
                <Box sx={{ bgcolor: '#242D38', height: '100vh' }}>
                  <AppBar sx={{ position: 'relative', bgcolor: '#242D38' }}>
                    <Toolbar>
                      <Logo
                        sx={{
                          display: {
                            sm: 'flex',
                            lg: 'none',
                          },
                          mr: 1,
                        }}
                        height={52}
                        width={52}
                      />
                      <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                          mr: 2,
                          display: { lg: 'none', sm: 'flex' },
                          fontWeight: 700,
                          color: '#01ab56',
                          textDecoration: 'none',
                        }}
                      >
                        FleetVantage
                      </Typography>
                      <Box sx={{ flex: 1 }} />
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        size="large"
                        aria-label="close"
                        sx={{
                          color: '#01ab56',
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>

                  <List>
                    {pages.map((page, index) => (
                      <React.Fragment key={index}>
                        {index === 1 ? (
                          <>
                            <ListItemButton href={page.link} component="a">
                              <ListItemText
                                sx={{
                                  color: '#01ab56',
                                  textAlign: 'center',
                                  fontWeight: 800,
                                }}
                                primary={page.name}
                              />
                            </ListItemButton>
                            <Divider />
                          </>
                        ) : (
                          <>
                            <ListItemButton
                              to={page.link}
                              component={RouterLink}
                            >
                              <ListItemText
                                sx={{
                                  color: '#01ab56',
                                  textAlign: 'center',
                                  fontWeight: 800,
                                }}
                                primary={page.name}
                              />
                            </ListItemButton>
                            <Divider />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                  <Button
                    component={RouterLink}
                    to="https://fms-demo.bondwest.co.uk/authentication/login"
                    size="large"
                    variant="outlined"
                    sx={{
                      mr: 1,
                      color: '#01ab56',
                      borderRadius: 0,
                      border: '1px solid rgba(1, 171, 86, 0.5)',
                      '&:hover': {
                        border: '1px solid rgba(1, 171, 86, 1)',
                      },
                    }}
                    fullWidth
                  >
                    Demo
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/authentication/register"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                      color: '#ffffff',
                      backgroundColor: '#01ab56',
                      borderRadius: 0,
                      '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'rgb(0, 119, 60)',
                        boxShadow:
                          '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                      },
                    }}
                  >
                    Register For Free
                  </Button>
                </Box>
              </Dialog>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
