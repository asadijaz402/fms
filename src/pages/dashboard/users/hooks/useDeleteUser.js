import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBodyData } from "../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useDeleteUser(id, is_active) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const makeCall = () => {
    setLoading(true);
    dispatch(
      deleteBodyData(
        {
          id: id,
          is_active: is_active ? false : true,
        },
        "account/details",
        id_token,
        false
      )
    ).then((status_response) => {
      setLoading(false);

      if (status_response && status_response.status === 200) {
        toast.success("User status updated!");
        setOpen(false);
      } else {
        setResponseMessage("Invalid user.");
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
