import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='hero'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          <h1 className='text-8x1 font-bold mb-8'>Ooops!</h1>
          <p className='text-5x1 mb-8'>404 - Page Not Found!</p>

          <Link className='btn btn-primary btn-lg' to='/'>
            <FaHome className='mr-2' />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
