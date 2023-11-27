import React, { Component } from "react";
import { Box } from "@mui/material";
import AsyncSeacrchInput from "./AsyncSearchInput";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      locationInput: "",
      vehicle: "",
    };
  }

  handleChange = (value) => {
    this.setState({ vehicle: value }, () => {
      if (this.props.vehicle_list.results) {
        let vehicle_selected = this.props.vehicle_list.results.filter(
          (veh) => veh.vehicle_reg_no === this.state.vehicle
        );
        if (vehicle_selected[0]) {
          this.props.handleChange({
            target: { name: "vehicle", value: vehicle_selected[0].id },
          });
        }
      }
    });
  };

  onClickSearch = () => {
    let vehicle_selected =
      this.props.vehicle_list.results &&
      this.props.vehicle_list.results.filter(
        (veh) => veh.vehicle_reg_no === this.state.vehicle
      );
    if (vehicle_selected && vehicle_selected.length !== 0) {
      this.props.handleChange({
        target: { name: "vehicle", value: vehicle_selected[0].id },
      });
      if (this.props.setVehName) {
        this.props.setVehName(vehicle_selected[0].vehicle_reg_no);
      }
      this.props.handleNext();
    }
  };

  render() {
    if (this.props.handleNext) {
      return (
        <Box mb={3}>
          <Box fullWidth style={{ minWidth: "300px" }}>
            <AsyncSeacrchInput handleChange={this.handleChange} />
            {/* <br />
            <Button
              onClick={this.onClickSearch}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Select Vehicle
            </Button> */}
          </Box>
        </Box>
      );
    } else {
      return (
        <AsyncSeacrchInput
          required={this.props.required ? this.props.required : false}
          handleChange={this.handleChange}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    vehicle_list: state.api["vehicle/search"],
  };
};

export default connect(mapStateToProps, {})(SearchBar);
