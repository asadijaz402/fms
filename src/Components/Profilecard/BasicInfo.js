import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Card,
  CardHeader,
} from '@mui/material';

const BasicInfo = ({ customer, className, ...props }) => {
  let vehicle = props.vehicle;
  console.log(vehicle);
  return (
    <Card>
      <CardHeader title='Basic Info' />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Registration Number
              </Typography>
            </TableCell>
            <TableCell align='right'>{vehicle.vehicle_reg_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Ownership
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.ownership && vehicle.ownership.owner}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Type
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.vehicle_type_id && vehicle.vehicle_type_id.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Dealer
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.manufacturer_id && vehicle.manufacturer_id.company}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Depot
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.depot_id && vehicle.depot_id.details}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Model
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.model ? vehicle.model : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Vin
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.vin ? vehicle.vin : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Tracker
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.tracker_id ? vehicle.tracker_id.code : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Group
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.group_id ? vehicle.group_id : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color='textPrimary' variant='subtitle2'>
                Vehicle weight
              </Typography>
            </TableCell>
            <TableCell align='right'>
              {vehicle.revenueWeight ? vehicle.revenueWeight : 'N/A'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

BasicInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired,
};

export default BasicInfo;
