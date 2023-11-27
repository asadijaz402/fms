import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useAuth from "../../../../../hooks/useAuth";
import { editUpdateData } from "../../../../../slices/CustomSlices/actions/apiActions";
import { toast } from "react-hot-toast";

export default function useNotes(data) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const formatFormData = () => {
    const new_data = {
      dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
      content: value,
      user: user.first_name,
    };

    let formatData = {};
    Object.keys(data[0]).map((n) => {
      if (typeof data[0][n] === "object") {
        if (data[0][n]?.id) {
          formatData = { ...formatData, [n]: data[0][n].id };
        } else {
          formatData = { ...formatData, [n]: data[0][n] };
        }
      } else {
        formatData = { ...formatData, [n]: data[0][n] };
      }
      return formatData;
    });

    if (data[0].notes && data[0].notes.length !== 0) {
      return { ...formatData, notes: [...data[0].notes, new_data] };
    } else {
      return { ...formatData, notes: [new_data] };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      editUpdateData(
        formatFormData(),
        "hiring/rental_records",
        data[0].id,
        id_token,
        false
      )
    ).then((res) => {
      toast.success("New Comment Added.");
      setLoading(false);
      setOpen(false);
      window.location.reload();
    });
  };

  return {
    open,
    handleClickOpen,
    handleClose,
    handleChange,
    value,
    loading,
    handleSubmit,
  };
}
