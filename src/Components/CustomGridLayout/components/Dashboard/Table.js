import DynamicDataTable from '../../../DynamicDataTable';
import { useDashboardContext } from '../../hooks/DashboardContext';

function Table({ uniqueId }) {
  const { selectedValues } = useDashboardContext();
  const url = selectedValues[uniqueId] && selectedValues[uniqueId].table;

  return (
    <>
      <DynamicDataTable
        title={selectedValues[uniqueId]?.title}
        urlLink={
          url ? `superAdmin/table/data/${selectedValues[uniqueId]?.table}?` : ''
        }
        columnsCustom={[]}
        dynamicFilter
        model_table={selectedValues[uniqueId]?.table}
        disableSearch
      />
    </>
  );
}

export default Table;
