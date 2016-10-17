import {
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_SUCCESS,
  FETCH_USER_NOT_FOUND
} from '../constants/index';

const initialState = {
  isFetching: false,
  notFound: false,
  hasError: false,
  username: '',
  repos: []
};

function getRepos(state = {
  isFetching: false,
  notFound: false,
  hasError: false,
  username: '',
  repos: []
}, action) {
  switch (action.type) {
    case FETCH_USER_NOT_FOUND:
      return Object.assign({}, state, {
        notFound: true
      });
    case FETCH_REPOS_FAILURE:
      return Object.assign({}, state, {
        hasError: true
      });
    case FETCH_REPOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false
      });
    case FETCH_REPOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: false,
        username: action.username,
        repos: action.repos
      });
    default:
      return state
  }
}

export default function Repos(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_NOT_FOUND:
    case FETCH_REPOS_REQUEST:
    case FETCH_REPOS_FAILURE:
    case FETCH_REPOS_SUCCESS:
      return Object.assign({}, state, getRepos(state[action.username], action));

    default:
      return state;
  }
}
