import { useSelector, useDispatch } from "react-redux";
import { getData } from "../slices/CustomSlices/actions/apiActions";
import moment from "moment";

const downloadStream = (params, url, id_token, dispatch) => {
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  dispatch(getData(params, url, id_token, false))
    .then((res) => {
      const blobFile = new Blob([res?.data], {
        type: "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blobFile);
      a.href = url;
      a.download = moment().format("DD/MM/YYYY-HHmm");
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function useExport(params, url) {
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const onClickExport = (data = false) => {
    downloadStream(params, data ? data : url, id_token, dispatch);
  };

  return {
    onClickExport,
  };
}
