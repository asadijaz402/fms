import useDynamicUpload from './useDynamicUpload';
import {
  Fab,
  Typography,
  Box,
  Grid,
  ImageList,
  Paper,
  ImageListItem,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function DynamicUpload({
  appModel,
  rows,
  label,
  labelKey = false,
}) {
  const { selectFiles, loading } = useDynamicUpload(appModel);

  return (
    <Grid container spacing={2}>
      {rows.map((row) => {
        return (
          <Grid
            item
            xs={12}
            sm={12}
            md={rows.length === 1 ? 12 : 6}
            lg={rows.length === 1 ? 12 : 6}
          >
            <Paper>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  pt: 1,
                  pb: 2,
                  pr: 1,
                  pl: 1,
                }}
              >
                <Box flexGrow={1} mr={2}>
                  <Typography variant="h6" color="primary">
                    {/* eslint-disable-next-line */}
                    <b>{label}</b> {labelKey && eval(labelKey)}
                  </Typography>
                  <Typography color="GrayText" variant="subtitle1">
                    Maximum, 10 images allowed. Images once uploaded, cannot be
                    removed.
                  </Typography>
                </Box>
                {row.image_vault.length <= 10 && (
                  <Box>
                    <label className="btn btn-default p-0">
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        multiple
                        accept="image/*"
                        onChange={(e) => selectFiles(e, row.id)}
                      />
                      {loading && loading[row.id] ? (
                        <CircularProgress />
                      ) : (
                        <Fab
                          color="primary"
                          size="small"
                          component="span"
                          aria-label="add"
                        >
                          <AddPhotoAlternateIcon fontSize="small" />
                        </Fab>
                      )}
                    </label>
                  </Box>
                )}
              </Box>
              <Divider />
              <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
                {row.image_vault.length !== 0 && (
                  <ImageList variant="masonry" cols={2} gap={4}>
                    {row.image_vault.map((img) => (
                      <ImageListItem key={img.id}>
                        <img
                          style={{
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                          }}
                          src={img.mediaFile}
                          alt={img.id}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
