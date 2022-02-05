import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GithubContext = createContext();

function GithubProvider({ children }) {
  const initialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  async function fetchUsers() {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  }

  return (
    <GithubContext.Provider
      value={{
        fetchUsers,
        users: state.users,
        loading: state.loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
