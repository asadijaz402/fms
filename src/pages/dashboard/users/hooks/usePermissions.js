import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUpdateData,
  getData,
} from "../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function usePermissions(open, data, handleClickClose) {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState([]);
  const [heading, setHeading] = useState([]);
  const [error, setError] = useState("");

  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  const fetchUserPermissions = () => {
    dispatch(getData(data.id, "permission_user/get", id_token, false)).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            setValue(res.data[0]?.permission.map((row) => JSON.stringify(row)));
          }
        }
      }
    );
  };

  const fetchData = () => {
    setLoading(true);
    dispatch(getData("all", "permission_user", id_token, false))
      .then((res) => {
        setResponse(res.data);
        setHeading([...new Set(res.data.map((row) => row.table))]);
        fetchUserPermissions();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [open]);

  const handleChange = (e) => {
    const { options } = e.target;

    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const form_data = new FormData();
    form_data.append("sub_user", data.id);
    value.map((row) => {
      let parsed_data = JSON.parse(row);
      form_data.append("permission", parsed_data.id);
      return row;
    });
    dispatch(
      createUpdateData(form_data, "permission_user/add", id_token, false)
    )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("Permissions Updated.");
          handleClickClose();
        } else {
          toast.error("Error updating Permissions.");
        }
      })
      .catch((err) => {
        setError("Error updating permissions.");
        toast.error("Error updating permissions.");
        setLoading(false);
      });
  };

  return {
    loading,
    response,
    handleChange,
    onSubmit,
    value,
    heading,
    error,
  };
}
