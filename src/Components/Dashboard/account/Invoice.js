import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { listData } from '../../../slices/CustomSlices/actions/apiActions';
import moment from 'moment';
import { Box, CircularProgress, Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm:ssZ').toString();
};

const Action = ({ value }) => {
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        component={Link}
        to={`/payment/invoiceDetail/${value}`}
      >
        Show Invoice
      </Button>
    </>
  );
};

export const Invoice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    setLoading(true);
    dispatch(listData('company/active_plan', id_token, false)).then((res) => {
      setData(res?.data?.invoice || []);
      setLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      label: 'Id',
      name: 'id',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: 'Plan Name',
      name: 'other',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return value?.product_data?.name;
        },
      },
    },

    {
      label: 'Date Added',
      name: 'created_at',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DateFormat value={value} />;
        },
      },
    },

    {
      label: 'Amount',
      name: 'amount',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: 'Currency',
      name: 'currency',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: 'Action',
      name: 'id',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Action value={value} />;
        },
      },
    },
  ];
  var options = {
    filterType: 'multiselect',
    filter: true,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    responsive: 'stacked',
    textLabels: {
      body: {
        noMatch: <CircularProgress />,
      },
    },
  };
  if (loading) {
    return (
      <Box width={'100%'} style={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (data.length === 0) {
    return <Alert severity="error">No history found!</Alert>;
  } else {
    return <MUIDataTable columns={columns} options={options} data={data} />;
  }
};
