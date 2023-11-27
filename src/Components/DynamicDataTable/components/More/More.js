import { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomFieldDialog from "../CustomFieldDialog";

export default function MoreMenu({ settings, onSettingsChange, model_table }) {
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
            aria-controls={open ? "table-more-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="table-more-menu"
        open={open}
        onClose={handleClose}
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
        <MenuItem onClick={() => onSettingsChange("dense")}>
          <ListItemIcon>
            {settings.dense ? (
              <CheckBoxIcon fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>Compact</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onSettingsChange("persistTableHead")}>
          <ListItemIcon>
            {settings.persistTableHead ? (
              <CheckBoxIcon fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>Persistant Table Head</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onSettingsChange("responsive")}>
          <ListItemIcon>
            {settings.responsive ? (
              <CheckBoxIcon fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>Responsive</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onSettingsChange("fixedHeader")}>
          <ListItemIcon>
            {settings.fixedHeader ? (
              <CheckBoxIcon fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>Fixed Header</ListItemText>
        </MenuItem>
        {model_table && <CustomFieldDialog model_table={model_table} />}
      </Menu>
    </>
  );
}
