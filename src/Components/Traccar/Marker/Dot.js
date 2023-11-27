import L from 'leaflet';

const iconDot = new L.Icon({
  iconUrl: require('./dot.png'),
  iconRetinaUrl: require('./dot.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(5, 5),
  className: 'leaflet-div-icon',
});

export { iconDot };
