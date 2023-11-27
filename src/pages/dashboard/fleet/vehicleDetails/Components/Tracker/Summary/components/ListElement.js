import { Box, Typography } from '@mui/material';

export const ListElement = ({ heading, content }) => {
  return (
    <Box display="flex" alignItems={'center'}>
      <Box flexGrow={1} pr={2}>
        <Typography gutterBottom variant="body2" color="primary">
          <b>{heading} </b>
        </Typography>
      </Box>
      <Box>
        <Typography gutterBottom variant="body2" align="right">
          {content ? content : 'N/A'}
        </Typography>
      </Box>
    </Box>
  );
};
