import { Box, Typography } from '@mui/material';
import { ListElement } from '../../vehicleDetails/Components/Tracker/Summary/components/ListElement';

export const JSONcode = `[
    {
        "vehicle_reg_no": "35401-2437A",
        "v5c_number": "94079-7726",
        "cost_daily": "234",
        "cost_seven_days": "60",
        "cost_twenty_eight_days": "296",
        "vehicle_type_id": "4",
        "depot_id": "1",
        "manufacturer_id": "3",
        "supplier_id": "2",
        "employee_id": ""
    }
]`;

const JSONprops = [
  {
    heading: 'vehicle_reg_no',
    content: 'String → Vehicle Plate number',
  },
  {
    heading: 'v5c_number',
    content: 'String → Other identification number',
  },
  {
    heading: 'cost_daily',
    content: 'String → Set Default 0 if wants to leave empty.',
  },
  {
    heading: 'cost_seven_days',
    content: 'String → Set Default 0 if wants to leave empty.',
  },
  {
    heading: 'cost_twenty_eight_days',
    content: 'String → Set Default 0 if wants to leave empty.',
  },
  {
    heading: 'vehicle_type_id',
    content: 'Int/String → Id is provided in Submodules page',
  },
  {
    heading: 'depot_id',
    content: 'String → Id is provided in Submodules page',
  },
  {
    heading: 'manufacturer_id',
    content: 'String → Id is provided in Submodules page',
  },
  {
    heading: 'supplier_id',
    content: 'String → Id is provided in Suppliers page',
  },
  {
    heading: 'employee_id',
    content: 'String → Id is provided in Sub Users page',
  },
];

export const JSONhelp = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        <strong>Key Values:</strong>
      </Typography>
      {JSONprops.map((row) => {
        return <ListElement heading={row.heading} content={row.content} />;
      })}
    </Box>
  );
};
