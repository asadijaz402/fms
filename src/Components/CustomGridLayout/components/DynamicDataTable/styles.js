export const customStyles = (theme) => {
  return {
    table: {
      style: {
        backgroundColor: "transparent",
        color: theme.palette.primary,
      },
    },
    header: {
      style: {
        minHeight: theme.spacing(6),
        background: "transparent",
        color: theme.palette.primary,
      },
    },
    subHeader: {
      style: {
        backgroundColor: "transparent",
        minHeight: "52px",
      },
    },
    head: {
      style: {
        color: theme.palette.primary,
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: theme.palette.divider,
        backgroundColor: "transparent",
        borderBottomColor: theme.palette.divider,
        color: theme.palette.primary,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          fontWeight: 700,
          borderRightWidth: "1px",
          borderRightColor: theme.palette.divider,
        },
      },
    },
    cells: {
      color: theme.palette.primary,
      background: "transparent",
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: theme.palette.divider,
        },
      },
    },
    rows: {
      style: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: theme.palette.divider,
        },
      },
      highlightOnHoverStyle: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
      },
    },
    pagination: {
      style: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
        borderTopColor: theme.palette.divider,
      },
      pageButtonsStyle: {
        color: theme.palette.primary,
        fill: theme.palette.primary,
      },
    },
    noData: {
      style: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
      },
    },
    progress: {
      style: {
        color: theme.palette.primary,
        backgroundColor: "transparent",
      },
    },
  };
};
