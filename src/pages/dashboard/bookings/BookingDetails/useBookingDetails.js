import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getData,
  editUpdateData,
  createUpdateData,
  deleteData,
} from '../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';

export default function useBookingDetails() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sharedData, setSharedData] = useState([]);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  let { bookingId } = useParams();
  const location = useLocation();
  const fetchData = () => {
    setLoading(true);
    dispatch(getData(bookingId, 'hiring/bookings', id_token, false)).then(
      (res) => {
        setData(res.data);
        setLoading(false);
      }
    );
    if (location.path === '/share/details/overview/:param')
      dispatch(
        getData(bookingId, 'hiring/bookings/share', id_token, false)
      ).then((res) => {
        setSharedData(res.data);
        setLoading(false);
      });
  };

  const addVehicles = (vehicle_id) => {
    dispatch(
      createUpdateData(
        {
          ...data[0],
          customer: data[0].customer.id,
          dispatched_by: data[0].dispatched_by.id,
          vehicle: vehicle_id,
        },
        'hiring/rental_records',
        id_token,
        false
      )
    ).then(() => {
      setTimeout(() => fetchData(), [500]);
    });
  };

  const removeVehicle = (id) => {
    dispatch(deleteData(id, 'hiring/rental_records', id_token, false)).then(
      () => {
        fetchData();
        // setData(data.filter((row) => row.id !== id));
        toast.success('Vehicle removed');
      }
    );
  };

  const changeStatus = (status) => {
    dispatch(
      editUpdateData(
        {},
        'hiring/bookings/' + bookingId,
        status,
        id_token,
        false
      )
    ).then(() => {
      toast.success('Status updated to ' + status);
      fetchData();
    });
  };

  const getPrecheckHistory = (vehicle_id) => {
    return dispatch(
      getData(vehicle_id, 'vehicle_accessories/precheck', id_token, false)
    ).then((res) => {
      return res.data;
    });
  };

  useEffect(() => {
    if (bookingId) {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line
  }, [bookingId]);

  const updateBookings = (temp_data = false) => {
    if (temp_data) {
      temp_data.map((row) => {
        return dispatch(
          editUpdateData(
            {
              ...row,
              customer: row.customer.id,
              dispatched_by: row.dispatched_by.id,
              vehicle: row.vehicle.id,
            },
            'hiring/rental_records',
            row.id,
            id_token,
            false
          )
        ).then(() => {
          toast.success('Updated successfully');
          fetchData();
        });
      });
    } else {
      data.map((row) => {
        return dispatch(
          editUpdateData(
            {
              ...row,
              customer: row.customer.id,
              dispatched_by: row.dispatched_by.id,
              vehicle: row.vehicle.id,
            },
            'hiring/rental_records',
            row.id,
            id_token,
            false
          )
        ).then(() => {
          toast.success('Updated successfully');
          fetchData();
        });
      });
    }
  };

  return {
    bookingId,
    loading,
    data,
    sharedData,
    setData,
    changeStatus,
    getPrecheckHistory,
    updateBookings,
    addVehicles,
    removeVehicle,
  };
}
