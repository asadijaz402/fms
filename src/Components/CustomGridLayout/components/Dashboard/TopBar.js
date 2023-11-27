import React from 'react';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import { useDashboardContext } from '../../hooks/DashboardContext';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const {
    onLayoutSave,
    handleDashboardChange,
    mode,
    dashboardInfo,
    setMode,
    deleteDashboard,
    dashboardId,
  } = useDashboardContext();

  return (
    <Box sx={{ display: 'flex', p: 1, mb: 1, alignItems: 'center' }}>
      <Box mr={1}>
        {mode === 'preview' || mode === 'live' ? (
          <Typography variant="h5" sx={{ pl: 2 }} gutterBottom>
            {dashboardInfo.title}
          </Typography>
        ) : (
          <TextField
            label="Dashboard Title"
            onChange={handleDashboardChange}
            name="title"
            value={dashboardInfo.title}
            variant="filled"
          />
        )}
      </Box>
      <Box flexGrow={1}></Box>
      {(mode === 'draft' || mode === 'preview') && (
        <Box mr={1}>
          <TextField
            select
            label="Mode"
            onChange={(e) => setMode(e.target.value)}
            value={mode}
          >
            <MenuItem value="preview">Preview</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </TextField>
        </Box>
      )}
      {(mode === 'draft' || mode === 'new') && (
        <Box>
          <Tooltip title="Save Dashboard">
            <IconButton aria-label="save" onClick={onLayoutSave}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {mode === 'draft' && (
        <>
          <Box>
            <Button
              component={Link}
              to={'/customDashboard/view/' + dashboardId}
            >
              View Live
            </Button>
          </Box>
          <Box>
            <Tooltip title="Delete Dashboard">
              <IconButton color="error" onClick={deleteDashboard}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
      {mode === 'live' && (
        <Box>
          <Tooltip title="Edit Dashboard">
            <Button
              startIcon={<EditIcon fontSize="small" />}
              component={Link}
              size="small"
              variant="outlined"
              to={'/editDashboard/draft/' + dashboardId}
              aria-label="save"
            >
              Edit
            </Button>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
