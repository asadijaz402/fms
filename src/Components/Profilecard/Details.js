import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const Details = ({ customer, className, ...props }) => {
  let vehicle = props.vehicle;

  return (
    <Card>
      <CardHeader title="Other Details" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Year Manufacture
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.yearofmanufacture ? vehicle.yearofmanufacture : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Cylinder Capacity
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.cylindercapacity ? vehicle.cylindercapacity : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Transmission
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.transmission ? vehicle.transmission : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                CO2 Emissions
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.co2Emissions ? vehicle.co2Emissions : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Fuel Type
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.fuelType ? vehicle.fuelType : "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Color
              </Typography>
            </TableCell>
            <TableCell align="right">
              {vehicle.colour ? vehicle.colour : "N/A"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired,
};

export default Details;
