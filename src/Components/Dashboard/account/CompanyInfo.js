import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { listData } from '../../../slices/CustomSlices/actions/apiActions';
import moment from 'moment';
import { Invoice } from './Invoice';
import { Link } from 'react-router-dom';

const CompanyInfo = (props) => {
  const dispatch = useDispatch();
  const [activePlan, setActivePlan] = useState({});
  const [open, setOpen] = useState(false);
  let id_token = useSelector((state) => state.user.id_token);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(listData('company', id_token, false)).then((res) =>
      setData(res?.data || [])
    );
    dispatch(listData('company/active_plan', id_token, false)).then((res) =>
      setActivePlan(res?.data || {})
    );
    // eslint-disable-next-line
  }, []);

  function createData(name, text) {
    return { name, text };
  }
  const rows = [
    createData('Subscription Class', data?.subscriptionClass?.name),
    // createData("Vehicle Limit", data?.subscriptionClass?.limit_vehicle),
    createData('Per slot cost', data?.subscriptionClass?.cost),
    createData('status', data?.active ? 'Active' : 'diactive'),
    // createData("Member", data?.member?.length),
    createData('Slots Bought', activePlan?.vehicle_slots_bought),
    createData(
      'Expiry Date',
      moment(activePlan?.next_scheduled_charge_date, 'YYYY-MM-DD').toString()
    ),
  ];

  return (
    <>
      <Grid container spacing={3} {...props}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Card>
            <CardHeader
              title="Subscription Plan"
              action={
                <Box>
                  <Button
                    style={{ marginRight: '5px' }}
                    variant="outlined"
                    onClick={() => setOpen(true)}
                  >
                    Invoice
                  </Button>
                  <Button component={Link} to="/pricing" variant="outlined">
                    Plan Upgrade
                  </Button>
                </Box>
              }
            />

            <Divider />
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.text}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>Invoice</DialogTitle>
        <Invoice />
      </Dialog>
    </>
  );
};

export default CompanyInfo;
