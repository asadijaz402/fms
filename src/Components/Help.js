import {
  Button,
  Popover,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import {
  YouTube as YouTubeIcon,
  HelpCenter as HelpCenterIcon,
  DeviceUnknown as HelpIcon,
} from "@mui/icons-material";

export const Help = ({ video = false, wiki = false }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        ref={anchorRef}
        variant="outlined"
        size="small"
        sx={{ m: 1 }}
        startIcon={<HelpCenterIcon />}
      >
        Help
      </Button>
      <Popover
        sx={{ m: 1 }}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        onClose={handleClose}
        open={open}
      >
        <MenuList>
          {video && (
            <MenuItem component={"a"} target="_blank" href={video}>
              <ListItemIcon>
                <YouTubeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="textPrimary" variant="subtitle2">
                    Video
                  </Typography>
                }
              />
            </MenuItem>
          )}
          {wiki && (
            <MenuItem component={"a"} target="_blank" href={wiki}>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="textPrimary" variant="subtitle2">
                    Wiki
                  </Typography>
                }
              />
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
};
