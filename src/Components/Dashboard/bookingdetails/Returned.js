import PropTypes from "prop-types";
import { Box, Typography, Grid, Button } from "@mui/material";
import WeDeliver from "./WeDeliver";
import WeCollect from "./WeCollect";
import { Check as CheckIcon } from "@mui/icons-material";

const ProjectActivities = (props) => {
  const {
    data,
    setData,
    updateBookings,
    changeStatus,
    disabled = false,
    ...other
  } = props;

  const statusChange = () => {
    changeStatus("Returned");
  };

  return (
    <div {...other}>
      <Grid container spacing={3}>
        {!disabled && (
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckIcon />}
                  onClick={statusChange}
                >
                  Off Hire
                </Button>
              </Box>
              <Box>
                <Typography color="textSecondary" variant="overline">
                  Change booking status to Off Hire.
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <WeDeliver
            updateBookings={updateBookings}
            data={data}
            setData={setData}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <WeCollect
            updateBookings={updateBookings}
            data={data}
            setData={setData}
            disabled={disabled}
          />
        </Grid>
      </Grid>
      {/* <Typography color="textPrimary" variant="h6">
        Today
      </Typography>
      <Box sx={{ mt: 3 }}>
        {todayItems.map((activity) => (
          <ProjectActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            subject={activity.subject}
            type={activity.type}
          />
        ))}
      </Box> */}
      {/* <Typography color="textPrimary" sx={{ mt: 3 }} variant="h6">
        Last week
      </Typography>
      <Box sx={{ mt: 3 }}>
        {lastWeekItems.map((activity) => (
          <ProjectActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            subject={activity.subject}
            type={activity.type}
          />
        ))}
      </Box> */}
    </div>
  );
};

ProjectActivities.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ProjectActivities;
