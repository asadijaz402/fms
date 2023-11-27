import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

function OrderInfo({ card, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Card information" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Date of Incident</TableCell>
            <TableCell>
              {moment(card.date, "YYYY-MM-DDTHH:mm:ssZ").format(
                "MMM DD YYYY (HH:mm)"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type of Incident</TableCell>
            <TableCell>{card.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{card.location}</TableCell>
          </TableRow>
          {card.booking && (
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>
                <div>{card.booking.customer.name}</div>
                <div>{card.booking.customer.email}</div>
                <div>{card.booking.customer.mobile}</div>
              </TableCell>
            </TableRow>
          )}
          {card.booking && (
            <TableRow>
              <TableCell>Booking Info</TableCell>
              <TableCell>
                <div>#{card.booking.booking_id}</div>
                <div>
                  {moment(card.booking.start_date, "YYYY-MM-DD").format(
                    "MMMM DD YYYY"
                  ) +
                    " - " +
                    moment(card.booking.end_date, "YYYY-MM-DD").format(
                      "MMMM DD YYYY"
                    )}
                </div>
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell>Driver Name</TableCell>
            <TableCell>{card.driver_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Opinion</TableCell>
            <TableCell>{card.customer_opinion}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date Added</TableCell>
            <TableCell>
              {moment(card.created_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                "DD/MM/YYYY HH:MM"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Update</TableCell>
            <TableCell>
              {moment(card.updated_at, "YYYY-MM-DDTHH:mm:ssZ").format(
                "DD/MM/YYYY HH:MM"
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

OrderInfo.propTypes = {
  className: PropTypes.string,
  card: PropTypes.object.isRequired,
};

export default OrderInfo;
