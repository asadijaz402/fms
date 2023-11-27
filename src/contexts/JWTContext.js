import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  loginUser,
  logOut,
  firstTimeLoad,
  registerUser,
  passwordRecovery,
  passwordReset,
} from "../slices/CustomSlices/actions/userActions";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  permissions: [],
  groups: [],
  isAdmin: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    let permissions = [];
    if (user) {
      // eslint-disable-next-line
      user.permission_users.map((row) => {
        permissions = [...permissions, ...row.permission];
      });
    }

    let isAdmin =
      user?.groups.filter((row) => row.name === "Admin").length !== 0
        ? true
        : false;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      groups: user?.groups,
      permissions,
      isAdmin,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  recovery: () => Promise.resolve(),
  pReset: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const customDispatch = useDispatch();
  const user =
    window.localStorage.getItem("user_data") &&
    JSON.parse(window.localStorage.getItem("user_data")).user_data;

  useEffect(() => {
    customDispatch(firstTimeLoad());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
    // eslint-disable-next-line
  }, []);

  const login = async (email, password) => {
    const accessToken = await customDispatch(loginUser(email, password));

    if (accessToken !== Error) {
      localStorage.setItem("accessToken", accessToken);

      dispatch({
        type: "LOGIN",
        payload: {
          user: JSON.parse(localStorage.getItem("user_data")).user_data,
        },
      });
    } else {
      return {
        message: "Invalid credentials.",
      };
    }
  };

  const recovery = async (email) => {
    const res = await customDispatch(passwordRecovery(email));
    if (res !== "Error") {
      return {
        status: true,
        message: "Check Your Email",
      };
    } else {
      return {
        status: false,
        message: "Email not available",
      };
    }
  };

  const pReset = async (email, code, password) => {
    const res = await customDispatch(passwordReset(code, email, password));

    if (res !== Error) {
      return {
        message: res,
      };
    } else {
      return {
        message: "Invalid credentials.",
      };
    }
  };

  const register = async (email, name, password, companyName) => {
    const accessToken = await customDispatch(
      registerUser(email, name, password, companyName)
    );
    if (accessToken !== "Error") {
      localStorage.setItem("accessToken", accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: JSON.parse(localStorage.getItem("user_data")).user_data,
        },
      });
    } else {
      return {
        message: "Invalid credentials.",
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    customDispatch(logOut());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        recovery,
        pReset,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
