import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Native Chrome/Browser Notification Logic
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("NeoDev Alert", { body: msg });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("NeoDev Alert", { body: msg });
        }
      });
    }
  }

  setTimeout(() => {
  dispatch({ type: REMOVE_ALERT, payload: id });
}, timeout);

  return id; // Optionally return id for manual removal if needed
};