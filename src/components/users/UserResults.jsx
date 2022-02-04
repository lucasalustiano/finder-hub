import { useEffect, useContext } from 'react';

import UserItem from './UserItem';
import { GithubContext } from '../../context/github/GithubContext';

function UserResult() {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 x1:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

export default UserResult;
