import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogTitle,
  DialogActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SubModuleDialog({
  open,
  setOpen,
  title,
  description,
  ButtonText,
  id,
}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddNew = () => {
    setOpen(false);
    if (id === "Group") {
      navigate("/fleet/submodules/group");
    } else {
      navigate("/fleet/submodules/garage");
    }
  };

  const descriptionWithStyles =
    id === "Group"
      ? description.split(" ").map((word, index) => {
          if (word === "Groups") {
            return (
              <React.Fragment key={index}>
                <Link
                  to="/fleet/submodules/group"
                  style={{ color: "#688eff", textDecoration: "underline" }}
                >
                  Groups
                </Link>{" "}
              </React.Fragment>
            );
          } else {
            return `${word} `;
          }
        })
      : description.split(" ").map((word, index) => {
          if (word === "Manufacturer_Garages") {
            return (
              <React.Fragment key={index}>
                <Link
                  to="/fleet/submodules/manufacturer_garage"
                  style={{ color: "#688eff", textDecoration: "underline" }}
                >
                  Manufacturer Garages
                </Link>{" "}
              </React.Fragment>
            );
          } else if (word === "Garages") {
            return (
              <React.Fragment key={index}>
                <Link
                  to="/fleet/submodules/garage"
                  style={{ color: "#688eff", textDecoration: "underline" }}
                >
                  Garages
                </Link>{" "}
              </React.Fragment>
            );
          } else {
            return `${word} `;
          }
        });

  return (
    <>
      <Dialog open={open} disableBackdropClick={true}>
        <DialogTitle>
          <Typography
            variant="h5"
            textAlign="center"
            color="primary"
            mb={3}
            gutterBottom
          >
            {title}
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" textAlign="center" mb={3}>
            {descriptionWithStyles}
          </Typography>
          <Divider />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            color="primary"
            sx={{ mb: 1 }}
            fullWidth
            onClick={handleClose}
            variant="outlined"
          >
            Add Later
          </Button>
          <Button
            color="primary"
            sx={{ mb: 1 }}
            variant="contained"
            onClick={handleAddNew}
            fullWidth
          >
            {ButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
