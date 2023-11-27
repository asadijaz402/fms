import { useState } from 'react';
import {
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import * as MUIIcon from '@mui/icons-material';
import { labelGenerator } from '../../helpers';
import useFilterContext from '../../hook/useFilterContext';
import { FieldTypes } from './LookUps';

export default function CustomFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenu, setSubMenu] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { f_columns, setDynamicFilterField } = useFilterContext();

  const handleOpenFilter = (n) => {
    if (subMenu === n) {
      setSubMenu('');
    } else {
      setSubMenu(n);
    }
  };

  return (
    <>
      <Tooltip title="Custom Filter">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'table-hiddent-field-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MUIIcon.FilterList fontSize="small" />
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
          {Object.keys(f_columns).length !== 0 &&
            f_columns.fields.map((row, index) => {
              return (
                <>
                  <MenuItem
                    key={index}
                    onClick={() => handleOpenFilter(row.name)}
                  >
                    <ListItemIcon>
                      {FieldTypes[row.type]?.icon && FieldTypes[row.type].icon}
                    </ListItemIcon>
                    <ListItemText>{labelGenerator(row.name)}</ListItemText>
                    {row.name === subMenu ? (
                      <MUIIcon.ArrowDropUp />
                    ) : (
                      <MUIIcon.ArrowDropDown />
                    )}
                  </MenuItem>
                  <Collapse in={row.name === subMenu}>
                    {FieldTypes[row.type]?.filters &&
                      FieldTypes[row.type].filters.map((n, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() =>
                              setDynamicFilterField(row.name, n, '')
                            }
                          >
                            <ListItemText inset>{n.name}</ListItemText>
                          </MenuItem>
                        );
                      })}
                    <MenuItem
                      key={index}
                      onClick={() =>
                        setDynamicFilterField(row.name, 'custom', '')
                      }
                    >
                      <ListItemText inset>custom</ListItemText>
                    </MenuItem>
                    <Divider />
                  </Collapse>
                </>
              );
            })}
        </MenuList>
      </Menu>
    </>
  );
}
