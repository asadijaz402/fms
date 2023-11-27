import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listData } from '../slices/CustomSlices/actions/apiActions';
import { Add as AddIcon } from '@mui/icons-material';

export default function useDashboard(list) {
  const [navigation, setNavigation] = useState([]);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const fetchDashboardList = () => {
    dispatch(listData('dnd/dashboard/all', id_token, false)).then((res) => {
      let dashboards = res.data.map((n) => {
        return {
          title: n.name,
          path: '/customDashboard/view/' + n.id,
          display: true,
        };
      });
      setNavigation([
        {
          title: 'Dashboard',
          display: true,
          items: [
            ...dashboards,
            {
              title: 'Create New',
              path: '/newDashboard/new',
              display: true,
              icon: <AddIcon />,
            },
          ],
        },
        ...list,
      ]);
    });
  };

  useEffect(() => {
    if (list.length !== 0) {
      fetchDashboardList();
    }
    // eslint-disable-next-line
  }, [list]);

  return {
    navigation,
  };
}
