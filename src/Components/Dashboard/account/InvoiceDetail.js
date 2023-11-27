import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { getData } from '../../../slices/CustomSlices/actions/apiActions';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Container } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  logo: {
    width: '20%',
    maxWidth: 70,
  },
  companyDetails: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const InvoiceDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  let id_token = localStorage.getItem('accessToken');

  useEffect(() => {
    setLoading(true);
    dispatch(getData(id, 'company/invoice', id_token)).then((res) => {
      setData(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src="/images/logo.png" alt="Logo" className={classes.logo} />
            <Typography variant="h6">Fleet Vantage</Typography>
          </Grid>
          <Grid item xs={12} className={classes.companyDetails}>
            <Typography variant="subtitle1">
              52 Lozells road,
              <br /> Lozells Birmingham,
              <br /> UK
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography variant="h5">Invoice #{data?.id}</Typography>
              <Typography variant="subtitle1">
                Date: {moment(data?.created_at).toString()} ({data?.created_at})
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Plan Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Payment Status</TableCell>
                    <TableCell align="right">Total Slots</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data?.other?.product_data?.name}</TableCell>
                    <TableCell align="right">
                      {data.other?.product_data?.description}
                    </TableCell>
                    <TableCell align="right">{data?.status}</TableCell>
                    <TableCell align="right">
                      {data?.other?.vehicle_count}
                    </TableCell>
                    <TableCell align="right">
                      {data?.currency} {data?.amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {data?.currency} {data?.amount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {data?.currency} {data?.amount}
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.print()}
              startIcon={<PrintIcon />}
            >
              Print - {moment().format('YYYY-MM-DD')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
