import React, { useState, useEffect } from 'react';
import ProfileCard from '../../../../../../Components/Profilecard/Card';
import DynamicMUITable from '../../../../../../Components/DynamicMUITable';
import moment from 'moment';
import { Tooltip, Button, Box, Chip } from '@mui/material';
import { AddRounded as AddIcon } from '@mui/icons-material';

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return <ProfileCard reg_number={value} vehicle_id={tableMeta.rowData[0]} />;
};
const Group = (value, tableMeta) => {
  return (
    <Box display='flex'>
      {value.map((row) => {
        return (
          <Box mr={1}>
            <Chip label={row.code} size='small' />
          </Box>
        );
      })}
    </Box>
  );
};

export default function AvailableVehicleSearchTable({
  handleClose,
  values,
  onChange,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    if (selectedRows.length !== 0) {
      setSelectedId(
        [...selectedId, ...selectedRows.map((row) => apiData[row].id)].filter(
          onlyUnique
        )
      );
      setSelectedData([
        ...selectedData,
        ...selectedRows.map((row) => {
          return {
            ...apiData[row],
          };
        }),
      ]);
    }
    // eslint-disable-next-line
  }, [selectedRows]);

  const addToCart = () => {
    onChange({
      target: {
        name: 'vehicles',
        value: values.vehicles
          ? {
              ids: [...values.vehicles.ids, ...selectedId].filter(onlyUnique),
              data: [...values.vehicles.data, ...selectedData],
            }
          : { ids: selectedId, data: selectedData },
      },
    });
    handleClose();
  };

  let columnsCustom = [
    {
      name: 'id',
      sort: true,
      filter: false,
      display: false,
    },
    {
      name: 'vehicle_reg_no',
      label: 'Reg Number',
      vehicle: true,
      sort: true,
      comp: VehicleProfileCard,
    },
    {
      label: 'V5C',
      name: 'v5c_number',
      sort: true,
    },
    {
      label: 'Make',
      name: 'manufacturer_name',
      filter: true,
    },
    {
      label: 'Type',
      name: 'type_name',
      filter: true,
    },
    {
      label: 'Depot',
      name: 'depot_name',
      filter: true,
    },
    {
      name: 'depot_id',
      display: false,
    },
    {
      name: 'group_id',
      label: 'Group',
      comp: Group,
    },
  ];

  const options = {
    selectableRows: 'multiple',
    selectableRowsOnClick: true,
    responsive: 'stacked',
    rowsSelected: selectedRows,
    onRowsSelect: (rowsSelected, allRows) => {
      setSelectedRows(allRows.map((row) => row.dataIndex));
    },
    customToolbarSelect: () => {
      return (
        <Box mr={2}>
          <Tooltip title={'Add'}>
            <Button
              variant='contained'
              color='primary'
              onClick={addToCart}
              startIcon={<AddIcon />}>
              Add Vehicles for Booking
            </Button>
          </Tooltip>
        </Box>
      );
    },
  };

  return (
    <DynamicMUITable
      title='Vehicles'
      urlLink={
        'hiring/vehicles/available/list/?start_date=' +
        moment(values.date_range.start_date).format('YYYY-MM-DD hh:mm') +
        '&end_date=' +
        moment(values.date_range.end_date).format('YYYY-MM-DD hh:mm') +
        '&?'
      }
      columnsCustom={columnsCustom}
      options={options}
      setApiData={setApiData}
    />
  );
}
