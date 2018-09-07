export const ADD_TIMEZONE = 'ADD_TIMEZONE';
export const DELETE_TIMEZONE = 'DELETE_TIMEZONE';
export const ADD_TIMEZONES = 'ADD_TIMEZONES';

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
