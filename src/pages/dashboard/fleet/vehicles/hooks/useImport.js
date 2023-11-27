import { useState } from 'react';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateData } from '../../../../../slices/CustomSlices/actions/apiActions';

export default function useImport() {
  const [tab, setTab] = useState(0);
  const [JsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  var commonConfig = { delimiter: ',' };

  const handleChange = (event) => {
    setJsonData(event.target.value);
  };

  const tabChange = (event, newValue) => {
    setTab(newValue);
  };

  const uploadFile = (e) => {
    // var fileInput = document.getElementById('csvFile');
    Papa.parse(e.target.files[0], {
      ...commonConfig,
      header: true,
      complete: (result) => {
        setJsonData(result.data);
      },
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(
      createUpdateData({ vehicles: JsonData }, 'vehicle/bulk', id_token, false)
    ).then((res) => {
      setErrors(res.data);
      setLoading(false);
    });
  };

  const parseErrors = (error) => {
    let newError = '';
    if (typeof error === 'object') {
      // eslint-disable-next-line
      Object.keys(error).map((row) => {
        newError = newError + error[row] + ' for field ' + row + ', ';
      });
    } else {
      newError = error;
    }
    return newError;
  };

  return {
    tab,
    JsonData,
    handleChange,
    tabChange,
    handleSubmit,
    uploadFile,
    errors,
    loading,
    parseErrors,
  };
}
