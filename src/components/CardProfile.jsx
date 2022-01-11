import { Link, Outlet } from 'react-router-dom';

const CardProfile = ({ resultsSearch }) => {
  return (
    <>
      {resultsSearch?.map((profile) => (
        <Link
          to={`/register/${profile.key}`}
          style={{ textDecoration: 'none' }}
          key={profile.key}
          className='col-s-100 col-m-50 col-l-30 card-link'
        >
          <div className='card-profile'>
            <div
              className='img-profile'
              style={{
                backgroundImage: `url(${profile.img})`,
              }}
            ></div>
            <div className='info-profile'>
              <h4>{profile.name}</h4>
              <p>Alias: {profile.alias}</p>
              <p>Nació: {profile.birth}</p>
              <p>Detenido: {profile.arrest}</p>
            </div>
          </div>
        </Link>
      ))}
      <Outlet />
    </>
  );
};

export default CardProfile;
