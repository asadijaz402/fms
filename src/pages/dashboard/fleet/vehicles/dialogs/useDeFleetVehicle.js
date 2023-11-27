import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBodyData } from "../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useDeleteVehicle(rowId, de_fleet) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const makeCall = (e) => {
    if (!de_fleet) {
      e.preventDefault();
    }

    setLoading(true);
    dispatch(
      deleteBodyData(
        {
          reg_no: rowId,
          de_fleeted: de_fleet ? "True" : "False",
        },
        "vehicle",
        id_token,
        false
      )
    ).then((status_response) => {
      setLoading(false);

      if (
        status_response &&
        (status_response.status === 201 || status_response.status === 200)
      ) {
        toast.success("Vehicle status updated!");
        setOpen(false);
      } else {
        setResponseMessage("Invalid vehicle registration number.");
      }
    });
  };

  return {
    isLoading,
    responseMessage,
    makeCall,
    setOpen,
    open,
  };
}
