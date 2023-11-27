import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUpdateData } from '../../../../../slices/CustomSlices/actions/apiActions';
import _ from 'lodash';

const widgets = {
  Text: {
    widget: 'TextField',
    props: {
      fullWidth: true,
      variant: 'standard',
      margin: 'none',
    },
  },
  Number: {
    widget: 'TextField',
    props: {
      fullWidth: true,
      variant: 'standard',
      margin: 'none',
      type: 'number',
    },
  },
  Date: {
    widget: 'TextField',
    props: {
      fullWidth: true,
      variant: 'standard',
      margin: 'none',
      type: 'date',
    },
  },
  Select: {
    widget: 'SelectField',
    props: {
      fullWidth: true,
      variant: 'standard',
    },
  },
};

export default function useCustomFieldForm(row, field) {
  const [value, setValue] = useState({});
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (row.customFields) {
      setValue(row.customFields);
    }
    // eslint-disable-next-line
  }, [row]);

  const handleChange = (e) => {
    handleSubmit({
      ...value,
      [field.id]: {
        value: e.target.value,
        label: e.target.name.label,
        rowId: e.target.name.rowId,
      },
    });

    setValue({
      ...value,
      [field.id]: {
        value: e.target.value,
        label: e.target.name.label,
        rowId: e.target.name.rowId,
      },
    });
  };

  // eslint-disable-next-line
  const handleSubmit = useCallback(
    _.debounce((updated_values) => {
      //   setLoading(true);
      dispatch(
        editUpdateData(
          updated_values,
          'customFields/dataEntry/' + field.appModel,
          row.id,
          id_token,
          false,
          false
        )
      ).then((res) => {
        // setLoading(false);
        //   toast.success("Updated Data.");
      });
    }, 500),
    []
  );

  return {
    widgets,
    handleChange,
    value,
  };
}
