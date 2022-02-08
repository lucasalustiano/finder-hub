import { useState, useContext } from 'react';

import { AlertContext } from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';
import { GithubContext } from '../../context/github/GithubContext';

function UserSearch() {
  const [text, setText] = useState('');

  const { setAlert } = useContext(AlertContext);
  const { users, dispatch } = useContext(GithubContext);

  function handleChange(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (text === '') {
      setAlert('Please insert a username!', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });

      setText('');
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='username'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-1-none w-36 btn btn-lg'
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className='btn btn-ghost btn-lg'
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
