import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  deleteData,
  listData,
} from '../slices/CustomSlices/actions/apiActions';
import { toast } from 'react-hot-toast';

export default function useInstaller() {
  const [navigation, setNavigation] = useState(false);
  const [installed, setInstalled] = useState([]);
  const [installable, setInstallable] = useState(false);
  const [options, setOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const fetchInstalledApps = () => {
    dispatch(listData('installer/list/installedApps', id_token, false)).then(
      (res) => {
        setInstallable(res.data?.apps);
      }
    );
  };

  useEffect(() => {
    fetchInstalledApps();
    // eslint-disable-next-line
  }, []);

  const mapApps = () => {
    setInstalled(
      navigation.map((n) => {
        if (installable.filter((x) => x.name === n.title).length !== 0) {
          return {
            ...n,
            display: true,
          };
        } else {
          return n;
        }
      })
    );
  };

  useEffect(() => {
    if (navigation) {
      if (installable) {
        mapApps();
      } else {
        setInstalled(navigation);
      }
    }
    // eslint-disable-next-line
  }, [installable, navigation]);

  const fetchOptions = () => {
    setLoading(true);
    dispatch(listData('installer/list/apps', id_token, false)).then((res) => {
      setOptions(res.data);
      setLoading(false);
    });
  };

  const handleInstall = (e, id) => {
    if (e.target.checked) {
      dispatch(
        createUpdateData(
          {},
          'installer/list/installedApps/' + id,
          id_token,
          false
        )
      ).then((res) => {
        if (res.status === 200) {
          setInstallable(res.data.apps);
          toast.success('App Installed!');
        } else {
          toast.error('Error Installing!');
        }
      });
    } else {
      dispatch(
        deleteData(id, 'installer/list/installedApps', id_token, false)
      ).then((res) => {
        if (res.status === 200) {
          setInstallable(res.data.apps);
          toast.success('App Removed!');
        } else {
          toast.error('Error Removing!');
        }
      });
    }
  };

  const installerHidden = (appName) => {
    if (
      installable &&
      installable.filter((n) => n.name === appName).length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return {
    setNavigation,
    installed,
    installable,
    options,
    fetchOptions,
    loading,
    handleInstall,
    installerHidden,
  };
}
