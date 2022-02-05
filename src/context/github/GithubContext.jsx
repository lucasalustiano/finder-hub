import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GithubContext = createContext();

function GithubProvider({ children }) {
  const initialState = {
    users: [],
    loading: false,
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
        clearUsers,
        searchUsers,
        users: state.users,
        loading: state.loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
