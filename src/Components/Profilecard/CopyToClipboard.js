import React from "react";
import toast from "react-hot-toast";
import { IconButton, Tooltip } from "@mui/material";
import { FileCopy } from "@mui/icons-material";

export default function CopyToClipboard({
  value,
  children,
  size = "small",
  ...props
}) {
  return (
    <>
      <Tooltip title={"copy vehicle #" + value} placement="top">
        <IconButton
          size={size}
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast("#" + value + " copied to clipboard!", {
              icon: "👍",
            });
          }}
          color="primary"
          {...props}
        >
          <FileCopy fontSize="inherit" /> {children}
        </IconButton>
      </Tooltip>
    </>
  );
}
