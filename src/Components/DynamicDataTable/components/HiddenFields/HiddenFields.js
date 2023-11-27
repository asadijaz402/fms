import { useState } from 'react';
import {
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  VisibilityOff as HiddenIcon,
  CheckBox as CheckIcon,
  CheckBoxOutlineBlank as UnCheckedIcon,
} from '@mui/icons-material';
import { labelGenerator } from '../../helpers';

export default function HiddenFields({
  columns,
  options,
  defaultHidden,
  onClickHidden,
}) {
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
      <Tooltip title="Hidden Columns">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'table-hiddent-field-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <HiddenIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="table-hiddent-field-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList dense>
          {columns &&
            Object.keys(columns).length !== 0 &&
            Object.keys(columns).map((row, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => onClickHidden(row)}
                  disabled={
                    defaultHidden.filter((n) => n === row).length === 0
                      ? false
                      : true
                  }
                >
                  <ListItemIcon>
                    {options.filter((n) => n.uniqueId === row)[0]?.omit ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <UnCheckedIcon fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText>{labelGenerator(row)}</ListItemText>
                </MenuItem>
              );
            })}
        </MenuList>
      </Menu>
    </>
  );
}
