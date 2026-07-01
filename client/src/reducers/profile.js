import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  REPOS_ERROR,
  NO_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: null,
  reposError: null,
  loading: true,
  error: {}
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
    case ACCOUNT_DELETED:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        reposError: null,
        loading: false
      };
    case REPOS_ERROR:
      return {
        ...state,
        repos: [],
        reposError: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state,
        repos: [],
        reposError: null,
        loading: false
      };
    default:
      return state;
  }
}
