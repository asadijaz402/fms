import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';
import useTrackerContext from '../../../pages/dashboard/fleet/vehicleDetails/hooks/useTrackerContext';

const LeafletRoutingMachine = () => {
  const map = useMap();
  const { positions } = useTrackerContext();

  useEffect(() => {
    L.Routing.control({
      waypoints: positions
        .slice(Math.max(positions.length - 500))
        .map((n) => L.latLng(n.latitude, n.longitude)),
      lineOptions: {
        styles: [
          {
            color: '#6FA1EC',
            weight: 4,
          },
        ],
      },
      createMarker: function () {
        return null;
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      serviceUrl: 'https://fv-osrm.bondwest.co.uk/route/v1',
    }).addTo(map);
    map.setView([
      positions[positions.length - 1].latitude,
      positions[positions.length - 1].longitude,
    ]);
    // eslint-disable-next-line
  }, [positions]);

  return null;
};

export default LeafletRoutingMachine;
