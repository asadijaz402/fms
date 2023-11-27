import React, { Component } from "react";
import { Box, Button } from "@mui/material";
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
    this.setState({ vehicle: value });
  };

  onClickSearch = (event) => {
    event.preventDefault();
    this.props.vehicle_list.length !== 0 &&
      this.props.vehicle_list.results.map((veh) => {
        if (veh.vehicle_reg_no === this.state.vehicle) {
          this.props.handleChange({
            target: { name: "vehicle", value: veh.id },
          });
          this.props.handleNext();
        }
        return true;
      });
  };

  render() {
    return (
      <Box p={4}>
        <Box fullWidth>
          <form onSubmit={this.onClickSearch}>
            <AsyncSeacrchInput handleChange={this.handleChange} />
            <br />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Select Vehicle
            </Button>
          </form>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vehicle_list: state.api["vehicle/search"],
  };
};

export default connect(mapStateToProps, {})(SearchBar);
