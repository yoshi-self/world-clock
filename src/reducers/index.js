import {combineReducers} from 'redux';
import Cookies from 'js-cookie';

import {ADD_TIMEZONE, DELETE_TIMEZONE, LOAD_COOKIE} from '../actions/index';

const timezonesReducer = (state=[], action) => {
  switch(action.type) {
  case ADD_TIMEZONE: {
    const timezones = [action.payload, ...state];
    Cookies.set('timezones', timezones);
    return timezones;
  }

  case DELETE_TIMEZONE: {
    const timezones = state.filter((name) => name !== action.payload);
    Cookies.set('timezones', timezones);
    return timezones;
  }

  case LOAD_COOKIE: {
    if(action.payload) {
      return action.payload;
    }
    else {
      return state;
    }
  }

  default: 
    return state;
  }
}

const rootReducer = combineReducers({
  timezones: timezonesReducer
});

export default rootReducer;
