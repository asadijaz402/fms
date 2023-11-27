import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateData } from "../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function usePasswordReset(id, handleClickClose) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const idToken = useSelector((state) => state.user.id_token);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("id", id);
    data.append("password", value.password);

    dispatch(
      createUpdateData(data, "account/reset/subuser/password", idToken, false)
    )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password Updated");
          handleClickClose();
        } else {
          toast.error("Error updating Password");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error updating Password");
        toast.error("Error updating Password");
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    handleChange,
    value,
    loading,
    error,
  };
}
