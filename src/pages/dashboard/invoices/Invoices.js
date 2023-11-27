import React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  // Button,
  Container,
  Grid,
  // Link,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "../../../icons/ChevronRight";
// import DownloadIcon from "../../../../icons/Download";
// import UploadIcon from "../../../../icons/Upload";
import useSettings from "../../../hooks/useSettings";
import Tabs from "./Tabs";

const InvoiceList = () => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>Finance: Invoices | Fleet Management System</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Finance
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Typography color="textSecondary" variant="subtitle2">
                  Invoices
                </Typography>
              </Breadcrumbs>
              {/* import export buttons commented for future integrations */}
              {/* <Box
                sx={{
                  mb: -1,
                  mx: -1,
                  mt: 1,
                }}
              >
                <Button
                  color="primary"
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  Import
                </Button>
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  Export
                </Button>
              </Box> */}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default InvoiceList;
