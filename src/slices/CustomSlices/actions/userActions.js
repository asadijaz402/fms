import axios from "axios";
import {
  USER_LOADING,
  USER_RETURN_MSG,
  USER_CHANGE_VALUE,
  LOGIN,
  // SOCIAL_FB_LOGIN,
  // SIGNUP,
  LOGOUT,
} from "./userActionTypes";
import { url } from "../../../config";
// export const url = "http://localhost:8000/api";
// export const url = "https://demo-fms-api.bondwest.co.uk/api";
// export const url = "https://administration.wdrgroup.co.uk/api";

// Loading
export const isLoading = (status) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: status,
  });
};

// Messages
export const returnMsg = (msg) => (dispatch) => {
  dispatch({
    type: USER_RETURN_MSG,
    payload: msg,
  });
};

// Dynamicly Adds new values and column into the Table
export const changeValue = (name, value) => (dispatch) => {
  dispatch({
    type: USER_CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

// Local Storage => have to change into session storage
export const firstTimeLoad = () => (dispatch) => {
  if (localStorage.getItem("user_data")) {
    const userData = localStorage.getItem("user_data");
    dispatch({
      type: LOGIN,
      payload: JSON.parse(userData),
    });
  }
};

// LoginUser
export const loginUser = (userName, password) => (dispatch) => {
  dispatch(isLoading(true));

  const data = new FormData();
  data.append("username", userName);
  data.append("password", password);

  const request = {
    method: "POST",
    url: `${url}/token/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .catch((err) => {
      dispatch(returnMsg("Email or Password is incorrect."));
    })
    .then((response) => {
      if (response && response.status === 200) {
        const request2 = {
          method: "GET",
          url: `${url}/account/details/`,
          headers: {
            Authorization: `fm ${response.data.access}`,
          },
        };
        let userData = {};
        return axios(request2)
          .then((res) => {
            userData = Object.assign(userData, res.data);
            dispatch({
              type: LOGIN,
              payload: {
                user_data: userData,
                id_token: response.data.access,
              },
            });

            dispatch(isLoading(false));
            return response.data.access;
          })
          .catch((err) => {
            console.log(err, "login api - action");
            dispatch(returnMsg("Email or Password is incorrect."));
            dispatch(isLoading(false));
          });
      }
      dispatch(returnMsg("Email or Password is incorrect."));
      dispatch(isLoading(false));
      return "Error";
    });
};

//register
export const registerUser =
  (email, name, password, companyName) => (dispatch) => {
    dispatch(isLoading(true));

    const data = new FormData();
    data.append("username", email);
    data.append("email", email);
    data.append("first_name", name);
    data.append("password", password);
    data.append("companyName", companyName);

    const request = {
      method: "POST",
      url: `${url}/account/register/`,
      body: data,
      mimeType: "multipart/form-data",
      data,
    };

    return axios(request)
      .catch((err) => {
        dispatch(returnMsg("Email already exists."));
      })
      .then((response) => {
        if (response && response.status === 201) {
          return dispatch(loginUser(email, password))
            .then((res) => {
              isLoading(false);
              return res;
            })
            .catch((err) => {
              dispatch(returnMsg("Error Login user."));
              dispatch(isLoading(false));
            });
        } else {
          dispatch(returnMsg("User already exists."));
          dispatch(isLoading(false));
          return "Error";
        }
      });
  };
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const passwordRecovery = (email) => (dispatch) => {
  dispatch(isLoading(true));
  const data = new FormData();
  data.append("email", email);
  const request = {
    method: "GET",
    url: `${url}/account/forgot_password/${email}/`,
  };
  return axios(request)
    .catch((err) => {
      dispatch(returnMsg("Email not exists."));
    })
    .then((response) => {
      if (response && response.status === 200) {
        return response;
      } else {
        dispatch(returnMsg("User not Found."));
        dispatch(isLoading(false));
        return "Error";
      }
    });
};

export const passwordReset = (code, email, password) => (dispatch) => {
  dispatch(isLoading(true));

  const data = new FormData();
  if (code.length === 6) {
    data.append("short_code", code);
  } else {
    data.append("code", code);
  }

  data.append("email", email);
  data.append("password", password);

  const request = {
    method: "POST",
    url: `${url}/account/forgot_password/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .catch((err) => {
      dispatch(returnMsg(err));
    })
    .then((response) => {
      console.log(response);
      if (response.data.msg !== "Invalid Code") {
        return response;
      } else {
        dispatch(returnMsg("invalid code"));
        dispatch(isLoading(false));
        return response.data;
      }
    });
};
