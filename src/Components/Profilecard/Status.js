import React from "react";
import { Typography, Divider, Box, Chip } from "@mui/material";
import { connect } from "react-redux";
import { statusClick } from "../../slices/CustomSlices/actions/apiActions";

const Status = ({ customer, className, ...props }) => {
  return (
    <>
      <Typography variant="h6">Status</Typography>
      <Divider />
      <Box mt={1} mb={2} display="flex">
        <Box mr={1}>
          <Chip
            label={props.vehicle.hire_status ? "On Hire" : "Off Hire"}
            color={props.vehicle.hire_status ? "info" : "warning"}
          />
        </Box>

        {props.vehiclecheck &&
          props.vehiclecheck.map((row) => {
            return (
              <Box mr={1}>
                <Chip
                  label={Object.keys(row)[0]}
                  color={
                    row[Object.keys(row)[0]] === true ? "secondary" : "primary"
                  }
                />
              </Box>
            );
          })}
      </Box>
    </>
  );
};

// Status.propTypes = {
//   className: PropTypes.string,
//   customer: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
  };
};
export default connect(mapStateToProps, { statusClick })(Status);
