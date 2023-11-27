import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import useDynamicDataTable from './hook/useDynamicDataTable';
import {
  useTheme,
  Paper,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  Collapse,
} from '@mui/material';
import useColumns from './hook/useColumns';
import SearchInput from './components/SearchInput';
import FilterMenu from './components/Filter/FilterMenu';
import useFilterContext from './hook/useFilterContext';
import useTableSettings from './hook/useTableSttings';
import More from './components/More/More';
import HiddenFields from './components/HiddenFields/HiddenFields';
import { customStyles } from './styles';

// https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page

export default function DynamicDataTable({
  title,
  urlLink,
  columnsCustom,
  addNew,
  dynamicFilter = false,
  description = false,
  model_table = false,
  disableSearch = false,
  ...props
}) {
  const {
    loading,
    data,
    count,
    handleSort,
    handlePageChange,
    handlePerRowsChange,
    handleSearch,
  } = useDynamicDataTable(urlLink, columnsCustom);
  const { columns, isLoading, defaultHidden, onClickHidden } = useColumns(
    data,
    columnsCustom,
    model_table
  );
  const { show, handleShow, fetchDynamicFilterColumnList } = useFilterContext();
  const { settings, onSettingsChange } = useTableSettings();

  const theme = useTheme();

  useEffect(() => {
    fetchDynamicFilterColumnList(dynamicFilter, model_table);
    // eslint-disable-next-line
  }, [dynamicFilter]);

  return (
    <Paper variant="outlined" elevation={0}>
      <Box m={1} display="flex" alignItems={'center'}>
        <Box flexGrow={1}>
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          {description && (
            <Typography variant="subtitle1" color="GrayText">
              {description}
            </Typography>
          )}
        </Box>
        {!disableSearch && (
          <Box mr={1}>
            <SearchInput onChange={handleSearch} />
          </Box>
        )}
        <Box mr={1}>
          <Button onClick={handleShow} size="small" color="info">
            Filter
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
        {addNew &&
          addNew.map((row) => {
            return <Box mr={1}>{row}</Box>;
          })}
        {addNew && <Divider orientation="vertical" flexItem />}
        <Box mr={1}>
          <HiddenFields
            columns={data[0]}
            options={columns}
            defaultHidden={defaultHidden}
            onClickHidden={onClickHidden}
          />
        </Box>
        <Box mr={1} ml={1}>
          <More
            model_table={model_table}
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </Box>
      </Box>
      <Box m={1}>
        <Collapse in={show}>
          <FilterMenu columnsCustom={columnsCustom} />
        </Collapse>
      </Box>
      <Box m={1}>
        <DataTable
          // title={title}
          columns={columns}
          customStyles={customStyles(theme)}
          data={data}
          progressPending={loading || columns.length === 0 || isLoading}
          progressComponent={<CircularProgress />}
          sortServer
          onSort={handleSort}
          persistTableHead={settings.persistTableHead}
          dense={settings.dense}
          responsive={settings.responsive}
          fixedHeader={settings.fixedHeader}
          pagination
          paginationServer
          paginationTotalRows={count}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          {...props}
        />
      </Box>
    </Paper>
  );
}
