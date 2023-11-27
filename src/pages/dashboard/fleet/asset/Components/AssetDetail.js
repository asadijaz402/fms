import React from 'react';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Label from '../../../../../Components/Label';
import moment from 'moment';

const AssetDetail = ({ details }) => {
  return (
    <Card>
      <CardHeader title="Asset Details" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details?.name}
              </Typography>
              <Label color={!details?.de_fleeted ? 'success' : 'error'}>
                {!details?.de_fleeted ? 'Is Active' : 'Removed from Fleet'}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Bought Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details?.bought_date
                  ? moment(details?.bought_date).toString()
                  : 'N/A'}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Expiry Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details?.expiry_date
                  ? moment(details?.expiry_date).toString()
                  : 'N/A'}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Last Updated
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {moment(details?.updated_at).toString()}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Created at
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {moment(details?.created_at).toString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default AssetDetail;
