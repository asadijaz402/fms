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
import Label from "../../../../../../Components/Label";
const CustomerContactDetails = ({ details }) => {
  return (
    <Card>
      <CardHeader title="Vehicle Details" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Registered #
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details.vehicle_reg_no}
              </Typography>
              <Label color={!details.de_fleeted ? "success" : "error"}>
                {!details.de_fleeted ? "Is Active" : "Removed from Fleet"}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                v5c #
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details.v5c_number}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Make
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details.manufacturer_id.name}
              </Typography>
              <Label color={"info"}>{details.vehicle_type_id.name}</Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Owned By
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details.supplier_id ? (
                  <>
                    {details.supplier_id?.first_name +
                      " " +
                      details.supplier_id?.last_name}
                    <br />
                    {details.supplier_id?.contact}
                    <br />
                    {details.supplier_id?.email}
                    <br />
                    {details.supplier_id?.details}
                  </>
                ) : (
                  <>
                    {details.employee_id?.first_name +
                      " " +
                      details.employee_id?.last_name}
                    <br />
                    {details.employee_id?.email}
                  </>
                )}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="textPrimary" variant="subtitle2">
                Depot
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="body2">
                {details.depot_id.details}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default CustomerContactDetails;
