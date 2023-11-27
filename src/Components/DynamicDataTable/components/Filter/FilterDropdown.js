import { useState } from 'react';
import {
  Box,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';

export default function FilterDropDown({
  label,
  list,
  query,
  addFilter,
  filterValues,
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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'filter-' + query + '-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          endIcon={
            open ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )
          }
        >
          {label}
          {filterValues[query] && ': ' + filterValues[query].toString()}
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id={'filter-' + query + '-menu'}
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
        {list?.map((value) => {
          return (
            <MenuItem onClick={() => addFilter(query, value)}>
              <ListItemIcon>
                {filterValues[query] &&
                filterValues[query].split(',').filter((n) => n === value)
                  .length !== 0 ? (
                  <CheckBoxIcon fontSize="small" />
                ) : (
                  <CheckBoxOutlineBlankIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>{value}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
