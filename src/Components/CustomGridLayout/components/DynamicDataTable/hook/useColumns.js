import { useState, useEffect, useMemo } from 'react';
import { cell, EditCell, labelGenerator, selector } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../../../../slices/CustomSlices/actions/apiActions';

export default function useColumns(data = false, columnsCustom, model_table) {
  const [initColumns, setInitColumns] = useState([]);
  const [newColumnArray, setNewColumnArray] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [updatedColumns, setUpdatedColumns] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (data && data.length !== 0) {
      setInitColumns(Object.keys(data[0]));
    }
    // eslint-disable-next-line
  }, [data]);

  // eslint-disable-next-line
  const columns = useMemo(() => {
    return [...updatedColumns, ...customFields, ...newColumnArray];
    // eslint-disable-next-line
  }, [customFields]);

  const map_new_custom_columns = () => {
    let map = columnsCustom.filter((n) => n.name === 'newColumnArray');
    if (map.length !== 0) {
      map = map[0];
      setNewColumnArray(
        map.new.map((n) => {
          return {
            name: n.label,
            cell: (row) => cell(row, n),
            ...n.props,
          };
        })
      );
    } else {
      return [];
    }
  };

  const map_dynamic_custom_fields = (fields) => {
    let map = columnsCustom.filter((n) => n.name === 'customFields');

    if (map.length !== 0) {
      return fields.map((n) => {
        return {
          name: n.name,
          cell: (row) => EditCell(row, n),
        };
      });
    } else {
      return [];
    }
  };

  const fetchCustomFields = () => {
    setLoading(true);
    return dispatch(
      getData('all/' + model_table, 'customFields', id_token, false)
    ).then((res) => {
      setLoading(false);
      setCustomFields(map_dynamic_custom_fields(res.data));
    });
  };

  const map_columns_with_columnsCustom = () => {
    // let new_columns = await map_dynamic_custom_fields();
    let columns = initColumns
      .filter((n) => n !== 'customFields')
      .map((column) => {
        let map = columnsCustom.filter((n) => n.name === column);
        if (map.length !== 0) {
          map = map[0];
          return {
            name: map.label ? map.label : labelGenerator(column),
            selector: (row) => selector(row, map),
            cell: (row) => cell(row, map),
            sortable: map.sort ? true : false,
            omit: map.omit ? true : false,
            reorder: true,
            ...map.props,
          };
        } else {
          return {
            name: labelGenerator(column),
            selector: (row) => row[column],
            reorder: true,
            cell: (row) => cell(row, column),
          };
        }
      });
    map_new_custom_columns();
    setUpdatedColumns(columns);
  };

  useEffect(() => {
    if (initColumns) {
      map_columns_with_columnsCustom();
      fetchCustomFields();
    }
    // eslint-disable-next-line
  }, [initColumns]);

  return {
    columns,
    isLoading,
  };
}
