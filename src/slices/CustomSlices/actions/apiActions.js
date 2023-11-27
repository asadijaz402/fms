import axios from 'axios';
import {
  API_LOADING,
  API_RETURN_MSG,
  API_CHANGE_VALUE,
  API_RESET,
  API_EDIT,
  CREATE_UPDATE,
  LIST,
  GET,
  SCAN,
  UNIVERSAL,
  COLOR_MODE,
  USER_APPEND_VALUE,
  STATUS,
  RESET_STATUS,
  DELETE,
  SNACK_OPEN,
  RESETLIST,
  RELOAD_API,
} from './apiActionTypes';

import { LOGOUT } from './userActionTypes';
import { url } from '../../../config';
import fileDownload from 'js-file-download';

// export const isUniversal = (data) => (dispatch) => {
//   dispatch({
//     type: UNIVERSAL,
//     payload: data,
//   });
// };

// Loading
export const isLoading = (status) => (dispatch) => {
  dispatch({
    type: API_LOADING,
    payload: status,
  });
};

// Messages
export const returnMsg = (msg) => (dispatch) => {
  dispatch({
    type: API_RETURN_MSG,
    payload: msg,
  });
};

// GET DATA (url/link/params)
export const getData =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}/${params && params + '/'}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}/${params}/`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: GET,
          payload: {
            name: `get${link}`,
            response,
          },
        });
        dispatch(isLoading(false));
        // dispatch(isPushed(true));
        return response;
      })
      .catch((err) => {
        if (err && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
        return err;
      });
  };

//GetData from Api table lis

export const deleteBodyData =
  (data, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'DELETE',
        url: `${url}/${link}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
        data,
      };
    } else {
      request = {
        method: 'DELETE',
        url: `${url}/${link}/`,
        data,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: DELETE,
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
        return err;
      });
  };

// GET DATA (url/link/params)
export const getNearestgarage =
  (lat, lng, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    const data = new FormData();
    data.append('lat', lat);
    data.append('lng', lng);

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}/`,
        body: data,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}/`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: GET,
          payload: {
            name: `get${link}`,
            response,
          },
        });
        dispatch(isLoading(false));
        // dispatch(isPushed(true));
        console.log(response);
        return response;
      })
      .catch((err) => {
        if (err && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
        return err;
      });
  };

// export const isPushed = (status) => (dispatch) => {
//   dispatch({
//     type: API_PUSHED,
//     payload: status,
//   });
// };

export const isUniversal = (data) => (dispatch) => {
  dispatch({
    type: UNIVERSAL,
    payload: { data },
  });
};

export const statusClick = (data) => (dispatch) => {
  dispatch({
    type: STATUS,
    payload: { data },
  });
};
export const resetStatus = () => (dispatch) => {
  dispatch({
    type: RESET_STATUS,
  });
};

// Dynamicly Adds new values and column into the Table
export const changeValue = (name, value) => (dispatch) => {
  dispatch({
    type: API_CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

// RESET Api
export const resetApi = () => (dispatch) => {
  dispatch({
    type: API_RESET,
  });
};

// EDIT Api
export const editApi = (tableName) => (dispatch) => {
  dispatch({
    type: API_EDIT,
    payload: tableName,
  });
};

// CREATE / UPDATE Data
export const createUpdateData =
  (data, tableName, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        url: `${url}/${tableName}/`,
        method: 'POST',
        headers: {
          Authorization: `fm ${token}`,
        },
        data,
      };
    } else {
      request = {
        url: `${url}/${tableName}/`,
        method: 'POST',
        data,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: CREATE_UPDATE,
          payload: response,
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
        return err;
      });
  };

// CREATE / UPDATE Data
export const editUpdateData =
  (data, tableName, id, token, stateLoading = true, refresh = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        url: `${url}/${tableName}/${id}/`,
        method: 'PUT',
        headers: {
          Authorization: `fm ${token}`,
        },
        data,
      };
    } else {
      request = {
        url: `${url}/${tableName}/${id}/`,
        method: 'PUT',
        data,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: CREATE_UPDATE,
          payload: { ...response, actionRefresh: refresh },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// List Data (url/tableName)
export const listData =
  (tableName, token, stateLoading = true, endSlash = '/') =>
  (dispatch) => {
    if (stateLoading === true) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${tableName}${endSlash}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${tableName}${endSlash}`,
      };
    }
    // Parent Child relation...Parent  passes feature(response) to its child that "since i am dying" hey yo my sweet child you use it for your life now....

    return axios(request)
      .then((response) => {
        dispatch({
          type: LIST,
          payload: {
            name: tableName,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err && err.response && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

export const DataGraphs =
  (tableName, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading === true) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${tableName}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${tableName}/`,
      };
    }
    // Parent Child relation...Parent  passes feature(response) to its child that "since i am dying" hey yo my sweet child you use it for your life now....

    return axios(request)
      .then((response) => {
        dispatch({
          type: LIST,
          payload: {
            name: tableName,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err && err.response && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// LIST SCAN DATA (url/link/params)
export const scanData =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }
    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}/${params}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}/${params}/`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: SCAN,
          payload: {
            name: link,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// Change Status PUT
export const putData =
  (data, tablename, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }
    let request = {};
    if (token) {
      request = {
        method: 'PUT',
        url: `${url}/${tablename}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
        data,
      };
    } else {
      request = {
        method: 'PUT',
        url: `${url}/${tablename}/`,
        data,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: SCAN,
          payload: {
            name: tablename,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

//reload Api
export const reloadAPI = () => (dispatch) => {
  dispatch({
    type: RELOAD_API,
  });
};

// SEARCH DATA (url/link/params)
export const quicksearchData =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}${params}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}?search=${params}`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: GET,
          payload: {
            name: link,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// SEARCH DATA (url/link/params)
export const searchData =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}?search=${params}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}?search=${params}`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: GET,
          payload: {
            name: link,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err?.response?.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

export const searchDataDynamic =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}&search=${params}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}&search=${params}`,
      };
    }

    return axios(request)
      .then((response) => {
        console.log(response, 'APIII ACTIONSSS');
        dispatch({
          type: GET,
          payload: {
            name: link,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// SEARCH DATA (url/link/params)
export const searchData2 =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        url: `${url}/${link}?search=${params}`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        url: `${url}/${link}?search=${params}`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: GET,
          payload: {
            name: `${link}2`,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// Delete
export const deleteData =
  (params, link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }
    let request = {};
    if (token) {
      request = {
        method: 'DELETE',
        url: params ? `${url}/${link}/${params}/` : `${url}/${link}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'DELETE',
        url: `${url}/${link}/${params}/`,
      };
    }

    return axios(request)
      .then((response) => {
        dispatch({
          type: SCAN,
          payload: {
            name: link,
            response,
          },
        });
        dispatch(isLoading(false));
        return response;
      })
      .catch((err) => {
        if (err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
      });
  };

// Color mode
export const colorMode = (data) => (dispatch) => {
  dispatch({
    type: COLOR_MODE,
    payload: {
      color: data,
    },
  });
};

export const appendValue = (value) => (dispatch) => {
  dispatch({
    type: USER_APPEND_VALUE,
    payload: {
      value,
    },
  });
};

export const snackOpen =
  (open, msg, severity = 'info', close = false) =>
  (dispatch) => {
    dispatch({
      type: SNACK_OPEN,
      payload: {
        open,
        msg,
        severity,
        close,
      },
    });
  };

export const resetList = () => (dispatch) => {
  dispatch({
    type: RESETLIST,
  });
};

// GET DATA (url/link/params)
export const downloadData =
  (link, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        method: 'GET',
        responseType: 'blob',
        url: `${url}/${link}/`,
        headers: {
          Authorization: `fm ${token}`,
        },
      };
    } else {
      request = {
        method: 'GET',
        responseType: 'blob',
        url: `${url}/${link}/`,
      };
    }

    return axios(request)
      .then((response) => {
        fileDownload(response.data, 'test.csv');
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("donwload", "vehicles.csv");
        // document.body.appendChild(link);
        // link.click();
        dispatch(isLoading(false));
        // dispatch(isPushed(true));
      })
      .catch((err) => {
        if (err && err.response.statusText === 'Unauthorized') {
          dispatch({ type: LOGOUT });
        } else {
          dispatch(returnMsg(err));
          dispatch(isLoading(false));
        }
        return err;
      });
  };

export const uploadData =
  (data, tableName, onUploadProgress, token, stateLoading = true) =>
  (dispatch) => {
    if (stateLoading) {
      dispatch(isLoading(true));
    }

    let request = {};
    if (token) {
      request = {
        url: `${url}/${tableName}/`,
        method: 'POST',
        headers: {
          Authorization: `fm ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data,
        onUploadProgress,
      };
    } else {
      request = {
        url: `${url}/${tableName}/`,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      };
    }

    return axios(request);
  };
