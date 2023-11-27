import { Box, TextField, Typography, Divider, Button } from '@mui/material';
import useFilterContext from '../../hook/useFilterContext';
import { labelGenerator } from '../../helpers';

export default function UpdateCustomFilter() {
  const { dynamicFilter, setDynamicFilterField, applyDynamicFilter } =
    useFilterContext();

  if (Object.keys(dynamicFilter).length !== 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 1, pl: 1 }}>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ ml: 1 }}>
          <Typography
            sx={{ fontSize: '8px' }}
            variant="subtitle1"
            color="GrayText"
          >
            <b>Custom Filter on:</b>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '12px' }}>
            {dynamicFilter?.field &&
              labelGenerator(dynamicFilter?.field) +
                ' ' +
                dynamicFilter?.filter?.name}
          </Typography>
        </Box>
        <Box sx={{ ml: 1 }}>
          <TextField
            size="small"
            value={dynamicFilter.value}
            onChange={(e) =>
              setDynamicFilterField(
                dynamicFilter.field,
                dynamicFilter.filter,
                e.target.value
              )
            }
          />
        </Box>
        <Box ml={1} mr={1}>
          <Button onClick={applyDynamicFilter} variant="contained" size="small">
            Apply
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem />
      </Box>
    );
  } else {
    return <></>;
  }
}
