import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import SharedBookingBrief from "./SharedBookingBrief";
import CustomerMetadata from "./CustomerMetadata";

const BookingOverview = ({ project, data, ...other }) => {
  return (
    <Grid container spacing={3} {...other}>
      <Grid item lg={8} xl={9} xs={12}>
        <SharedBookingBrief vehicles={data} title={data[0].bookingGroup} />
      </Grid>
      <Grid item lg={4} xl={3} xs={12}>
        <CustomerMetadata customer={data[0].customer} />
      </Grid>
      {/* {data[0].delivery && (
        <Grid item md={6} lg={4} xl={3} xs={12}>
          <Deliver data={data[0]} />
        </Grid>
      )} */}
      {/* {data[0].collection_at_depot && (
        <Grid item lg={4} xl={3} md={6} xs={12}>
          <Collection data={data[0]} />
        </Grid>
      )} */}

      {/* <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <FileDropzone />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mb: -1,
              mt: 2,
              mx: -1,
            }}
          >
            {project.files.map((file) => (
              <Box
                key={file.url}
                sx={{
                  m: 1,
                  width: 240,
                }}
              >
                <ProjectFileCard
                  mimeType={file.mimeType}
                  name={file.name}
                  size={file.size}
                  url={file.url}
                />
              </Box>
            ))}
          </Box>
        </Box> */}
    </Grid>
  );
};

BookingOverview.propTypes = {
  project: PropTypes.object.isRequired,
};

export default BookingOverview;
