import { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import FilterDropDown from "./FilterDropdown";
import FilterDateDropdown from "./FilterDateDropdown";
import useFilterContext from "../../hook/useFilterContext";
import { Close } from "@mui/icons-material";

export default function FilterMenu({ columnsCustom }) {
  const {
    show,
    init,
    filters,
    filterLoading,
    addMultipleFilter,
    filter,
    clearFilter,
    clearSpecificFilter,
    addDateFilter,
    saveFilter,
  } = useFilterContext();

  useEffect(() => {
    if (show) {
      init(columnsCustom);
    }
    // eslint-disable-next-line
  }, [show]);

  return (
    <Box>
      <Box>
        <Typography variant="subtitle2" color="InfoText">
          Filter Data by:
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", mt: 1 }}>
        {filterLoading ? (
          <CircularProgress />
        ) : filters.length === 0 ? (
          <Typography variant="body1">Nothing to filter.</Typography>
        ) : (
          // eslint-disable-next-line
          filters.map((row) => {
            if (row.filterData.type === "multiple") {
              return (
                <Box mr={1}>
                  <FilterDropDown
                    addFilter={addMultipleFilter}
                    filterValues={filter}
                    {...row}
                  />
                </Box>
              );
            } else if (row.filterData.type === "date") {
              return (
                <Box mr={1}>
                  <FilterDateDropdown
                    addFilter={addDateFilter}
                    filterValues={filter}
                    clearSpecificFilter={clearSpecificFilter}
                    {...row}
                  />
                </Box>
              );
            }
          })
        )}
        <Box flexGrow={1} textAlign="right">
          <Tooltip title="Save filter.">
            <Button
              size="small"
              disabled={Object.keys(filter).length === 0}
              variant="outlined"
              onClick={saveFilter}
            >
              Save
            </Button>
          </Tooltip>
        </Box>
        <Box ml={1}>
          <Button
            size="small"
            variant="contained"
            disabled={Object.keys(filter).length === 0}
            onClick={clearFilter}
            startIcon={<Close fontSize="small" />}
          >
            Clear Fitlers
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
