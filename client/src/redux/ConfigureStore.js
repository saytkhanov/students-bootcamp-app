import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import studentsReducer from "./features/students";
import notesReducer from "./features/notes";
import statusesReducer from "./features/statuses";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    students: studentsReducer,
    notes: notesReducer,
    statuses: statusesReducer,
  }),
  applyMiddleware(logger, thunk)
);
