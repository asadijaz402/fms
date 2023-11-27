import { Backdrop, CircularProgress } from "@mui/material";

export default function BackdropWidget({ loading, ...props }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      {...props}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
