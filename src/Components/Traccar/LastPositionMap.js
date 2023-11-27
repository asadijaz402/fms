import React, { useRef } from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Paper, Box } from '@mui/material';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import useTrackerContext from '../../pages/dashboard/fleet/vehicleDetails/hooks/useTrackerContext';
import MarkerContent from './components/MarkerContent';

//www.ultimateakash.com/blog-details/Ii1DOGAKYAo=/How-To-Integrate-Leaflet-Maps-in-React-2022

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LastPositionMap = () => {
  const mapRef = useRef();
  const zoom = 16;
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const { center } = useTrackerContext();

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ height: '100%', minHeight: '400px' }}
    >
      <Box>
        {center && center.id ? (
          <MapContainer
            style={containerStyle}
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={zoom}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerContent data={center} mapRef={mapRef} draggable={false} />
          </MapContainer>
        ) : (
          <Box p={1}>No data found.</Box>
        )}
      </Box>
    </Paper>
  );
};

export default LastPositionMap;
