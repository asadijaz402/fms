import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  deleteData,
  getData,
  putData,
  resetList as resetListAction,
} from '../../../slices/CustomSlices/actions/apiActions';
import { components as componentList } from '../helpers/componentsList';
import { getDataFromLocal } from '../helpers/getDataFromLocal';
import { getTableInfo, apiTableList } from '../helpers/apiCalls';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// DashboardContext

export default function useWidgetsAdd() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({});
  const [selectedValues, setSelectedValues] = useState(getDataFromLocal());
  const [switches, setSwitches] = useState({});
  const initializeSwitchesRef = useRef(true);
  const [mode, setMode] = useState('preview');
  const [dashboardInfo, setDashboardInfo] = useState({});

  const { dashboardId, state } = useParams();
  const navigate = useNavigate();

  const getDashboard = () => {
    setLoading(true);
    dispatch(getData(dashboardId, 'dnd/dashboard', id_token, false)).then(
      (res) => {
        setLayouts(res.data.data.layout);
        setSelectedValues(res.data.data.widgets);
        setDashboardInfo(res.data.data.dashboardInfo);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (state === 'view') {
      getDashboard();
      setMode('live');
    } else if (state === 'draft') {
      getDashboard();
      setMode('draft');
    } else if (state === 'new') {
      setMode('new');
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [state, dashboardId]);

  const deleteDashboard = () => {
    dispatch(deleteData(dashboardId, 'dnd/dashboard', id_token, false)).then(
      (res) => {
        toast.success('Dashboard deleted!');
        navigate('/account');
      }
    );
  };

  const handleDashboardChange = (e) => {
    setDashboardInfo({
      ...dashboardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    if (!layouts) {
      return [];
    }
    const componentArray = layouts.reduce((acc, item) => {
      const component = componentList
        .reduce((acc, curr) => {
          return acc.concat(curr.component);
        }, [])
        .find((component) => component.id === selectedValues[item.i].widget);

      if (component) {
        const { w, h, x, y } = item;
        acc.push({ ...component, w, h, x, y, uniqueId: item.i });
      }
      return acc;
    }, []);

    setItems(componentArray);
    // eslint-disable-next-line
  }, [selectedValues]);

  const fetchDataForWidget = (w_id, uniqueId) => {
    let onSubmit = {};
    // eslint-disable-next-line
    componentList.map((n) => {
      if (n.component.filter((x) => x.id === w_id).length !== 0) {
        onSubmit = n.component.filter((x) => x.id === w_id)[0].onSubmit;
      }
    });

    dispatch(
      onSubmit.action(onSubmit.url(selectedValues[uniqueId]), id_token, false)
    ).then((res) => {
      if (res.status === 200) {
        setSelectedValues((selectedValues) => {
          return {
            ...selectedValues,
            [uniqueId]: {
              ...selectedValues[uniqueId],
              res: res.data,
            },
          };
        });
      } else {
        toast.error(res.data);
      }
    });
  };

  //Get Data for Total Widget
  //set Graph Data
  const onSubmit = (e, uniqueId) => {
    e.preventDefault();
    fetchDataForWidget(settings.config.table.w_id, uniqueId);
  };

  //when layout Changes
  const onLayoutChange = (layout) => {
    setLayouts(layout);
  };

  const saveToDB = (button = false) => {
    let action = createUpdateData;
    let url = 'dnd/dashboard';
    let newEntry = true;
    if (mode === 'draft') {
      action = putData;
      url = url + '/' + dashboardId;
      newEntry = false;
    }
    if (dashboardInfo.title) {
      dispatch(
        action(
          {
            name: dashboardInfo.title,
            data: {
              version: '0.1',
              layout: layouts,
              widgets: selectedValues,
              dashboardInfo,
            },
            position: 1,
          },
          url,
          id_token,
          false
        )
      ).then((res) => {
        if (button) {
          toast.success('Dashboard Saved');
        }
        if (newEntry) {
          navigate('/editDashboard/draft/' + res.data.id);
        }
      });
    }
  };

  //On saving Layout => for now Local Storage
  const onLayoutSave = () => {
    saveToDB(true);
  };

  //On Adding Item to the Layout
  const onAddItem = (itemId) => {
    setItems([...items, { ...itemId, uniqueId: uid() }]);
  };

  //On Dragging Items on the Layout
  const onDragEnd = (draggableId) => {
    const component = componentList
      .find((item) =>
        item.component.find((c) => c.id === draggableId.draggableId)
      )
      .component.find((c) => c.id === draggableId.draggableId);

    onAddItem(component);
  };

  const onRemoveItem = (item) => {
    //On Removing Item to the Layout
    setItems(items.filter((i) => i.uniqueId !== item.uniqueId));
  };

  const fetchTableFields = (event) => {
    getTableInfo(dispatch, id_token, event.target.value).then((res) => {
      setSettings((prevsettings) => {
        let NewObject = prevsettings;
        Object.keys(prevsettings.config)
          .filter((n) => n.includes('column'))
          // eslint-disable-next-line
          .map((row) => {
            NewObject = {
              ...NewObject,
              config: {
                ...NewObject.config,
                [row]: {
                  ...NewObject.config[row],
                  options: res.data.data.fields,
                },
              },
            };
          });

        return NewObject;
      });
    });
  };

  const updateSelectedValues = (field, value, w_id, uniqueId) => {
    setSelectedValues((values) => ({
      ...values,
      [uniqueId]: {
        ...values[uniqueId],
        [field]: value,
        widget: w_id,
      },
    }));
  };
  //setting the Options Fields for each Widget
  const handleConfigFieldChange = (field, event, w_id, uniqueId) => {
    updateSelectedValues(field, event.target.value, w_id, uniqueId);
    switch (field) {
      case 'table':
        fetchTableFields(event);
        break;
      default:
        break;
    }
  };

  //GetData for DropDown menus In options
  const getTablesList = () => {
    apiTableList(dispatch, id_token).then((res) => {
      setSettings((settings) => {
        return {
          ...settings,
          config: {
            ...settings.config,
            table: {
              ...settings.config.table,
              options: res.data.data,
            },
          },
        };
      });
    });
  };

  const onSettings = (item) => {
    dispatch(resetListAction());
    setSettings(item);
    getTablesList();
    if (settings.uniqueId && selectedValues[settings.uniqueId]?.table) {
      fetchTableFields({
        target: { value: selectedValues[settings.uniqueId]?.table },
      });
    }
  };

  return {
    onAddItem,
    onRemoveItem,
    onDragEnd,
    items,
    setItems,
    layouts,
    onLayoutChange,
    onLayoutSave,
    settings,
    setSettings,
    getTablesList,
    handleConfigFieldChange,
    onSubmit,
    setSwitches,
    selectedValues,
    switches,
    initializeSwitchesRef,
    onSettings,
    mode,
    setMode,
    handleDashboardChange,
    dashboardInfo,
    fetchDataForWidget,
    loading,
    deleteDashboard,
    dashboardId,
  };
}
