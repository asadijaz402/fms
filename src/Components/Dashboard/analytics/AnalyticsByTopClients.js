import { useState } from "react";
import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import InformationCircleIcon from "../../../icons/InformationCircle";

const sortCountries = (countries, order) =>
  countries.sort((a, b) => {
    if (order === "asc") {
      return a.seo < b.seo ? -1 : 1;
    }

    return a.seo > b.seo ? -1 : 1;
  });

const countries = [
  {
    code: "AB",
    name: "Client 01",
    seo: 40,
    visits: 31200,
  },
  {
    code: "ABC",
    name: "Client 02",
    seo: 47,
    visits: 12700,
  },
  {
    code: "A1",
    name: "Client 03",
    seo: 65,
    visits: 10360,
  },
  {
    code: "AB3",
    name: "Client 04",
    seo: 23,
    visits: 5749,
  },
  {
    code: "ABF",
    name: "Client 05",
    seo: 45,
    visits: 2932,
  },
];

const AnalyticsByTopClients = (props) => {
  const [order, setOrder] = useState("desc");

  const handleSort = () => {
    setOrder((prevOrder) => {
      if (prevOrder === "asc") {
        return "desc";
      }

      return "asc";
    });
  };

  const sortedCountries = sortCountries(countries, order);

  return (
    <Card {...props}>
      <CardHeader
        disableTypography
        title={
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography color="textPrimary" variant="h6">
              Top Clients
            </Typography>
            <Tooltip title="Refresh rate is 24h">
              <InformationCircleIcon fontSize="small" />
            </Tooltip>
          </Box>
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell sortDirection={order}>
              <TableSortLabel active direction={order} onClick={handleSort}>
                Successful Bookings
              </TableSortLabel>
            </TableCell>
            <TableCell>Invoice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCountries.map((country) => (
            <TableRow
              key={country.name}
              sx={{
                "&:last-child td": {
                  border: 0,
                },
              }}
            >
              <TableCell>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {/* <Box
                    sx={{
                      height: 36,
                      width: 36,
                      "& img": {
                        height: 36,
                        width: 36,
                      },
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      sx={{ ml: 2 }}
                      variant="subtitle2"
                    >
                      {country.code}
                    </Typography>
                  </Box> */}
                  <Typography
                    color="textPrimary"
                    // sx={{ ml: 2 }}
                    variant="subtitle2"
                  >
                    {country.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{numeral(country.seo).format("0,0")}</TableCell>
              <TableCell>{numeral(country.visits).format("0,0")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AnalyticsByTopClients;
