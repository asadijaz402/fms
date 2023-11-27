import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Tooltip, Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const columns = [
  { label: "Registration #", name: "vehicle_reg_no" },
  { label: "Make", name: "manufacturer_name" },
  { label: "Type", name: "type_name" },
  { label: "Depot", name: "depot_name" },
  { label: "Cost", name: "cost" },
];

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function ShoppingCard({ value, onChange }) {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    if (selectedRows.length !== 0) {
      setSelectedId(
        [...selectedId, ...selectedRows.map((row) => data[row].id)].filter(
          onlyUnique
        )
      );
    }
    // eslint-disable-next-line
  }, [selectedRows]);

  useEffect(() => {
    if (value.vehicles && value.vehicles.ids.length !== 0) {
      setData(
        value.vehicles.ids.map((val) => {
          return {
            ...value.vehicles.data.filter((row) => row.id === val)[0],
            cost: "N/A",
          };
        })
      );
    }
  }, [value]);

  const removeRow = (id) => {
    onChange({
      target: {
        name: "vehicles",
        value: {
          ...value.vehicles,
          ids: value.vehicles.ids.filter((row) => row !== id),
        },
      },
    });
  };

  const removeFromCart = () => {
    let temp_new_array = value.vehicles.ids;
    temp_new_array = temp_new_array.filter(
      (row) => selectedId.filter((id) => id === row).length === 0
    );
    setSelectedId([]);
    setSelectedRows([]);

    onChange({
      target: {
        name: "vehicles",
        value: {
          ...value.vehicles,
          ids: [...temp_new_array].filter(onlyUnique),
        },
      },
    });
  };

  const options = {
    selectableRows: "multiple",
    selectableRowsOnClick: true,
    responsive: "stacked",
    rowsSelected: selectedRows,
    onRowsSelect: (rowsSelected, allRows) => {
      setSelectedRows(allRows.map((row) => row.dataIndex));
    },
    customToolbarSelect: () => {
      return (
        <Tooltip title={"Add"}>
          <Button
            variant="contained"
            color="primary"
            onClick={removeFromCart}
            startIcon={<DeleteIcon />}
          >
            Remove Vehicles for Booking
          </Button>
        </Tooltip>
      );
    },
  };

  if (data.length !== 0) {
    return (
      <MUIDataTable
        title={
          value.vehicles &&
          value.vehicles.ids.length + " vehicle/s added for booking."
        }
        columns={columns}
        data={data}
        size="small"
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                removeRow(oldData.key);
                resolve();
              }, 1000);
            }),
        }}
        options={options}
      />
    );
  } else {
    return (
      <h3 style={{ textAlign: "center" }}>Selected Vehicle list is empty.</h3>
    );
  }
}

// class ShoppingCartN extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columns: [
//         { title: "Reg_No", field: "reg_number" },
//         { title: "Make", field: "make" },
//         { title: "Type", field: "type" },
//         { title: "Depot", field: "depot" },
//         { title: "Cost", field: "cost" },
//       ],
//     };
//   }

//   componentDidMount = () => {
//     this.props.openVehicleListOpen();
//   };

//   render() {
//     var data = [];
//     if (this.props.cart.length !== 0) {
//       this.props.cart.map((c) => {
//         data = [
//           ...data,
//           {
//             reg_number: c["reg-number"],
//             make: c.make,
//             type: c.type,
//             depot: c.depot,
//             cost: 0,
//             key: c.key,
//           },
//         ];
//         return data;
//       });
//       var title = this.props.cart.length + "  Vehicles added to Cart";
//     }

//     if (data.length !== 0) {
//       return (
//         <MaterialTable
//           title={title}
//           columns={this.state.columns}
//           data={data}
//           size="small"
//           editable={{
//             onRowDelete: (oldData) =>
//               new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                   this.props.removeRow(oldData.key);
//                   resolve();
//                 }, 1000);
//               }),
//           }}
//           options={{
//             headerStyle: {
//               backgroundColor: "lightgray",

//               padding: "16px",
//             },
//           }}
//         />
//       );
//     } else {
//       return (
//         <h3 style={{ textAlign: "center" }}>Selected Vehicle list is empty.</h3>
//       );
//     }
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     id_token: state.user.id_token,
//   };
// };

// export default connect(mapStateToProps, {})(ShoppingCartN);
