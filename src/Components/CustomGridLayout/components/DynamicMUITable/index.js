import React, { useEffect, useState, useCallback } from 'react';
import MUIDataTable from 'mui-datatables';
import { generateColumns } from './utils/columns';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { DataGraphs } from '../../../../slices/CustomSlices/actions/apiActions';
import { useDashboardContext } from '../../hooks/DashboardContext';
// https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-pagination/index.js

const useStyles = makeStyles((theme) => ({
  progress: {
    marginLeft: theme.spacing(2),
    position: 'relative',
    top: theme.spacing(1),
  },
}));

export default function DunamicMUITable({
  urlLink,
  title,
  addNew,
  columnsCustom,
  options = {},
  setApiData,
  description = false,
}) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [params, setParams] = useState([
    { name: 'ordering', value: '' },
    { name: 'status', value: '' },
    { name: 'search', value: '' },
    { name: 'page', value: 1 },
  ]);
  const [data, setData] = useState([['Loading Data...']]);

  const idToken = useSelector((state) => state.user.id_token);
  let resetList = useSelector((state) => state.api.resetList);
  const {
    setSettings,
    setColumns,
    columns,
    setSwitches,
    initializeSwitchesRef,
  } = useDashboardContext();
  useEffect(() => {
    setLoading(true);
    dispatch(DataGraphs(urlLink, idToken, false)).then((res) => {
      setColumns(generateColumns(res.data.results, columnsCustom));
      setData(res.data);
      if (setApiData) {
        setApiData(res.data.results);
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [urlLink, params, resetList]);

  useEffect(() => {
    if (columns.length > 0 && initializeSwitchesRef.current) {
      const initialState = {};
      columns.forEach((column) => {
        initialState[column.name] = true;
      });
      setSwitches(initialState);
      initializeSwitchesRef.current = false;
    }
    if (columns.length > 0) {
      setSettings((settings) => {
        return {
          ...settings,
          tableColumns: {
            ...settings.columnsTable,
            options: columns,
          },
        };
      });
    }
  }, [columns, setSwitches, initializeSwitchesRef]);

  // setSwitches(() => {
  //   const initialState = {};
  //   columns.forEach((column, index) => {
  //     const columnName = column.name;
  //     initialState[columnName] = true;
  //   });
  //   return initialState;
  // });

  // eslint-disable-next-line
  const muiTableAction = useCallback(
    _.debounce((page, tableState) => {
      let sortString = '';
      if (Object.keys(tableState.sortOrder).length !== 0) {
        if (tableState.sortOrder.direction === 'desc') {
          sortString = tableState.sortOrder.name;
        } else {
          sortString = `-${tableState.sortOrder.name}`;
        }
      }

      const filterList = columnsCustom.filter((columnRow) => columnRow.filter);
      const customFilterParams = filterList.map((fl) => {
        const tempListFilter =
          tableState.filterList[
            tableState.columns.findIndex((x) => x.name === fl.name)
          ];
        if (tempListFilter && tempListFilter.length !== 0) {
          return {
            name: fl.name,
            value: tempListFilter.map((keyValue) => keyValue).join(','),
          };
        }
        return { name: '', value: '' };
      });

      setParams([
        ...customFilterParams,
        { name: 'ordering', value: sortString },
        {
          name: 'search',
          value: tableState.searchText ? tableState.searchText : '',
        },
        { name: 'page', value: page + 1 },
      ]);
    }, 500),
    []
  );

  var tableOptions = {
    responsive: 'stacked',
    serverSide: true,
    count: data.count,
    rowsPerPage: 10,
    rowsPerPageOptions: [],
    jumpToPage: true,
    onChangePage: (e) => {
      console.log(e);
    },
    onTableChange: (action, tableState) => {
      if (
        action === 'sort' ||
        action === 'changePage' ||
        action === 'search' ||
        action === 'filterChange'
      ) {
        muiTableAction(tableState.page, tableState);
      }
    },
    filterType: 'multiselect',
    filter: true,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    download: false,
    print: false,
    // download: user_data.groups.includes(6),
    // print: user_data.groups.includes(6),
    customToolbar: () => {
      if (addNew) {
        return addNew;
      }
      return true;
    },
    ...options,
  };

  return (
    // <Paper variant="outlined" elevation={3}>
    <>
      <MUIDataTable
        title={
          <>
            <Typography variant="h6">
              {`${title} `}
              {isLoading && (
                <CircularProgress size={24} className={classes.progress} />
              )}
            </Typography>
            {description && (
              <Typography variant="body2">{`${description} `}</Typography>
            )}
          </>
        }
        columns={columns}
        options={tableOptions}
        data={data.results}
      />
    </>
    // </Paper>
  );
}
