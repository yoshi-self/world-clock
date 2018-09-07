import {combineReducers} from 'redux';
import Cookies from 'js-cookie';
import {arrayMove} from 'react-sortable-hoc';

import
  {ADD_TIMEZONE, DELETE_TIMEZONE, LOAD_COOKIE, SORT_TIMEZONES}
from '../actions/index';

const COOKIE_EXPIRES = 365 * 5;

const timezonesReducer = (state=[], action) => {
  switch(action.type) {
  case ADD_TIMEZONE: {
    const timezones = [action.payload, ...state];
    Cookies.set('timezones', timezones, {expires: COOKIE_EXPIRES});
    return timezones;
  }

  case DELETE_TIMEZONE: {
    const timezones = state.filter((name) => name !== action.payload);
    Cookies.set('timezones', timezones, {expires: COOKIE_EXPIRES});
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

  case SORT_TIMEZONES: {
    // NOTE: arrayMove uses slice and returns new array
    const timezones = arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
    Cookies.set('timezones', timezones, {expires: COOKIE_EXPIRES});
    return timezones;
  }

  default: 
    return state;
  }
}

const rootReducer = combineReducers({
  timezones: timezonesReducer
});

export default rootReducer;
