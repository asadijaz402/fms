import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Card,
  TableCell,
  TableBody,
  TableRow,
  Box,
  Typography,
  Table,
  Button,
  TableHead,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ProfileCard from '../../Profilecard/Card';
import moment from 'moment';
import PrecheckDialog from '../../../pages/dashboard/fleet/precheck/Components/Dialogs/PrecheckDialog';
import DynamicUpload from '../../DynamicUpload/DynamicUpload';
// import SearchTableAvailableVehicle from "../../../pages/dashboard/bookings/Components/AddingBooking/Dialog/SearchTableAvailableVehicle";

const PrecheckComp = (vehicleId, getPrecheckHistory, value = false) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPrecheckHistory(vehicleId).then((res) => {
      setData(res);
    });
    // eslint-disable-next-line
  }, []);

  if (data.length !== 0) {
    if (value === 'due_date') {
      return moment(data[0].due_date, 'YYYY-MM-DDThh:mm:ss').from();
    } else {
      return moment(data[0].date_added, 'YYYY-MM-DDThh:mm:ss').format(
        'ddd, DD MMM YYYY'
      );
    }
  } else {
    return '-';
  }
};

// function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }

export default function Precheck({
  data,
  getPrecheckHistory,
  // addVehicles,
  removeVehicle,
  disabled = false,
  // status = 0,
}) {
  // const [values, setValue] = useState({
  //   vehicles: { data: [] },
  // });

  // const onChange = (e) => {
  //   setValue({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // useEffect(() => {
  //   if (values.vehicles) {
  //     let temp_values = values.vehicles.data.map((val) => val.id);
  //     temp_values = temp_values.filter(onlyUnique);
  //     temp_values.map((val) => {
  //       let vehicle = data.filter((row) => row.vehicle.id !== val);
  //       if (vehicle.length !== 0) {
  //         addVehicles(val);
  //       }
  //       return null;
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [values]);

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography color="textSecondary" variant="overline">
                Vehicles
              </Typography>
            </Box>
            {/* {status < 5 && (
            <Box>
              <SearchTableAvailableVehicle
                value={{
                  date_range: {
                    start_date: data[0].start_date,
                    end_date: data[0].end_date,
                  },
                }}
                onChange={onChange}
                booking={true}
              />
            </Box>
          )} */}
          </Box>

          <Box sx={{ mt: 1 }} display="flex">
            <Table sx={{ width: '100%' }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Booking #</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell align="right">Precheck Added</TableCell>
                  <TableCell align="right">Precheck Expiry</TableCell>
                  {!disabled && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((vehicle) => {
                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.id}</TableCell>
                      <TableCell>
                        <ProfileCard
                          reg_number={vehicle.vehicle.vehicle_reg_no}
                          vehicle_id={vehicle.vehicle.id}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {PrecheckComp(vehicle.vehicle.id, getPrecheckHistory)}
                      </TableCell>
                      <TableCell align="right">
                        {PrecheckComp(
                          vehicle.vehicle.id,
                          getPrecheckHistory,
                          'due_date'
                        )}
                      </TableCell>
                      {!disabled && (
                        <TableCell align="right">
                          <Box display="flex" justifyContent="flex-end">
                            <Box>
                              <PrecheckDialog
                                tableMeta={{
                                  rowData: [
                                    vehicle.vehicle.id,
                                    vehicle.vehicle.vehicle_reg_no,
                                  ],
                                }}
                                vehicleId={vehicle.vehicle.id}
                              />
                            </Box>
                            {!disabled ||
                              (data.length !== 1 && (
                                <Box ml={1}>
                                  <Button
                                    onClick={() => removeVehicle(vehicle.id)}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    size="small"
                                  >
                                    Delete
                                  </Button>
                                </Box>
                              ))}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
      <Box mt={2}>
        <DynamicUpload
          appModel="hiring_rental_records"
          rows={data}
          label={'Vehicle:'}
          labelKey={'row.vehicle.vehicle_reg_no'}
        />
      </Box>
    </>
  );
}
