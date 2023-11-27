import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, makeStyles, Box, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import SearchLocation from "./SearchLocation";
import SelectGarage from "./SelectGarage";
import { getNearestgarage } from "src/Redux/actions/apiActions";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "./Map.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "10px",
  },
}));

export default function SelectLocation({ value, handleChange, setOpen }) {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [garageList, setGarageList] = useState();
  const classes = useStyles();

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const icon = new L.Icon({
    iconUrl: require("src/Assets/img/location_marker.svg"),
    iconRetinaUrl: require("src/Assets/img/location_marker.svg"),
    iconSize: new L.Point(40, 40),
  });

  const handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  const get_current_location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      dispatch(
        getNearestgarage(
          position.coords.latitude,
          position.coords.longitude,
          "nearestGarage",
          id_token,
          false
        )
      ).then((res) => {
        // console.log(res);
        setGarageList(res.data);
      });
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    if ("geolocation" in navigator) {
      get_current_location();
    } else {
      console.log("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <SearchLocation handleSelect={handleSelect} />
          <div className="map">
            <MapContainer
              center={{ lat: location.lat, lng: location.lng }}
              // {[location.lat, location.lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={icon} position={[location.lat, location.lng]}>
                <Popup>
                  Coordinates are:
                  <br />
                  Lat: {location.lat},
                  <br />
                  Lon: {location.lng}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className={classes.root}>
            <SelectGarage
              value={value}
              handleChange={handleChange}
              garageList={garageList}
            />
          </div>
          <div className={classes.root}>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </Box>
          </div>
        </>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </>
  );
}
