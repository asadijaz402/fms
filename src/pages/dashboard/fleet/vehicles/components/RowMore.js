import { useState } from "react";
import { Box, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddVehicleDialog from "../dialogs/AddVehicleDialog";
import DeleteVehicleDialog from "../dialogs/DeleteVehicleDialog";
import ViewVORDialog from "../VOR/Components/Dialog/ViewVORDialog";
import VORSearch from "../VOR/Components/Forms/VORSearch";

export default function RowMore({ row }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Tooltip title="More">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <AddVehicleDialog id={row.id} />
        </MenuItem>
        <MenuItem>
          <ViewVORDialog vehicleData={row} />
        </MenuItem>
        <MenuItem>
          <VORSearch vehicleData={row} />
        </MenuItem>
        {!row.de_fleeted && !row.hire_status && (
          <MenuItem>
            <DeleteVehicleDialog rowId={row} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
