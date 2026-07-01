import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log('Load user error:', err); // Debug logging
    // Safely extract error message
    const errorMsg = err.response?.data?.msg || err.message || 'Server error';
    dispatch(setAlert(errorMsg, 'danger'));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log('Register error:', err); // Debug logging

    // Safely extract error messages
    const errors = err.response?.data?.errors;
    if (errors && Array.isArray(errors)) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      const errorMsg = err.response?.data?.msg || err.message || 'Registration failed';
      dispatch(setAlert(errorMsg, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log('Login error:', err); // Debug logging

    // Safely extract error messages
    const errors = err.response?.data?.errors;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    } else {
      const errorMsg = err.response?.data?.msg || err.message || 'Login failed';
      dispatch(setAlert(errorMsg, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  setAuthToken(); // Clear the token
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
