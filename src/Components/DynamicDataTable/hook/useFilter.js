import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listData,
  getData,
} from '../../../slices/CustomSlices/actions/apiActions';
import { labelGenerator } from '../helpers';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';

export default function useFilter() {
  const [show, setShow] = useState(false);
  const [f_columns, setF_Columns] = useState({});
  const [filterLoading, setFilterLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState({});
  const [dynamicFilter, setDynamicFilter] = useState({});
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem(location.pathname + '_table_filter')) {
      setFilter(
        JSON.parse(localStorage.getItem(location.pathname + '_table_filter'))
      );
      setShow(true);
    }
    // eslint-disable-next-line
  }, []);

  const fetchFilterData = (row) => {
    dispatch(listData(row.filterData.url, id_token, false)).then((res) => {
      setFilters((filters) => [
        ...filters,
        {
          ...row,
          label: row.label ? row.label : labelGenerator(row.name),
          list: res?.data?.map((n) => n[row.filterData.target]),
          query: row.filterData.query,
        },
      ]);
    });
  };

  const init = (columnsCustom) => {
    setFilterLoading(true);
    setFilters([]);
    let allowFilter = columnsCustom.filter((n) => n.filter);
    if (allowFilter.length !== 0) {
      // eslint-disable-next-line
      allowFilter.map((row) => {
        if (row.filterData.type === 'multiple') {
          if (row.filterData.url) {
            fetchFilterData(row);
          } else {
            setFilters((filters) => [
              ...filters,
              {
                ...row,
                query: row.filterData.query,
                label: row.label ? row.label : labelGenerator(row.name),
                list: row.filterData.list,
              },
            ]);
          }
        } else if (row.filterData.type === 'date') {
          setFilters((filters) => [
            ...filters,
            {
              ...row,
              query: row.filterData.query,
              label: row.label ? row.label : labelGenerator(row.name),
            },
          ]);
        }
      });
    }
    setFilterLoading(false);
  };

  const addMultipleFilter = (label, value) => {
    if (filter[label]) {
      let filterString = filter[label].split(',');
      if (filterString.filter((n) => n === value).length !== 0) {
        filterString = filterString.filter((n) => n !== value);
        if (filterString.length === 0) {
          let newFilter = {};
          Object.keys(filter)
            .filter((n) => n !== label)
            .map((n) => {
              newFilter = { ...newFilter, n };
              return newFilter;
            });
          setFilter(newFilter);
        } else {
          setFilter({ ...filter, [label]: filterString.toString() });
        }
      } else {
        setFilter({
          ...filter,
          [label]: filter[label] + ',' + value,
        });
      }
    } else {
      setFilter({
        ...filter,
        [label]: value,
      });
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const filterToParams = () => {
    if (filter.length !== 0) {
      let params = '';
      // eslint-disable-next-line
      Object.keys(filter).map((row, index) => {
        if (index === 0) {
          params = row + '=' + filter[row].toString();
        } else {
          params = params + '&' + row + '=' + filter[row].toString();
        }
      });
      // .toString();
      return params;
    } else {
      return '';
    }
  };

  const clearFilter = () => {
    setFilter({});
    if (localStorage.getItem(location.pathname + '_table_filter')) {
      localStorage.setItem(location.pathname + '_table_filter', '');
    }
  };

  const saveFilter = () => {
    localStorage.setItem(
      location.pathname + '_table_filter',
      JSON.stringify(filter)
    );
    toast.success('Filter saved!');
  };

  const clearSpecificFilter = (query) => {
    let newFilter = {};
    Object.keys(filter)
      .filter((n) => n !== query)
      .map((row) => {
        newFilter = { ...newFilter, [row]: filter[row] };
        return newFilter;
      });
    setFilter(newFilter);
  };

  const addDateFilter = (query, value) => {
    setFilter({
      ...filter,
      [query]: value,
    });
  };

  const fetchDynamicFilterColumnList = (dynamicFilter, model_table) => {
    if (dynamicFilter) {
      dispatch(
        getData(model_table, 'superAdmin/table/info', id_token, false)
      ).then((res) => {
        setF_Columns(res.data.data);
      });
    }
  };

  const setDynamicFilterField = (field, filter, value) => {
    setDynamicFilter({
      ...dynamicFilter,
      field,
      filter,
      value,
    });
  };

  const applyDynamicFilter = () => {
    if (Object.keys(dynamicFilter).length !== 0 && dynamicFilter.value) {
      if (!filter[dynamicFilter.field + '__' + dynamicFilter.filter.value]) {
        setFilter({
          ...filter,
          filtering_fields:
            dynamicFilter.filter.value === 'exact'
              ? dynamicFilter.field
              : dynamicFilter.field + '__' + dynamicFilter.filter.value,
          [dynamicFilter.filter.value === 'exact'
            ? dynamicFilter.field
            : dynamicFilter.field + '__' + dynamicFilter.filter.value]:
            dynamicFilter.value,
        });
      }
    }
  };

  console.log('filter', filter);
  console.log('params', filterToParams());

  return {
    init,
    show,
    handleShow,
    filterLoading,
    filters,
    addMultipleFilter,
    filter,
    filterToParams,
    clearFilter,
    clearSpecificFilter,
    addDateFilter,
    saveFilter,
    fetchDynamicFilterColumnList,
    f_columns,
    setDynamicFilterField,
    dynamicFilter,
    applyDynamicFilter,
  };
}
