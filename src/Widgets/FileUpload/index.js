import {
  Box,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import useUpload from './useUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function FileUpload({
  value = false,
  appModel,
  rowId = false,
  company_filter = false,
  onChange,
  name,
  ...props
}) {
  const { selectFiles, loading } = useUpload(
    appModel,
    rowId,
    company_filter,
    onChange,
    name
  );

  return (
    <>
      {value && (
        <Button
          variant="outlined"
          size="small"
          component="a"
          href={value}
          sx={{ mr: 1 }}
          target="_blank"
        >
          View
        </Button>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <label className="btn btn-default p-0">
            <input
              style={{ display: 'none' }}
              {...props}
              type="file"
              // accept="image/*"
              onChange={(e) => selectFiles(e)}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <Tooltip title={value ? 'Replace Image' : 'Upload Image'}>
                <IconButton
                  color="primary"
                  size="small"
                  component="span"
                  aria-label="add"
                >
                  <AddPhotoAlternateIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </label>
        </Box>
      </Box>
    </>
  );
}
