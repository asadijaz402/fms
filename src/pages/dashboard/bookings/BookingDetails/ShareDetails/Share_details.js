import { useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { projectApi } from "../../../../../__fakeApi__/projectApi";
import useMounted from "../../../../../hooks/useMounted";
import useSettings from "../../../../../hooks/useSettings";
import gtm from "../../../../../lib/gtm";
import useShareDetails from "./useShareDetails";
import ShareBookingComp from "./ShareBookingComp";

const ProjectDetails = () => {
  const { loading, data } = useShareDetails();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [project, setProject] = useState(null);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getProject = useCallback(async () => {
    try {
      const data = await projectApi.getProject();

      if (mounted.current) {
        setProject(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  if (!project) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Booking Details | Fleet Management System</title>
      </Helmet>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                Booking details{" (" + data[0]?.bookingGroup + ")"}
              </Typography>
              {/* <Box
                sx={{
                  alignItems: 'center',
                  color: 'text.secondary',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mb: -2,
                  mx: -2,
                }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2,
                  }}>
                  {!loading &&
                    (data[0].status !== 'Cancel' ? (
                      <CheckIcon fontSize='small' />
                    ) : (
                      <ExclamationIcon fontSize='small' />
                    ))}
                  <Typography
                    color='inherit'
                    sx={{ ml: 1 }}
                    variant='subtitle2'>
                    {!loading && data[0].status}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2,
                  }}>
                  <CalendarIcon fontSize='small' />
                  <Typography
                    color='inherit'
                    sx={{ ml: 1 }}
                    variant='subtitle2'>
                    {!loading &&
                      `Booking is due ${moment(
                        data[0].start_date,
                        'YYYY-MM-DDThh:mm:ss'
                      ).from()}.`}
                  </Typography>
                </Box>
              </Box> */}
            </Grid>
            <Grid item>
              {/* <Box sx={{ m: -1 }}>
                <Button
                  color='primary'
                  component={Link}
                  to='/login'
                  startIcon={<VisibilityIcon fontSize='small' />}
                  sx={{ m: 1 }}
                  variant='text'>
                  View in dashboard
                </Button>
              </Box> */}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {!loading && <ShareBookingComp project={project} data={data} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetails;
