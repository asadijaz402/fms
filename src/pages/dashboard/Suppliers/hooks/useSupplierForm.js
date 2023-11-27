import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  putData,
} from '../../../../slices/CustomSlices/actions/apiActions';
import toast from 'react-hot-toast';

export default function useSupplierForm(id = false, handleClickClose, data) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: 'vehicle/supplier',
    err: 'Error creating supplier.',
    success: 'Supplier created.',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setValue((value) => {
        return {
          ...value,
          first_name: data[1],
          last_name: data[2],
          email: data[3],
          contact: data[4],
          details: data[5],
        };
      });
      setCallToAction({
        action: putData,
        url: 'vehicle/supplier',
        err: 'Error updating!',
        success: 'Supplier Updated.',
      });
    }
  }, [id, data]);

  const handleChange = (e) => {
    setValue((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    if (id) {
      data.append('id', id);
    }

    data.append('first_name', value.first_name);
    data.append('last_name', value.last_name);
    data.append('email', value.email);
    data.append('contact', value.contact);
    data.append('details', value.details);

    dispatch(callToAction.action(data, callToAction.url, idToken, false))
      .then((res) => {
        if (res.status === 200) {
          toast.success(callToAction.success);
          handleClickClose();
        }
        if (res?.response?.status === 402) {
          toast.error(
            res?.response?.data?.msg
              ? res?.response?.data?.msg
              : 'Error creating Supplier'
          );
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
