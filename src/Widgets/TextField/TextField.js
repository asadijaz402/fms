import { TextField } from "@mui/material";

export default function TextFieldWidget({ children, ...props }) {
  return (
    <TextField
      value={props.name && props.data ? props.data[props.name] : null}
      {...props}
    >
      {children}
    </TextField>
  );
}
