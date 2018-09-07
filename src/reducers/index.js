import {combineReducers} from 'redux';

import {ADD_TIMEZONE, DELETE_TIMEZONE} from '../actions/index';

const timezonesReducer = (state=[], action) => {
  switch(action.type) {
  case ADD_TIMEZONE:
    return [action.payload, ...state]

  case DELETE_TIMEZONE:
    const newState = state.filter((name) => name !== action.payload);
    return newState;

  default:
    return state;
  }
}

const rootReducer = combineReducers({
  timezones: timezonesReducer
});

export default rootReducer;
