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

function errorGetRepos(username) {
  return {
    type: types.FETCH_REPOS_FAILURE,
    username,
    repos: []
  }
}

function userNotFound(username) {
  return {
    type: types.FETCH_USER_NOT_FOUND,
    username,
    repos: []
  }
}

function handleErrors(username, response, dispatch) {
  if (!response.ok) {
    if (response.status === 404) {
      dispatch(userNotFound(username));
    } else {
      dispatch(errorGetRepos(username));
    }

    return false;
  }

  return response.json();
}

export function getRepos(username) {

  return function (dispatch, getState) {

    if (getState().repos.username === username) {
      return false;
    }

    dispatch(requestRepos(username));

    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => handleErrors(username, response, dispatch)
      ).then(json => {
          if (json) {
            dispatch(receiveRepos(username, json));
          }
        }
      );
  }
}
