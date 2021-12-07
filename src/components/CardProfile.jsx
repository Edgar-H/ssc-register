import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getProfiles } from '../services/profiles';
import '../styles/card_profile.scss';

const CardProfile = () => {
  let profiles = getProfiles();
  console.log(profiles);

  return (
    <>
      {profiles.map((u) => (
        <Link
          to={`/register/${u.id}`}
          style={{ textDecoration: 'none' }}
          key={u.id}
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
