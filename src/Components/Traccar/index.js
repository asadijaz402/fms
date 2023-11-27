import React, { useRef } from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  // useMapEvents
} from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerContent from './components/MarkerContent';
import useTrackerContext from '../../pages/dashboard/fleet/vehicleDetails/hooks/useTrackerContext';
import LeafletRoutingMachine from './components/LeafletRoutingMachine';
import TrackerReplayDialog from '../../pages/dashboard/fleet/vehicleDetails/Components/Dialog/TrackerReplayDialog';

//www.ultimateakash.com/blog-details/Ii1DOGAKYAo=/How-To-Integrate-Leaflet-Maps-in-React-2022

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  const mapRef = useRef();
  const zoom = 16;
  const containerStyle = {
    width: '100%',
    height: '100%',
    flexGrow: 1,
  };

  const { positions, center } = useTrackerContext();

  // const mapClicked = async (event) => {
  //   console.log(event.latlng.lat, event.latlng.lng);
  // };

  const markerClicked = (marker, index) => {
    console.log(marker.position.lat, marker.position.lng);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.lat, event.lng);
  };

  return (
    <MapContainer
      style={containerStyle}
      center={{ lat: center.latitude, lng: center.longitude }}
      zoom={zoom}
      scrollWheelZoom={true}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MapContent onClick={mapClicked} /> */}
      {positions
        .slice(Math.max(positions.length - 500))
        .map((marker, index) => (
          <MarkerContent
            mapRef={mapRef}
            key={index}
            data={marker}
            draggable={marker.draggable}
            onMarkerClick={(event) => markerClicked(marker, index)}
            onDragEnd={(event) => markerDragEnd(event, index)}
          />
        ))}
      <LeafletRoutingMachine />
      <TrackerReplayDialog onTop={true} />
    </MapContainer>
  );
};

// const MapContent = ({ onClick }) => {
//   // const map = useMapEvents({
//   //   click: (event) => onClick(event),
//   // });
//   return null;
// };

export default MapComponent;
