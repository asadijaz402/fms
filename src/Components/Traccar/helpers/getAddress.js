import axios from 'axios';

export const getAddress = (lat, lng) => {
  return axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    )
    .then((res) => {
      return res;
    });
};
