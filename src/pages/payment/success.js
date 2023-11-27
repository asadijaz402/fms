import { useEffect, useState } from 'react';
import {
  Box,
  CardContent,
  Card,
  Typography,
  Container,
  Button,
  CircularProgress,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../slices/CustomSlices/actions/apiActions';
import moment from 'moment';
import Logo from '../../Components/Logo';

export default function Success() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const params = new URLSearchParams(search);

  const fetchData = (id) => {
    setLoading(true);
    dispatch(getData(id, 'paymentgateway', id_token, false)).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(params.get('id'));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Success</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="sm" sx={{ py: '80px' }}>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
          </Box>
          <Card>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', p: 4 }}
            >
              <Typography variant="h5" align="center" color="success">
                <CheckCircleIcon fontSize="large" color="success" />
              </Typography>
              <Typography
                color="primary"
                variant="h5"
                sx={{ mt: 2 }}
                align="center"
              >
                Payment Successful!
              </Typography>
              <Typography
                color="GrayText"
                variant="body1"
                sx={{ mb: 2 }}
                align="center"
              >
                Thank you for purchasing. {!loading && 'Info is as follows.'}
              </Typography>
              <Box mr={1} ml={1} mb={2} mt={2}>
                {params.get('id') &&
                  (loading ? (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          <b>Plan:</b>
                        </Typography>
                        <Typography variant="body1" align="right">
                          {data.other.product_data.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          <b>Description:</b>
                        </Typography>
                        <Typography variant="body1" align="right">
                          {data.other.product_data.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          <b>Cost:</b>
                        </Typography>
                        <Typography variant="body1">
                          {'£ ' + data.amount}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          <b>Date:</b>
                        </Typography>
                        <Typography variant="body1">
                          {moment(data.created_at, 'YYYY-MM-DDThh:mm').format(
                            'ddd, Do MMM YYYY'
                          )}
                        </Typography>
                      </Box>
                    </>
                  ))}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  component={Link}
                  to="/account"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Go to Home
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
