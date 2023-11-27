import { useState, useEffect } from "react";
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
  Tooltip,
  Typography,
} from "@mui/material";
// import ExternalLinkIcon from "../../../icons/ExternalLink";
import InformationCircleIcon from "../../../icons/InformationCircle";
import { useDispatch, useSelector } from "react-redux";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import CircularProgress from "../../CircularProgress";
import EditVorDialog from "../../../pages/dashboard/fleet/vehicles/VOR/Components/Dialog/EditVORDialog";

const sortData = (x) => {
  let query = x.sort((a, b) => {
    return -(a.count - b.count);
  });
  return query;
};

const VOR = () => {
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(listData("vehicle/dashboard/vortypes", id_token, false)).then(
      (res) => {
        setData(sortData(res.data));
        setLoading(false);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
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
              Vehicle Off Road (Garages)
            </Typography>
            <Tooltip title="Refresh rate is 24h">
              <InformationCircleIcon fontSize="small" />
            </Tooltip>
          </Box>
        }
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Garage</TableCell>
              <TableCell>Vehicles</TableCell>
              {/* <TableCell>Unique page visits</TableCell>
              <TableCell>Bounce rate</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              if (row.name && row.vehicles !== 0) {
                return (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <ExternalLinkIcon
                          fontSize="small"
                          sx={{
                            color: "text.secondary",
                            cursor: "pointer",
                          }}
                        /> */}
                        <EditVorDialog rowId={row.id} viewVehicles />
                        <Typography
                          color="textPrimary"
                          sx={{ ml: 2 }}
                          variant="body2"
                        >
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{numeral(row.vehicles).format("0,0")}</TableCell>
                    {/* <TableCell>
                  {numeral(page.uniqueVisits).format("0,0")}
                </TableCell>
                <TableCell>{page.bounceRate}%</TableCell> */}
                  </TableRow>
                );
              } else {
                return null;
              }
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default VOR;
