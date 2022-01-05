import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='notfound-container'>
      <div className='notfound'>
        <h4>
          4
          <span>
            <i className='far fa-frown'></i>
          </span>
          4
        </h4>
        <h5>Page Not Found</h5>
        <p>
          The page you are looking for doesn't exist or another error occurred.
        </p>
        <div className='link-btn'>
          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
