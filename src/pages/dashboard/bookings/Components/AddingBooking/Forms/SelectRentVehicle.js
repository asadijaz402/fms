import React from "react";
import { Box, Button } from "@mui/material";
// import Filtertable from "../../Filtertable";
import ShoppingCart from "./ShoppingCart";
import SearchTableAvailableVehicle from "../Dialog/SearchTableAvailableVehicle";

export default function SelectRentVehicle({
  onChange,
  value,
  handleNext,
  handleBack,
}) {
  return (
    <>
      <Box>
        <Box mt={2}>
          <SearchTableAvailableVehicle onChange={onChange} value={value} />
        </Box>
        <Box mt={2}>
          <ShoppingCart onChange={onChange} value={value} />
        </Box>
      </Box>
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={value.vehicles && value.vehicles.ids.length === 0}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </>
  );
}

// class SelectRentVehicle extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalOpenState: false,
//       cart: [],
//       vehiclesId: [],
//     };
//   }

//   handleClickOpen = () => {
//     this.setState({
//       modalOpenState: true,
//     });
//   };

//   handleClickClose = () => {
//     this.setState({
//       modalOpenState: false,
//     });
//   };

//   rowsSelected = (data) => {
//     var tempArray = [];
//     if (this.state.cart.length !== 0) {
//       var cart = this.state.cart;

//       data.filter((d) => {
//         var con = false;
//         this.state.cart.map((c) => {
//           if (d.key === c.key) {
//             con = true;
//           }
//           return null;
//         });
//         if (!con) {
//           cart = [...cart, d];
//         }
//         return null;
//       });
//       this.setState(
//         {
//           cart: cart,
//           modalOpenState: false,
//         },
//         () => {
//           this.state.cart.map((c) => {
//             return tempArray.push(c.key);
//           });
//           this.setState({ vehiclesId: tempArray }, () => {
//             this.props.onChange({
//               target: { name: "updatedCart", value: this.state.vehiclesId },
//             });
//           });
//         }
//       );
//     } else {
//       this.setState(
//         {
//           cart: data,
//           modalOpenState: false,
//         },
//         () => {
//           this.state.cart.map((c) => {
//             return tempArray.push(c.key);
//           });
//           this.setState({ vehiclesId: tempArray }, () => {
//             this.props.onChange({
//               target: { name: "updatedCart", value: this.state.vehiclesId },
//             });
//           });
//         }
//       );
//     }
//   };
//   receiveData = (newCart, removedItem) => {
//     var tempArray1 = this.state.vehiclesId;
//     tempArray1.splice(tempArray1.indexOf(removedItem.key), 1);
//     this.setState({ vehiclesId: tempArray1 });
//     this.setState({ cart: newCart });
//   };
//   removeRow = (key) => {
//     var cart = [];
//     var ids = [];
//     this.state.cart.filter((c) => {
//       if (c.key !== key) {
//         cart = [...cart, c];
//         ids = [...ids, c.key];
//       }
//       return true;
//     });
//     this.setState({ cart: cart });

//     this.props.onChange({ target: { name: "updatedCart", value: ids } });
//   };

//   render() {
//     return (
//       <div>
//         <Button
//           variant="outlined"
//           style={{
//             marginBottom: "8px",
//             width: "100%",
//             backgroundColor: "#01579b",
//             color: "#fff",
//           }}
//           fullWidth
//           onClick={this.handleClickOpen}
//         >
//           Show Vehicles
//         </Button>
//         <Dialog
//           open={this.state.modalOpenState}
//           onClose={this.handleClickClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           title="Hire Vehicle"
//           modal={true}
//           autoDetectWindowHeight={false}
//           autoScrollBodyContent={false}
//         >
//           <DialogContent>
//             <Filtertable rows="multiple" rowsSelected={this.rowsSelected} />
//           </DialogContent>
//         </Dialog>

//       </div>
//     );
//   }
// }

// export default SelectRentVehicle;
