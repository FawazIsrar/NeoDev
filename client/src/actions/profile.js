import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  REPOS_ERROR,
  LOGOUT
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log('Get current profile error:', err); // Debug logging

    // Safely extract error message
    const errorMsg = err.response?.data?.msg || err.message || 'Failed to load profile';
    dispatch(setAlert(errorMsg, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/all");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log('Get profiles error:', err); // Debug logging

    // Safely extract error message
    const errorMsg = err.response?.data?.msg || err.message || 'Failed to load profiles';
    dispatch(setAlert(errorMsg, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log('Get profile by ID error:', err); // Debug logging

    // Safely extract error message
    const errorMsg = err.response?.data?.msg || err.message || 'Failed to load profile';
    dispatch(setAlert(errorMsg, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Get GitHub repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    console.log('Get GitHub repos error:', err); // Debug logging

    // Safely extract error message
    const errorMsg = err.response?.data?.msg || err.message || 'Failed to load repositories';
    dispatch(setAlert(errorMsg, 'danger'));

    dispatch({
      type: REPOS_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log('Create profile error:', err); // Debug logging

      // Safely extract error messages
      const errors = err.response?.data?.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      } else {
        const errorMsg = err.response?.data?.msg || err.message || 'Profile creation failed';
        dispatch(setAlert(errorMsg, "danger"));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
      });
    }
  };

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    console.log('Add experience error:', err); // Debug logging

    // Safely extract error messages
    const errors = err.response?.data?.errors;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      const errorMsg = err.response?.data?.msg || err.message || 'Failed to add experience';
      dispatch(setAlert(errorMsg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    console.log('Add education error:', err); // Debug logging

    // Safely extract error messages
    const errors = err.response?.data?.errors;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      const errorMsg = err.response?.data?.msg || err.message || 'Failed to add education';
      dispatch(setAlert(errorMsg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    console.log('Delete experience error:', err); // Debug logging

    const errorMsg = err.response?.data?.msg || err.message || 'Failed to delete experience';
    dispatch(setAlert(errorMsg, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    console.log('Delete education error:', err); // Debug logging

    const errorMsg = err.response?.data?.msg || err.message || 'Failed to delete education';
    dispatch(setAlert(errorMsg, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
    });
  }
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch({ type: LOGOUT });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      console.log('Delete account error:', err); // Debug logging

      const errorMsg = err.response?.data?.msg || err.message || 'Failed to delete account';
      dispatch(setAlert(errorMsg, "danger"));

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response?.statusText || 'Server Error', status: err.response?.status || 500 },
      });
    }
  }
};
