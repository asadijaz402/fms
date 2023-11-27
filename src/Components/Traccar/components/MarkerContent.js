import { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button, Divider, Box } from '@mui/material';
import useTrackerContext from '../../../pages/dashboard/fleet/vehicleDetails/hooks/useTrackerContext';
import { ListElement } from '../../../pages/dashboard/fleet/vehicleDetails/Components/Tracker/Summary/components/ListElement';
import moment from 'moment';

const MarkerContent = (props) => {
  const markerRef = useRef();
  const { draggable, data } = props;
  const { address, fetchAdress } = useTrackerContext();

  return (
    <Marker
      position={{
        lat: data.latitude,
        lng: data.longitude,
      }}
      draggable={draggable}
      // eventHandlers={{
      //   click:  (event) => onMarkerClick(event),
      //   dragend: () => onDragEnd(markerRef.current.getLatLng()),
      // }}
      // icon={customMarkerIcon}
      ref={markerRef}
    >
      <Popup>
        <ListElement heading="Speed" content={data.speed + ' km/h'} />
        <ListElement heading="Latitude" content={data.latitude} />
        <ListElement heading="Longitude" content={data.longitude} />
        <ListElement
          heading="Device Time"
          content={moment(data.deviceTime, 'YYYY-MM-DDTHH:mm:ssZ').toString()}
        />
        <ListElement
          heading="Server Time"
          content={moment(data.serverTime).toString()}
        />
        <Divider />
        {address &&
        address.lat === data.latitude &&
        address.lng === data.longitude ? (
          <ListElement heading="Address" content={address.address} />
        ) : (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Button
              fullWidth
              size="small"
              onClick={() => fetchAdress(data.latitude, data.longitude)}
              variant="outlined"
            >
              Show Address
            </Button>
          </Box>
        )}
      </Popup>
    </Marker>
  );
};

export default MarkerContent;
