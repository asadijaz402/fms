// import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TableBody,
  Table,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";

import moment from "moment";
import ProfileCard from "../../../../../Components/Profilecard/Card";

// const PrecheckComp = (vehicleId, getPrecheckHistory, value = false) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getPrecheckHistory(vehicleId).then((res) => {
//       setData(res);
//     });
//     // eslint-disable-next-line
//   }, []);

//   if (data.length !== 0) {
//     if (value === 'due_date') {
//       let difff = moment(data[0].due_date, 'YYYY-MM-DDThh:mm:ss').diff(
//         moment(),
//         'hours'
//       );
//       if (difff < 0) {
//         return '-';
//       } else {
//         return difff + ' hours';
//       }
//     } else {
//       let difff = moment(data[0].due_date, 'YYYY-MM-DDThh:mm:ss').diff(
//         moment(),
//         'hours'
//       );
//       if (difff < 0) {
//         return '-';
//       } else {
//         return moment(data[0].date_added, 'YYYY-MM-DDThh:mm:ss').format(
//           'ddd, DD MMM YYYY'
//         );
//       }
//     }
//   } else {
//     return '-';
//   }
// };

const ProjectBrief = (props) => {
  const { description, vehicles, title, ...other } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="overline">
              Booking Group ID
            </Typography>
            <Typography color="textPrimary" variant="subtitle2">
              {title}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography color="textSecondary" variant="overline">
                Start Date
              </Typography>
              <Typography color="textPrimary" variant="subtitle2">
                {moment(vehicles[0].start_date).format("ddd, DD MMM YYYY")}
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography color="textSecondary" variant="overline">
                End Date
              </Typography>
              <Typography color="textPrimary" variant="subtitle2">
                {moment(vehicles[0].end_date).format("ddd, DD MMM YYYY")}
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography color="textSecondary" variant="overline">
                Total days booked
              </Typography>
              <Typography color="textPrimary" variant="subtitle2">
                {moment
                  .duration(
                    moment(vehicles[0].end_date).diff(
                      moment(vehicles[0].start_date)
                    )
                  )
                  .asDays()}{" "}
                days
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography color="textSecondary" variant="overline">
                Vehicles
              </Typography>
              <Box sx={{ mt: 1 }} display="flex">
                <Table sx={{ width: "100%" }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Booking #</TableCell>
                      <TableCell>Vehicle</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicles.map((vehicle) => {
                      return (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.id}</TableCell>
                          <TableCell>
                            <ProfileCard
                              reg_number={vehicle.vehicle.vehicle_reg_no}
                              vehicle_id={vehicle.vehicle.id}
                            />
                          </TableCell>
                          {/* <TableCell align='right'>
                            {PrecheckComp(
                              vehicle.vehicle.id,
                              getPrecheckHistory
                            )}
                          </TableCell>
                          <TableCell align='right'>
                            {PrecheckComp(
                              vehicle.vehicle.id,
                              getPrecheckHistory,
                              'due_date'
                            )}
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProjectBrief;
