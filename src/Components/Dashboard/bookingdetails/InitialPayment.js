import React, { useEffect } from "react";
import { CardContent, Card, Grid, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";

export default function InitialPayment({
  data,
  setData,
  updateBookings,
  disabled = false,
  changeStatus,
}) {
  useEffect(() => {
    if (!data[0].finances) {
      setData(
        data.map((row) => {
          return {
            ...row,
            finances: {
              totalAmount: 0,
              advanceAmount: 0,
              amountLeft: 0,
            },
          };
        })
      );
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setData(
      data.map((row) => {
        return {
          ...row,
          finances: { ...row.finances, [e.target.name]: e.target.value },
        };
      })
    );
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setData(
      data.map((row) => {
        return {
          ...row,
          finances: {
            ...row.finances,
            amountLeft: row.finances.totalAmount - row.finances.advanceAmount,
          },
        };
      })
    );
    updateBookings(
      data.map((row) => {
        return {
          ...row,
          finances: {
            ...row.finances,
            amountLeft: row.finances.totalAmount - row.finances.advanceAmount,
          },
          status: "Confirmed",
        };
      })
    );
    toast.success("Updated finances.");
  };

  const confirmPayment = () => {
    changeStatus("Complete");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="totalAmount"
                label="Total Amount"
                type="number"
                helperText="Total Booking Cost."
                fullWidth
                value={data[0].finances && data[0].finances.totalAmount}
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  readOnly: disabled,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="advanceAmount"
                label="Advance Amount"
                type="number"
                value={data[0].finances && data[0].finances.advanceAmount}
                helperText="Advance payment."
                fullWidth
                InputProps={{
                  readOnly: disabled,
                }}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amountLeft"
                label="Total Amount Left"
                type="number"
                InputProps={{
                  readOnly: true,
                }}
                helperText="Amount left to be paid."
                fullWidth
                variant="outlined"
                value={
                  data[0].finances &&
                  data[0].finances.totalAmount - data[0].finances.advanceAmount
                }
              />
            </Grid>
            <Grid item xs={12}>
              {disabled ? (
                <Button
                  onClick={confirmPayment}
                  variant="contained"
                  color="primary"
                  disabled={data[0].status === "Complete"}
                >
                  Confirm Payment
                </Button>
              ) : (
                <Button
                  disabled={disabled}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
