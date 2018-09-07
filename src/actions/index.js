import Cookies from 'js-cookie';

export const ADD_TIMEZONE = 'ADD_TIMEZONE';
export const DELETE_TIMEZONE = 'DELETE_TIMEZONE';
export const ADD_TIMEZONES = 'ADD_TIMEZONES';
export const LOAD_COOKIE = 'LOAD_COOKIE';
export const SORT_TIMEZONES = 'SORT_TIMEZONES';

// Add a timezone to list
export function addTimezone(name) {
  return {
    type: ADD_TIMEZONE,
    payload: name
  }
}

// Delete a timezone from list
export function deleteTimezone(name) {
  return {
    type: DELETE_TIMEZONE,
    payload: name
  }
}

// Load timezones from cookie
export function loadCookie(name) {
  const timezones = Cookies.getJSON('timezones');
  return {
    type: LOAD_COOKIE,
    payload: timezones,
  }
}

// Change order of timezones list
export function sortTimezones(oldIndex, newIndex) {
  return {
    type: SORT_TIMEZONES,
    payload: {oldIndex, newIndex}
  }
}
