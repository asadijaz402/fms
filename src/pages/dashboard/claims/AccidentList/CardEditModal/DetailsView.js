import React from "react";
import moment from "moment";
import { Table, Paper, TableBody, TableCell, TableRow } from "@mui/material";

function OrderInfo({ value }) {
  return (
    <Paper elevation={0} variant="outlined">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Date of Incident</TableCell>
            <TableCell>
              {moment(value.date, "YYYY-MM-DDTHH:mm:ssZ").format(
                "MMM DD YYYY (HH:mm)"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type of Incident</TableCell>
            <TableCell>{value.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{value.location}</TableCell>
          </TableRow>
          {value.booking && (
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>
                <div>{value.booking.customer.name}</div>
                <div>{value.booking.customer.email}</div>
                <div>{value.booking.customer.mobile}</div>
              </TableCell>
            </TableRow>
          )}
          {value.booking && (
            <TableRow>
              <TableCell>Booking Info</TableCell>
              <TableCell>
                <div>#{value.booking.booking_id}</div>
                <div>
                  {moment(value.booking.start_date, "YYYY-MM-DD").format(
                    "MMMM DD YYYY"
                  ) +
                    " - " +
                    moment(value.booking.end_date, "YYYY-MM-DD").format(
                      "MMM DD YYYY"
                    )}
                </div>
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell>Driver Name</TableCell>
            <TableCell>{value.driver_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Opinion</TableCell>
            <TableCell>
              {value.customer_opinion ? value.customer_opinion : "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date Added</TableCell>
            <TableCell>
              {moment(value.created_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                "MMM DD YYYY (HH:mm)"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Update</TableCell>
            <TableCell>
              {moment(value.updated_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                "MMM DD YYYY (HH:mm)"
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default OrderInfo;
