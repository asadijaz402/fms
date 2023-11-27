import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGraphs,
  listData,
} from '../../../../../slices/CustomSlices/actions/apiActions';
import { sortString } from '../helpers';
import useFilterContext from './useFilterContext';

export default function useDynamicDataTable(urlLink, columnsCustom) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  let resetList = useSelector((state) => state.api.resetList);
  const [sort, setSort] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { filterToParams, filter } = useFilterContext();

  const initialData = () => {
    if (data.length === 0) {
      setLoading(true);
    }
    dispatch(DataGraphs(urlLink, id_token, false)).then((res) => {
      setData(res.data.results);
      setCount(res.data.count);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (urlLink) {
      initialData();
    }

    // eslint-disable-next-line
  }, [urlLink, sort, page, pageSize, search, filter, resetList]);

  const handleSort = (column, sortDirection) => {
    setSort(sortString(column, sortDirection, columnsCustom));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPageSize(newPerPage);
    setPage(page);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return {
    loading,
    data,
    count,
    handleSort,
    handlePageChange,
    handlePerRowsChange,
    handleSearch,
  };
}
