import { useState, useEffect } from 'react';
import { listData } from '../../slices/CustomSlices/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';

export default function useDynamicDialogs(url, update) {
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const fetchApi = () => {
    setLoading(true);
    dispatch(listData(url, id_token, false)).then((res) => {
      setFetchData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, [id_token, update, url]);

  return { loading, fetchData };
}
