import * as types from '../constants/index';
import fetch from 'isomorphic-fetch'

function requestRepos(username) {
  return {
    type: types.FETCH_REPOS_REQUEST,
    username
  }
}

function receiveRepos(username, json) {
  return {
    type: types.FETCH_REPOS_SUCCESS,
    username,
    repos: json
  }
}

function errorGetRepos() {
  return {
    type: types.FETCH_REPOS_FAILURE,
    repos: []
  }
}

function userNotFound() {
  return {
    type: types.FETCH_USER_NOT_FOUND,
    repos: []
  }
}

function handleErrors(response, dispatch) {
  if (!response.ok) {
    if (response.status === 404) {
      dispatch(userNotFound());
    } else {
      dispatch(errorGetRepos());
    }

    return false;
  }

  return response.json();
}

export function getRepos(username) {

  return function (dispatch) {
    dispatch(requestRepos(username));

    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => handleErrors(response, dispatch)
      ).then(json => {
          if (json) {
            dispatch(receiveRepos(username, json));
          }
        }
      );
  }
}
