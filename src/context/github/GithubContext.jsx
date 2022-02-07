import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GithubContext = createContext();

function GithubProvider({ children }) {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repositories: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  async function searchUsers(text) {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const items = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  }

  async function getUser(username) {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  }

  async function getUserRepos(username) {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${username}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  }

  function setLoading() {
    dispatch({
      type: 'SET_LOADING',
    });
  }

  function clearUsers() {
    dispatch({
      type: 'CLEAR_USERS',
    });
  }

  return (
    <GithubContext.Provider
      value={{
        getUser,
        clearUsers,
        searchUsers,
        getUserRepos,
        user: state.user,
        users: state.users,
        loading: state.loading,
        repositories: state.repositories,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
