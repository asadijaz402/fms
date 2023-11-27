import {
  Card,
  Divider,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from '@mui/material';
import {
  labelGenerator,
  isValidUrl,
} from '../../../../Components/DynamicDataTable/helpers';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function DriverCustomDetailsCard({ details }) {
  return (
    <Card>
      <CardHeader title="Driver Custom Info" />
      <Divider />
      <Table>
        <TableBody>
          {Object.keys(details.customFields).length !== 0 ? (
            Object.keys(details.customFields).map((n) => {
              let row = details.customFields[n];
              return (
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="body2">
                      {row?.label && labelGenerator(row.label)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {isValidUrl(row.value) ? (
                      <Button
                        size="small"
                        target="_blank"
                        component={'a'}
                        variant="contained"
                        href={row.value}
                        endIcon={<OpenInNewIcon fontSize="small" />}
                      >
                        View
                      </Button>
                    ) : (
                      <Typography color="textSecondary" variant="body2">
                        {row.value}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Typography variant="body1">Data not available.</Typography>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
