import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Set token in axios headers
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    // Clear token from axios headers
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
