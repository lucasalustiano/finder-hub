import RepositoryItem from './RepositoryItem';

function RepositoriesList({ repositories }) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Recently created repositories
        </h2>
        {repositories.map((repo) => (
          <RepositoryItem key={repo.id} repository={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepositoriesList;
