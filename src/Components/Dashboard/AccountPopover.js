import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import {
  ViewModule as SubModuleIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import CogIcon from "../../icons/Cog";
// import UserIcon from "../../icons/User";
import UsersIcon from "../../icons/Users";

const AccountPopover = () => {
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Avatar
          src={user.avatar && user.avatar}
          sx={{
            height: 32,
            width: 32,
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="subtitle2">
            {`${user.first_name}`}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {user.groups.map(
              (group, index) => `${index !== 0 ? ", " : ""}${group.name}`
            )}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2, mb: 2 }}>
          {/* <MenuItem component={RouterLink} to="/dashboard/social/profile">
            <ListItemIcon>
              <UserIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Profile
                </Typography>
              }
            />
          </MenuItem> */}
          <MenuItem component={RouterLink} to="/account">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Settings
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem component={RouterLink} to="/users/all">
            <ListItemIcon>
              <UsersIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Users
                </Typography>
              }
            />
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ mt: 2, mb: 2 }}>
          <MenuItem component={RouterLink} to="/fleet/submodules/types">
            <ListItemIcon>
              <SubModuleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Sub Modules
                </Typography>
              }
            />
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <MenuItem component={RouterLink} to="/suppliers/all">
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Suppliers
                </Typography>
              }
            />
          </MenuItem>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
