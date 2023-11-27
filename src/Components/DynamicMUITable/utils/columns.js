import React from "react";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";

const labelGenerator = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (customOption.length !== 0 && customOption[0].label) {
    return customOption[0].label;
  }
  return (col.charAt(0).toUpperCase() + col.slice(1)).split("_").join(" ");
};

const filterSetter = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (customOption.length !== 0 && customOption[0].filter) {
    return customOption[0].filter;
  }
  return false;
};

const filterTypeSetter = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (customOption.length !== 0 && customOption[0].filterType) {
    return customOption[0].filterType;
  }
  return "dropdown";
};

const filterOptionSetter = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (customOption.length !== 0 && customOption[0].filterOptions) {
    return customOption[0].filterOptions;
  }
  return [];
};

const sortSetter = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (customOption.length !== 0 && customOption[0].sort) {
    return customOption[0].sort;
  }
  return false;
};

const displaySetter = (col, columnsCustom) => {
  const customOption = columnsCustom.filter((op) => op.name === col);
  if (
    customOption.length !== 0 &&
    Object.keys(customOption[0]).filter((key) => key === "display").length !== 0
  ) {
    return customOption[0].display;
  }
  return true;
};

export function generateColumns(data, columnsCustom) {
  let columnArray = [];
  let columnNames = [];

  data.map((row) => {
    columnNames = Object.keys(row);
    columnArray = columnNames.map((col) => ({
      label: labelGenerator(col, columnsCustom),
      name: col,
      options: {
        filter: filterSetter(col, columnsCustom),
        filterType: filterTypeSetter(col, columnsCustom),
        filterOptions: filterOptionSetter(col, columnsCustom),
        sort: sortSetter(col, columnsCustom),
        display: displaySetter(col, columnsCustom),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === null) {
            return "N/A";
          }
          const customOption = columnsCustom.filter((op) => op.name === col);
          if (customOption.length === 0) {
            if (typeof value === "object") {
              return value?.name || value?.vehicle_reg_no || value?.id;
            }
            if (typeof value === "boolean") {
              if (value) {
                return <CheckIcon style={{ color: green[500] }} />;
              }
              return <CancelIcon color="error" />;
            }
            return value;
          }
          if (customOption[0].comp) {
            return customOption[0].comp(value, tableMeta, updateValue);
          }
          if (customOption[0].value) {
            return value[customOption[0].value];
          }
          return value;
        },
      },
    }));
    return columnArray;
  });

  const newCustomColumn = columnsCustom.filter(
    (op) => op.name === "newColumnArray"
  );

  let newColum = [];
  if (newCustomColumn.length !== 0 && newCustomColumn[0].new) {
    newColum = newCustomColumn[0].new.map((col) => ({
      label: col.label,
      name: col.name,
      options: {
        filter: col.filter ? col.filter : false,
        sort: col.sort ? col.sort : false,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === null) {
            return "N/A";
          }
          if (col.comp) {
            return col.comp(value, tableMeta, updateValue);
          }
          if (col.value) {
            return value[col.value];
          }
          return value;
        },
      },
    }));
  }

  return [...columnArray, ...newColum];
}
