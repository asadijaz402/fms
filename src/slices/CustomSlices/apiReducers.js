import {
  API_LOADING,
  API_RETURN_MSG,
  API_CHANGE_VALUE,
  API_RESET,
  API_EDIT,
  API_PUSHED,
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
} from "./actions/apiActionTypes";

const initialState = {
  log_array: [],
  snackOpen: false,
  isLoading: false,
  message: "",
  inbox: "",
  "test/123": "",
  "depot-list": [],
  available: [],
  tax: [],
  "vehicle_accessories/fleet": [],
  vehicle: [],
  getvehicle: [],
  getcustomer: [],
  getinvoice: [],
  service: [],
  mot: [],
  tyres: [],
  prechecks: [],
  precheck: [],
  breakdowns: [],
  wecollect: [],
  json_object: {},
  post_data: [],
  "hiring/customer/list/": [],
  "vehicle/search": [],
  "getdnd/dashboard": [],
  universal: [],
  statusVehicle: [],
  "hiring/dashboard/rental-history": [],
  pushed: false,
  "hiring/rental_records": [],
  allcustomers: [],
  "hiring/defaultdashboard/timeline": [],
  "hiring/year-graph": [],
  "customer-rentals/1": [],
  "vehicle/hired-count": [],
  "hiring/vans-hired": [],
  "hiring/avg-vor": [],
  "vehicle/revenue": [],
  "vehicle/billable-count": [],
  "hiring/dashboard/top-clients": [],
  "hiring/vehicles/available/list": [],
  "getvehicles-forDamage": [],
  "getbooking-list/customer": [],
  "getinvoice/customer": [],
  "hiring-customer": [],
  "gethiring-customer": [],
  "vehicle/depot/vehicle/count": [],
  "dvla/kashflow_invoices_comparison": [],
  "dvla/kashflow_invoices_paid": [],
  "dvla/kashflow_invoices": [],
  "getvehicle-check": "",
  "hiring/rental-notifications": [],
  // Color mode
  colorMode: "Day",
  resetList: false,
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case RESETLIST:
      return {
        ...state,
        resetList: !state.resetList,
      };
    case UNIVERSAL:
      return {
        ...state,
        universal: action.payload,
      };
    case STATUS:
      return {
        ...state,
        statusVehicle: action.payload,
      };
    case RESET_STATUS:
      return {
        ...state,
        statusVehicle: [],
      };
    case API_RETURN_MSG:
      return {
        ...state,
        message: action.payload,
      };
    case API_CHANGE_VALUE:
      if (!action.payload.value) {
        return {
          ...state,
          json_object: {
            ...state.json_object,
            [action.payload.name]: null,
          },
        };
      }
      return {
        ...state,
        json_object: {
          ...state.json_object,
          [action.payload.name]: action.payload.value,
        },
      };

    case API_RESET:
      return {
        ...state,
        json_object: {},
        post_data: [],
      };
    case API_EDIT:
      return {
        ...state,
        json_object: state[action.payload],
        resetList: !state.resetList,
      };

    // CREATE/UPDATE Data
    case CREATE_UPDATE:
      return {
        ...state,
        post_data: action.payload.data,
        resetList: action.payload.actionRefresh && !state.resetList,
      };

    // LIST Data
    case LIST:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
      };

    case DELETE:
      return {
        ...state,
        resetList: !state.resetList,
      };

    // GET Data
    case GET:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        pushed: action.payload.push,
      };

    case API_PUSHED:
      return {
        ...state,
        pushed: action.payload.status,
      };

    // SCAN Data
    case SCAN:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        resetList: !state.resetList,
      };
    case USER_APPEND_VALUE:
      localStorage.setItem("log_array", JSON.stringify(action.payload.value));
      return {
        ...state,
        log_array: action.payload.value,
      };

    case COLOR_MODE:
      localStorage.setItem("colorMode", action.payload.color);
      return {
        ...state,
        colorMode: action.payload.color,
      };

    case SNACK_OPEN:
      return {
        ...state,
        snackOpen: action.payload,
      };

    default:
      return state;
  }
}
