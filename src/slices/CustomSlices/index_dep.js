import { combineReducers } from "redux";

import userReducers from "./userReducers";
import apiReducers from "./apiReducers";
import kanbanReducer from "./kanbanReducer";

export default combineReducers({
  user: userReducers,
  api: apiReducers,
  kanban: kanbanReducer,
});
