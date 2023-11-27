import React from 'react';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
  Popover,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  popup: {
    padding: theme.spacing(2),
  },
}));

const widgetNames = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
};

export default function AddList({
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (e) => {
    if (e.target.checked) {
      onAddItem(e.target.name);
    } else {
      onRemoveItem(e.target.name);
    }
  };

  return (
    <>
      <IconButton aria-label='add' onClick={handleClick} aria-describedby={id}>
        <AddCircleIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div className={classes.popup}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Select Widgets</FormLabel>
            <FormGroup>
              {originalItems.map((i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={items.includes(i)}
                      onChange={handleChange}
                      name={i}
                    />
                  }
                  label={widgetNames[i]}
                  key={i}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Popover>
    </>
  );
}
