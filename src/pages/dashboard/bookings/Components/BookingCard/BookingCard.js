import React from "react";
import {
  CircularProgress,
  Box,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  CardHeader,
  Grid,
  Table,
  Card,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import useBookingCard from "./useBookingCard";
import moment from "moment";
import AddingBooking from "../AddingBooking/AddingBooking";

export default function BookingCard({ rowId }) {
  const { loading, value } = useBookingCard(rowId);

  if (loading) {
    return (
      <Box width="100%" style={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <Table>
                  <CardHeader title="Vehicle Details" />
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>Registration Number</b>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.vehicle.vehicle_reg_no}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Hire Status</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.vehicle.hire_status ? (
                            <div style={{ color: "#18CD70" }}>
                              <CheckCircleIcon />
                            </div>
                          ) : (
                            <div style={{ color: "#FF4570" }}>
                              <CancelIcon />
                            </div>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardHeader title="Customer Details" />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.customer.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Email</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.customer.email}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardHeader title="Booking Details" />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>Start Date</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.start_date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>End Date</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.end_date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Booking ID</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.booking_id}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardHeader title="Delivery Details" />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>We Deliver</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.delivery ? (
                            <div style={{ color: "#18CD70" }}>
                              <CheckCircleIcon />
                            </div>
                          ) : (
                            <div style={{ color: "#FF4570" }}>
                              <CancelIcon />
                            </div>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {value.delivery && (
                      <>
                        <TableRow>
                          <TableCell>
                            <b>Delivery Address</b>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="textSecondary">
                              {value.delivery_details &&
                                value.delivery_details.delivery_address}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Delivery Time</b>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="textSecondary">
                              {value.delivery_details &&
                                moment(
                                  value.delivery_details.delivery_date,
                                  "YYYY-MM-DDTHH:mm:ssZ"
                                ).format("DD/MM/YYYY")}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardHeader title="Collection Details" />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>We Collect</b>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="textSecondary">
                          {value.collection_at_depot ? (
                            <div style={{ color: "#18CD70" }}>
                              <CheckCircleIcon />
                            </div>
                          ) : (
                            <div style={{ color: "#FF4570" }}>
                              <CancelIcon />
                            </div>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {value.collection_at_depot && (
                      <>
                        <TableRow>
                          <TableCell>
                            <b>Collection Address</b>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="textSecondary">
                              {value.collection_details &&
                                value.collection_details.collection_address}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Collection Time</b>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="textSecondary">
                              {value.collection_details &&
                                moment(
                                  value.collection_details.collection_date,
                                  "YYYY-MM-DDTHH:mm:ssZ"
                                ).format("DD/MM/YYYY")}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <AddingBooking rowId={rowId} />
        </Box>
      </>
    );
  }
}
