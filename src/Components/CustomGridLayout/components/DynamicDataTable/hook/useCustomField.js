import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  getData,
  createUpdateData,
  putData,
  deleteData,
} from '../../../../../slices/CustomSlices/actions/apiActions';

export default function useCustomField(model_table, addEdit, id) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [actions, setActions] = useState({
    action: createUpdateData,
    url: 'customFields/field',
  });
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteData(id, 'customFields/delete', id_token, false)).then(
      () => {
        toast.success('Field deleted!');
        setOpen(false);
        setLoading(false);
      }
    );
  };

  const listTableFields = () => {
    setLoading(true);
    if (addEdit) {
      dispatch(getData('fields', 'customFields', id_token, false)).then(
        (res) => {
          setData(res.data);
          setLoading(false);
        }
      );
      if (id) {
        dispatch(getData(id + '/null', 'customFields', id_token, false)).then(
          (res) => {
            if (res.data.props?.options) {
              setOptions(
                res.data.props?.options.map((n) => {
                  return {
                    id: new Date().valueOf(),
                    value: n,
                  };
                })
              );
            }

            setValue({
              ...value,
              ...res.data,
              fieldType: res.data.fieldType.id,
              appModel: model_table,
            });

            setActions({
              url: 'customFields/update/' + id,
              action: putData,
            });
            setLoading(false);
          }
        );
      }
    } else {
      dispatch(
        getData('all/' + model_table, 'customFields', id_token, false)
      ).then((res) => {
        setData(res.data);
        setValue({ ...value, appModel: model_table });
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (open) {
      listTableFields();
    }
    // eslint-disable-next-line
  }, [open, id, model_table]);

  useEffect(() => {
    if (value?.fieldType >= 3 && value?.fieldType <= 5) {
      if (options.length === 0) {
        setOptions([
          {
            id: new Date().valueOf(),
            value: '',
          },
        ]);
      }
    } else {
      setOptions([]);
    }
    // eslint-disable-next-line
  }, [value]);

  const optionToValue = () => {
    if (options.length !== 0) {
      return {
        ...value,
        props: {
          ...value.props,
          options: options.map((n) => n.value),
        },
      };
    } else {
      return value;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      actions.action(
        { ...optionToValue(), appModel: model_table },
        actions.url,
        id_token,
        false
      )
    ).then((res) => {
      if (res.data?.id) {
        toast.success('Added New Field.');
        handleClose();
      } else {
        toast.error('Error creating field.');
        setError(res.data);
      }
      setLoading(false);
    });
  };

  const optionsCRUD = (action, e) => {
    switch (action) {
      case 'add':
        setOptions([
          ...options,
          {
            id: new Date().valueOf(),
            value: '',
          },
        ]);
        break;
      case 'remove':
        setOptions(options.filter((n) => n.id !== e));
        break;
      case 'changeValue':
        setOptions(
          options.map((n) => {
            if (n.id.toString() === e.target.name) {
              return {
                ...n,
                value: e.target.value,
              };
            } else {
              return n;
            }
          })
        );
        break;
      default:
        break;
    }
  };

  return {
    open,
    loading,
    handleClickOpen,
    handleClose,
    data,
    value,
    handleChange,
    handleSubmit,
    optionsCRUD,
    options,
    error,
    handleDelete,
  };
}
