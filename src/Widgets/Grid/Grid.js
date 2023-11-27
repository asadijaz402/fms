import { Grid } from "@mui/material";

export default function GridWidget({ children, ...props }) {
  return <Grid {...props}>{children}</Grid>;
}
