import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import Details from "./Details";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { connect } from "react-redux";
import { getData } from "src/Redux/actions/apiActions";
import Progress from "src/Components/Progress";
import "./Profile.css";
import BasicInfo from "./BasicInfo";
import Status from "./Status";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      current_universal: "",
    };
  }

  onRefresh = () => {
    this.props
      .getData(
        this.props.universal.data,
        "vehicle-check",
        this.props.id_token,
        false
      )
      .then((res) => {});
    this.props
      .getData(this.props.universal.data, "vehicle", this.props.id_token, false)
      .then((res) => {
        this.setState({
          progress: false,
          current_universal: this.props.universal,
        });
      })
      .catch((err) => {
        this.setState({
          progress: false,
          current_universal: this.props.universal,
        });
      });
  };

  render() {
    if (
      this.state.current_universal !== this.props.universal &&
      !this.state.progress
    ) {
      this.setState({ progress: true });
      this.onRefresh();
    }

    if (this.state.progress && this.props.universal) {
      return <Progress />;
    } else {
      let vehicle = this.props.vehicle;
      if (vehicle) {
        return (
          <Card style={{ flex: 1 }}>
            <CardActionArea>
              <CardMedia
                image={vehicle.image && vehicle.image}
                title={vehicle.vehicle_reg_no}
                style={
                  this.props.vehiclecheck &&
                  this.props.vehiclecheck.filter(
                    (row) => row[Object.keys(row)[0]] === true
                  ).length !== 0
                    ? { borderBottom: "8px solid #6CD29A" }
                    : { borderBottom: "8px solid #EF6868" }
                }
              />
              <CardContent style={{ padding: "10px", paddingTop: "4px" }}>
                <Status
                  history={this.props.history}
                  vehiclecheck={this.props.vehiclecheck}
                  vehicle={vehicle}
                ></Status>
                <BasicInfo vehicle={vehicle}></BasicInfo>
                <Details vehicle={vehicle}></Details>
                {vehicle.details && (
                  <>
                    <Divider />
                    <ExpansionPanel
                      square
                      defaultExpanded
                      style={{
                        border: "none",
                        boxShadow: "none",

                        padding: 0,
                      }}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="ExpansionMargin"
                        style={{
                          border: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: "19px",
                            textAlign: "center",
                          }}
                        >
                          Other Details
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{
                          border: "none",
                          boxShadow: "none",
                          padding: 0,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Card>
                              <Divider />
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>{vehicle.details}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Card>
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      } else {
        return <p>Rendering data ...</p>;
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
    vehicle: state.api.getvehicle,
    universal: state.api.universal,
    vehiclecheck: state.api["getvehicle-check"],
  };
};

export default connect(mapStateToProps, { getData })(ProfileCard);
