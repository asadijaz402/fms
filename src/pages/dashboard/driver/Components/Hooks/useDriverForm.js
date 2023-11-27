import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  createUpdateData,
  putData,
} from '../../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';

export default function useDriverForm(rowId, data, handleClose, step) {
  const [activeStep, setActiveStep] = useState(step);

  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: 'driver',
    err: 'Error creating Driver.',
    success: 'Driver created.',
  });
  const [vehicle, setVehicle] = useState('');
  const [driver, setDriver] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rowId) {
      setValue((value) => {
        return {
          ...value,
          ...data,
        };
      });
      setCallToAction({
        action: putData,
        url: 'driver/' + rowId,
        err: 'Error updating!',
        success: 'Driver Updated.',
      });
    }
  }, [rowId, data]);

  const handleChange = (e, date = false) => {
    if (date) {
      setValue((value) => {
        return {
          ...value,
          driving_license_expiry_date: moment(e).format('YYYY-MM-DD'),
        };
      });
    } else {
      setValue((value) => {
        return { ...value, [e.target.name]: e.target.value };
      });
    }
  };

  const assignedVehicle = () => {
    if (!rowId) {
      dispatch(
        createUpdateData(
          { driver: driver, vehicle: vehicle?.value },
          `driver/assigned`,
          idToken,
          false
        )
      ).then((res) => handleClose());
    } else {
      dispatch(
        createUpdateData(
          { driver: rowId, vehicle: vehicle?.value },
          `driver/assigned`,
          idToken,
          false
        )
      ).then((res) => handleClose());
    }
  };
  const vehicleChange = (value) => {
    setVehicle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setActiveStep(1);

    dispatch(callToAction.action(value, callToAction.url, idToken, false))
      .then((res) => {
        if (res?.response?.status === 402) {
          toast.error(
            res?.response?.data?.msg
              ? res?.response?.data?.msg
              : callToAction.err
          );
        } else {
          setDriver(res.id);
          toast.success(callToAction.success);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(callToAction.err);
        toast.error(callToAction.err);
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    activeStep,
    handleChange,
    value,
    loading,
    error,
    vehicleChange,
    vehicle,
    assignedVehicle,
  };
}
