import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import AuthBanner from "../../Components/authentication/AuthBanner";
import { LoginJWT } from "../../Components/authentication/login";
import Logo from "../../Components/Logo";
import useAuth from "../../hooks/useAuth";
import gtm from "../../lib/gtm";

const platformIcons = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Login = () => {
  const { platform } = useAuth();
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window?.location.hostname);
    // eslint-disable-next-line
  }, [window]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Login | Fleet Management System</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}>
        <AuthBanner />
        <Container maxWidth='sm' sx={{ py: "80px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 8,
            }}>
            <RouterLink to='/'>
              <Logo
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
            </RouterLink>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 4,
              }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}>
                <div>
                  <Typography color='textPrimary' gutterBottom variant='h4'>
                    Log in
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    Log in on the internal platform
                  </Typography>
                </div>
                <Box
                  sx={{
                    height: 32,
                    "& > img": {
                      maxHeight: "100%",
                      width: "auto",
                    },
                  }}>
                  <img alt='Auth platform' src={platformIcons[platform]} />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}>
                {platform === "JWT" && <LoginJWT />}
              </Box>
              <Divider sx={{ my: 3 }} />
              {host !== "demo-fleetvantage.bondwest.co.uk" && (
                <Box display='flex'>
                  <Box flexGrow={1}>
                    <Link
                      color='textSecondary'
                      component={RouterLink}
                      to='/authentication/password-recovery'
                      variant='body2'>
                      Forgot password
                    </Link>
                  </Box>
                  <Box>
                    <Link
                      color='textSecondary'
                      component={RouterLink}
                      to='/authentication/register'
                      variant='body2'>
                      Create New Account
                    </Link>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
