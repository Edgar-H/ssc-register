import { Link, Outlet } from 'react-router-dom';
import { getProfiles } from '../services/profiles';

const CardProfile = () => {
  let profiles = getProfiles();

  return (
    <>
      {profiles.map((u) => (
        <Link
          to={`/register/${u.id}`}
          style={{ textDecoration: 'none' }}
          key={u.id}
          className='col-s-100 col-m-50 col-l-30 card-link'
        >
          <div className='card-profile'>
            <div
              className='img-profile'
              style={{
                backgroundImage: `url(${u.img_profile})`,
              }}
            ></div>
            <div className='info-profile'>
              <h4>{u.name}</h4>
              <p>Alias: {u.alias}</p>
              <p>Nació: {u.date_birth}</p>
              <p>Sexo: {u.gender}</p>
              <p>Detenido: {u.due}</p>
            </div>
          </div>
        </Link>
      ))}
      <Outlet />
    </>
  );
};

export default CardProfile;
