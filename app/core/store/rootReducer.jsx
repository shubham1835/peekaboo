// src/store/rootReducer.js
import { combineReducers } from "redux";
// import counterReducer from './counterSlice';
import userReducer from "./reducers/userSlice"; // ← add this
import locationReducer from "./reducers/locationSlice";

const rootReducer = combineReducers({
  //   counter: counterReducer,
  users: userReducer, // ← include here
  location: locationReducer,
});

export default rootReducer;
