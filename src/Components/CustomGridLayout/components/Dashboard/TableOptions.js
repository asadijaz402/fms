import React from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function TableOptions({ columns, setColumns }) {
  const handleAddColumn = () => {
    const newColumn = {
      name: '', // Add the name entered in the name input field
      label: '', // Add the label entered in the label input field
      options: {
        filter: true,
        sort: false,
      },
    };

    setColumns([...columns, newColumn]);
  };

  const handleNameChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = event.target.value;
    setColumns(updatedColumns);
  };

  const handleLabelChange = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].label = event.target.value;
    setColumns(updatedColumns);
  };

  const handleRemoveColumn = (index) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(index, 1);
      return updatedColumns;
    });
  };

  return (
    <>
      <Box mb={2} p={1}>
        <Typography variant='subtitle1' gutterBottom>
          Columns :
        </Typography>
        {columns.map((column, index) => (
          <Box mt={2} mb={2}>
            <Box
              key={index}
              mb={2}
              display='flex'
              justifyContent='center'
              alignItems='center'
              gap={1}>
              <TextField
                size='small'
                variant='outlined'
                type='text'
                label='Name'
                value={column.name}
                placeholder={`Column ${index + 1} Name`}
                onChange={(event) => handleNameChange(event, index)}
              />
              <TextField
                size='small'
                variant='outlined'
                type='text'
                label='Label'
                value={column.label}
                placeholder={`Column ${index + 1} Label`}
                onChange={(event) => handleLabelChange(event, index)}
              />

              <IconButton onClick={() => handleRemoveColumn(index)}>
                <DeleteIcon color='error' />
              </IconButton>
            </Box>
            <Divider />
          </Box>
        ))}
        <Button variant='outlined' onClick={handleAddColumn}>
          Add New Column
        </Button>
      </Box>
      <Divider />
      <Box mb={2} p={1}>
        <Typography variant='subtitle1' gutterBottom>
          Data Source :
        </Typography>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            size='small'
            label='Data Source'
            variant='outlined'
            type='text'
            placeholder='source'
          />
          <Button
            variant='contained'
            sx={{ width: '50%', placeSelf: 'flex-end' }}
            onClick={handleAddColumn}>
            Add Source
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default TableOptions;
