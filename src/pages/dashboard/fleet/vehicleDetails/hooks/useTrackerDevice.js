import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  getData,
  putData,
} from '../../../../../slices/CustomSlices/actions/apiActions';

export default function useTrackerDevice(vehicle_id, resetAPI) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState({
    action: createUpdateData,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ disabled: 'false' });

  const fetchDeviceData = () => {
    setLoading(true);
    dispatch(getData(vehicle_id, 'tracker/device', id_token, false)).then(
      (res) => {
        if (res.status === 200) {
          setValue(res.data);
          setAction({
            action: putData,
          });
        }
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (open) {
      if (vehicle_id) {
        fetchDeviceData();
        handleChange({
          target: {
            name: 'vehicle',
            value: vehicle_id,
          },
        });
      }
    }
    // eslint-disable-next-line
  }, [vehicle_id, open]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const createUpdate = () => {
    setLoading(true);
    dispatch(action.action(value, 'tracker/device', id_token, false)).then(
      (res) => {
        handleClose();
        setLoading(false);
        if (resetAPI) {
          resetAPI();
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUpdate();
  };

  return {
    open,
    loading,
    handleClickOpen,
    handleClose,
    handleSubmit,
    handleChange,
    value,
  };
}
