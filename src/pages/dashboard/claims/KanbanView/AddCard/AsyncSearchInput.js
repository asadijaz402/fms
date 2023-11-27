import React, { Component } from "react";
import { TextField, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { Search as SearchIcon } from "@mui/icons-material";
import _ from "lodash";
import { connect } from "react-redux";
import { searchData } from "../../../../../slices/CustomSlices/actions/apiActions";

class AsyncSeacrchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      options: [],
      loading: false,
    };
  }

  handleChange = _.debounce((event, values) => {
    if (this.state.open && this.state.options.length === 0) {
      this.setState({ loading: true });
    }
    let options = [];
    this.props.handleChange(values);
    this.props
      .searchData(values, "vehicle/search", this.props.id_token, false)
      .then((res) => {
        this.props.searchResults.results.length !== 0 &&
          this.props.searchResults.results.map((data) => {
            return (options = [...options, data.vehicle_reg_no]);
          });
        this.setState({
          options: options,
          loading: false,
        });
      });
  }, 500);

  render() {
    return (
      <Autocomplete
        freeSolo
        variant="outlined"
        disableClearable
        style={{ width: "100%" }}
        onInputChange={this.handleChange}
        options={this.state.options}
        loading={this.state.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={params.InputProps.ref}
            margin="normal"
            variant="outlined"
            placeholder="Find Vehicle"
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: (
                <InputAdornment position="start" className="searchIcons">
                  <SearchIcon style={{ fill: "#545454" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.api["vehicle/search"],
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, { searchData })(AsyncSeacrchInput);
