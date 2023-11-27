import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listData,
  getData,
} from '../../../slices/CustomSlices/actions/apiActions';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getAddress } from '../helpers/getAddress';

export default function useTracker() {
  const [loading, setLoading] = useState(true);
  const [tracker, setTracker] = useState({});
  const [positions, setPositions] = useState([]);
  const [center, setCenter] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [address, setAddress] = useState({});
  let id_token = useSelector((state) => state.user.id_token);

  const { vehicleId, start_date, end_date, mapRefresh } = useParams();
  const dispatch = useDispatch();

  const fetchTracker = () => {
    setLoading(true);
    return dispatch(getData(vehicleId, 'tracker/device', id_token, false)).then(
      (res) => {
        setTracker(res.data);
        return res;
      }
    );
  };

  const fetchAdress = (lat, lng) => {
    setAddress({});
    getAddress(lat, lng).then((res) => {
      setAddress({
        lat: lat,
        lng: lng,
        address: res.data.display_name,
      });
    });
  };

  const fetchPosition = () => {
    // setLoading(true);
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    let api_start_date = start_date
      ? start_date
      : moment(yesterday).toISOString();
    let api_end_date = end_date ? end_date : moment().toISOString();

    const url = `tracker/positions?vehicle_id=${vehicleId}&from=${api_start_date}&to=${api_end_date}`;
    return dispatch(listData(url, id_token, false, '')).then((res) => {
      if (res?.data) {
        setPositions(res.data);
        setCenter(res.data[res.data.length - 1]);
      }
      return res;
    });
  };

  useEffect(() => {
    if (mapRefresh && mapRefresh === 'live') {
      const interval = setInterval(() => fetchPosition(), 60000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [mapRefresh]);

  useEffect(() => {
    Promise.all([fetchPosition(), fetchTracker()]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [id_token, refresh, start_date, end_date]);

  const refreshAPI = () => {
    setRefresh(!refresh);
  };

  return {
    loading,
    positions,
    center,
    tracker,
    vehicleId,
    refreshAPI,
    fetchAdress,
    address,
  };
}
