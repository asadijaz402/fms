import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUpdateData,
  putData,
} from "../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useUserForm(id = false, handleClickClose, data) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: "account/company/user/register",
    err: "User already exists.",
    success: "User created.",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setValue((value) => {
        return {
          ...value,
          email: data.email,
          first_name: data.first_name,
        };
      });
      setCallToAction({
        action: putData,
        url: "account/details",
        err: "Error updating!",
        success: "User Updated.",
      });
    }
  }, [id, data]);

  const handleChange = (e) => {
    setValue((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    if (id) {
      data.append("id", id);
    } else {
      data.append("username", value.email);
      data.append("email", value.email);
      data.append("password", value.password);
    }
    data.append("first_name", value.first_name);

    dispatch(callToAction.action(data, callToAction.url, idToken, false))
      .then((res) => {
        if (res.status === 201) {
          toast.success(callToAction.success);
          handleClickClose();
        } else {
          toast.error(callToAction.err);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(callToAction.err);
        toast.error(callToAction.err);
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
