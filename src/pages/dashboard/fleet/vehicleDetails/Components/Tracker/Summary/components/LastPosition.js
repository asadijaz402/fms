import {
  CheckCircle,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Icon,
  IconButton,
  Tooltip,
} from '@mui/material';
import useTrackerContext from '../../../../hooks/useTrackerContext';
import { ListElement } from './ListElement';
import { labelGenerator } from '../../../../../../../../Components/DynamicDataTable/helpers';
import moment from 'moment';

const endIcons = {
  batteryLevel: '%',
  distance: 'km',
  totalDistance: 'km',
  altitude: 'ft',
  speed: 'km/h',
};

const hiddenContent = [
  'attributes',
  'id',
  'deviceId',
  'network',
  'accuracy',
  'address',
];

export function LastPosition() {
  const { center } = useTrackerContext();

  const content = (value, key) => {
    let text = value;
    if (Object.keys(endIcons).filter((n) => n === key).length !== 0) {
      text = text + ' ' + endIcons[key];
    }

    if (typeof value === 'boolean') {
      if (value) {
        return (
          <Icon color="success">
            <CheckCircle fontSize="small" />
          </Icon>
        );
      } else {
        return (
          <Icon color="error">
            <CancelIcon fontSize="small" />
          </Icon>
        );
      }
    }

    if (key.includes('Time')) {
      return (
        <>
          {moment(value, 'YYYY-MM-DDTHH:mm:ssZ').toString()} <br />
          ...
          {moment(value, 'YYYY-MM-DDTHH:mm:ssZ').toNow()}
        </>
      );
    }

    return text;
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ height: '100%' }}>
      <Box p={1} display="flex" sx={{ width: '100%', alignItems: 'center' }}>
        <Box flexGrow={1} mr={1}>
          <Typography variant="h6" color="primary">
            Last known Position:{' '}
          </Typography>
        </Box>
        <Box mr={1}>
          <Tooltip title="Edit Device">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Send Command">
            <IconButton size="small">
              <UploadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        {center?.attributes
          ? Object.keys(center.attributes).map((row) => {
              return (
                <ListElement
                  heading={labelGenerator(row)}
                  content={content(center.attributes[row], row)}
                />
              );
            })
          : 'No data available.'}
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        {center &&
          Object.keys(center)
            .filter((n) => hiddenContent.filter((x) => x === n).length === 0)
            .map((row) => {
              return (
                <ListElement
                  heading={labelGenerator(row)}
                  content={content(center[row], row)}
                />
              );
            })}
      </Box>
    </Paper>
  );
}
