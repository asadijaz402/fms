import { Grid } from "@mui/material";
import TotalVehicles from "./TotalVehicles";
import HiredVehicles from "./HiredVehicles";
// import InsuredVansHiredVans from "./InsuredVansHiredVans";
import VehicleOffRoad from "./VehicleOffRoad";
import VehicleOffRoadNotBillable from "./VehicleOffRoadNotBillable";

const AnalyticsGeneralOverview = () => (
  <Grid container spacing={2}>
    <Grid item md={3} sm={6} xs={12}>
      <TotalVehicles />
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <HiredVehicles />
    </Grid>
    {/* <Grid item md={3} sm={6} xs={12}>
      <InsuredVansHiredVans />
    </Grid> */}
    <Grid item md={3} sm={6} xs={12}>
      <VehicleOffRoad />
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <VehicleOffRoadNotBillable />
    </Grid>
  </Grid>
);

export default AnalyticsGeneralOverview;
