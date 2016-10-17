import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './Repo';
import * as types from '../constants/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

pit('calls request and success actions if the fetch response was successful', () => {
  const store = mockStore({repos: {}});

  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, '{"repos": []}')));

  return store.dispatch(actions.getRepos('blablabla'))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      expect(expectedActions[0]).toEqual({type: types.FETCH_REPOS_REQUEST, username: 'blablabla'});
      expect(expectedActions[1]).toEqual({type: types.FETCH_REPOS_SUCCESS, username: 'blablabla', repos: []});
    })
});

pit('calls request and failure actions if the fetch response was not successful', () => {
  const store = mockStore({repos: {}});

  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(404, 'Test Error', '{"status":404, "statusText": User is not found}')));

  return store.dispatch(actions.getRepos('zxczxczxcz'))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      expect(expectedActions[0]).toEqual({type: types.FETCH_REPOS_REQUEST, username: 'zxczxczxcz'});
      expect(expectedActions[1]).toEqual({type: types.FETCH_USER_NOT_FOUND, username: 'zxczxczxcz', repos: []});
    })
});

pit('does check if we already fetched that username and only calls fetch if necessary', () => {
  const store = mockStore({repos: {username: 'Hiblton', repos: []}});

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve());

  store.dispatch(actions.getRepos('Hiblton')); // the same username
  expect(window.fetch).not.toBeCalled();
});