import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export default function SelectFieldWidget({ children, ...props }) {
  return (
    <FormControl {...props}>
      {props.label && <InputLabel>{props.label}</InputLabel>}
      <Select {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.options.map((row) => {
          if (typeof row === 'object') {
            return <MenuItem value={row.value}>{row.label}</MenuItem>;
          } else {
            return <MenuItem value={row}>{row}</MenuItem>;
          }
        })}
      </Select>
    </FormControl>
  );
}
