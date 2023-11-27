import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Backdrop,
  TextField,
  CircularProgress,
} from '@mui/material';
// import JsonEditor from './JSONEditorField';
import { CopyBlock, dracula } from 'react-code-blocks';
import { JSONcode, JSONhelp } from './codes';
import { ListElement } from '../../vehicleDetails/Components/Tracker/Summary/components/ListElement';
import useImport from '../hooks/useImport';
import { Download } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddBulkVehicle({ handleClose }) {
  const {
    tab,
    JsonData,
    handleChange,
    tabChange,
    handleSubmit,
    uploadFile,
    errors,
    loading,
    parseErrors,
  } = useImport();

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={tabChange}>
          <Tab label="csv" {...a11yProps(0)} />
          <Tab label="json" {...a11yProps(1)} />
          <Tab label="json Documentation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Button variant="outlined" component="label" fullWidth>
          Import .csv file
          <input
            onChange={uploadFile}
            type="file"
            hidden
            id="csvFile"
            accept=".csv"
          />
        </Button>
        <Button
          fullWidth
          startIcon={<Download />}
          component="a"
          href="/static/bulk_vehicle_upload_template.csv"
          sx={{ mt: 2 }}
        >
          Download .csv Template
        </Button>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {/* <JsonEditor value={JsonData} onChange={handleChange} /> */}
        <TextField
          value={JsonData}
          onChange={handleChange}
          label="JSON Import"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Box>
          <CopyBlock
            text={JSONcode}
            language={'json'}
            showLineNumbers={false}
            theme={dracula}
            codeBlock
            // startingLineNumber={props.startingLineNumber}
            wrapLines
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <JSONhelp />
        </Box>
      </TabPanel>

      {errors && Object.keys(errors).length !== 0 && (
        <>
          <Typography gutterBottom variant="h6" color="info">
            Status
          </Typography>
          {Object.keys(errors).map((row) => {
            return (
              <ListElement heading={row} content={parseErrors(errors[row])} />
            );
          })}
        </>
      )}

      {tab <= 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }} mt={4}>
          <Box ml={1}>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        </Box>
      )}
    </>
  );
}
