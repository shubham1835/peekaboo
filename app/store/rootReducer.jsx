// src/store/rootReducer.js
import {combineReducers} from 'redux';
// import counterReducer from './counterSlice';
import userReducer from './userSlice'; // ← add this

const rootReducer = combineReducers({
  //   counter: counterReducer,
  users: userReducer, // ← include here
});

export default rootReducer;
