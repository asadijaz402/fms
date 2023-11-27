import React from "react";

import { CircularProgress } from "@mui/material";

export default function Progress() {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        marginTop: "25%",
        marginBottom: "25%",
      }}
    >
      <CircularProgress />
    </div>
  );
}
