import { Box } from "@mui/material";

export default function BoxWidget({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
}
