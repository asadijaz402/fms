import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  putData,
} from '../../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';

export default function useCustomerForm(rowId, data, handleClose) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: 'hiring/customer',
    err: 'Error creating Customer.',
    success: 'Customer created.',
  });

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
        url: 'hiring/customer/' + rowId,
        err: 'Error updating!',
        success: 'Customer Updated.',
      });
    }
  }, [rowId, data]);

  const handleChange = (e) => {
    setValue((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(callToAction.action(value, callToAction.url, idToken, false))
      .then((res) => {
        if (res?.response?.status === 402) {
          toast.error(
            res?.response?.data?.msg
              ? res?.response?.data?.msg
              : callToAction.err
          );
        } else {
          handleClose();
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
    handleChange,
    value,
    loading,
    error,
  };
}
