import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GithubContext = createContext();

function GithubProvider({ children }) {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repositories: [],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
