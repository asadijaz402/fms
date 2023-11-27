import { FilterProvider } from "./context/FilterContext";
import DataTable from "./DynamicDataTable";

export default function DynamicDataTable(props) {
  return (
    <FilterProvider>
      <DataTable {...props} />
    </FilterProvider>
  );
}
