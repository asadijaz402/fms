import React from 'react';
import { Grid } from '@mui/material';
import useSettings from '../../../../../hooks/useSettings';
import AssetDetail from './AssetDetail';
import DynamicUpload from '../../../../../Components/DynamicUpload/DynamicUpload';
const Details = ({ details }) => {
  const { settings } = useSettings();
  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={settings.compact ? 6 : 4}
        md={6}
        xl={settings.compact ? 6 : 3}
        xs={12}
      >
        <AssetDetail details={details} />
      </Grid>
      <Grid
        item
        lg={settings.compact ? 6 : 4}
        md={6}
        xl={settings.compact ? 6 : 3}
        xs={12}
      >
        <DynamicUpload
          appModel={'assets_asset'}
          rows={[details]}
          label="Images: "
          labelKey={'row.name'}
        />
      </Grid>
    </Grid>
  );
};

export default Details;
