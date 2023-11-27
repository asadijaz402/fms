import { useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  // Send as SendIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { projectApi } from "../../../../__fakeApi__/projectApi";
import { ProjectApplicationModal } from "../../../../Components/Dashboard/project";
import useMounted from "../../../../hooks/useMounted";
import useSettings from "../../../../hooks/useSettings";
import CalendarIcon from "../../../../icons/Calendar";
import ExclamationIcon from "../../../../icons/Exclamation";
// import ShareIcon from '../../../../icons/Share';
import gtm from "../../../../lib/gtm";
import useBookingDetails from "./useBookingDetails";
import moment from "moment";
import Tabs from "./Components/Tabs";
import Share from "./ShareDetails/Share";
import Notes from "./Components/Notes/Notes";

const cases = {
  Booked: 0,
  Initial_Payment: 1,
  Precheck: 2,
  Confirmed: 3,
  Hired: 4,
  Returned: 5,
  Complete: 6,
};

const ProjectDetails = () => {
  const {
    bookingId,
    loading,
    data,
    setData,
    changeStatus,
    getPrecheckHistory,
    updateBookings,
    addVehicles,
    removeVehicle,
  } = useBookingDetails();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [project, setProject] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
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

  // const handleApplyModalOpen = () => {
  //   setIsApplicationOpen(true);
  // };

  const handleApplyModalClose = () => {
    setIsApplicationOpen(false);
  };

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
              <Box
                sx={{
                  alignItems: "center",
                  color: "text.secondary",
                  display: "flex",
                  flexWrap: "wrap",
                  mb: -2,
                  mx: -2,
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    m: 2,
                  }}
                >
                  {!loading &&
                    (data[0].status !== "Cancel" ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <ExclamationIcon fontSize="small" />
                    ))}
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {!loading && data[0].status}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    m: 2,
                  }}
                >
                  <CalendarIcon fontSize="small" />
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {!loading &&
                      `Booking is due ${moment(
                        data[0].start_date,
                        "YYYY-MM-DDThh:mm:ss"
                      ).from()}.`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                {/* <Button
                  color='primary'
                  startIcon={<ShareIcon fontSize='small' />}
                  sx={{ m: 1 }}
                  variant='text'>
                  Share
                </Button> */}
                {data[0] && <Notes data={data} />}
                {data[0] && <Share id={data[0].bookingGroup} data={data[0]} />}

                {!loading &&
                  cases[data[0].status] <= 3 &&
                  (data[0].status === "Cancel" ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        changeStatus("Booked");
                      }}
                      startIcon={<CheckIcon fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="contained"
                    >
                      Book
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      onClick={() => {
                        changeStatus("Cancel");
                      }}
                      startIcon={<CancelIcon fontSize="small" />}
                      sx={{ m: 1 }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  ))}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {!loading && (
              <Tabs
                getPrecheckHistory={getPrecheckHistory}
                project={project}
                data={data}
                setData={setData}
                updateBookings={updateBookings}
                addVehicles={addVehicles}
                removeVehicle={removeVehicle}
                bookingId={bookingId}
                changeStatus={changeStatus}
              />
            )}
          </Box>
        </Container>
      </Box>
      <ProjectApplicationModal
        authorAvatar={project.author.avatar}
        authorName={project.author.name}
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      />
    </>
  );
};

export default ProjectDetails;
