import {
  Button,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import useExport from "../../../hooks/useExport";
import DownloadIcon from "../../../icons/Download";

export default function MasterExport() {
  const { onClickExport } = useExport("csv", "vehicle/download");

  const rows = [
    { title: "Vehicle Data", url: "vehicle/download" },
    { title: "Booking Data", url: "hiring/rental_records/download" },
    { title: "Servicing Data", url: "vehicle_accessories/service/download" },
    { title: "Brakes Data", url: "vehicle_accessories/brakes/download" },
    { title: "Tyres Data", url: "vehicle_accessories/tyres/download" },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell align="right">Export</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    startIcon={<DownloadIcon fontSize="small" />}
                    // sx={{ m: 1 }}
                    onClick={() => onClickExport(row?.url)}
                  >
                    Export
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
