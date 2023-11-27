import {
  getData,
  listData,
} from '../../../slices/CustomSlices/actions/apiActions';

export function getTableInfo(dispatch, id_token, table) {
  return dispatch(
    getData(table, 'superAdmin/table/info', id_token, false)
  ).then((res) => {
    return res;
  });
}

export function apiTableList(dispatch, id_token) {
  return dispatch(listData('superAdmin/tables/list', id_token, false)).then(
    (res) => {
      return res;
    }
  );
}
