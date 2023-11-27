import React, { Component } from "react";
import { TextField, InputAdornment } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { Search as SearchIcon } from "@mui/icons-material";
import _ from "lodash";
import { connect } from "react-redux";
import {
  searchDataDynamic,
  searchData,
} from "../../../../../../../slices/CustomSlices/actions/apiActions";

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
    this.setState({ loading: true });
    // this.props.handleChange(values);
    if (this.props.vor) {
      this.props
        .searchData(values, this.props.url, this.props.id_token, false)
        .then((res) => {
          this.setState({
            options: [...res.data.results.map((row) => row.name)],
            loading: false,
          });
          this.props.setVorList(res.data.results);
          this.props.handleChange(values);
        });
    } else {
      this.props
        .searchDataDynamic(values, this.props.url, this.props.id_token, false)
        .then((res) => {
          this.setState({
            options: [...res.data.results.map((row) => row.vehicle_reg_no)],
            loading: false,
          });
          this.props.handleChange(values);
        });
    }
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
        // renderOption={
        //   this.props.vor
        //     ? (option) => option.name
        //     : (option) => option.vehicle_reg_no
        // }
        // getOptionLabel={
        //   this.props.vor
        //     ? (option) => option.name.toString()
        //     : (option) => option.vehicle_reg_no.toString()
        // }
        loading={this.state.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={params.InputProps.ref}
            margin="normal"
            required={this.props.required}
            variant="outlined"
            placeholder={this.props.vor ? "Find VOR" : "Find Vehicle"}
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
    searchResults: state.api["vehicle/list/?hire_status=false"],
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, { searchDataDynamic, searchData })(
  AsyncSeacrchInput
);
