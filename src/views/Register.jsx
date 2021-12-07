import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/profiles';
import Modals from '../components/Modals';
import '../styles/register.scss';

const Register = () => {
  let params = useParams();
  console.log(params);
  let navigate = useNavigate();
  const profile = getProfile(parseInt(params.registerId, 10));
  /* const {
    name,
    homoclave
    num_register
    alias,
    date_birth,
    height, <- se puede actualizar
    nationality,
    country_birth,
    place_birth,
    gender,
    tattoos,
    due,<- crear un nuevo registro
    reason_arrest,<- crear un nuevo registro
    description_arrest,<- crear un nuevo registro
    img_profile <- se puede actualizar
    imgages_arrest {se agregaran mas fotos}
    docs {se agregaran mas fotos}
  } = profile; */
  console.log(profile);

  const verifyId = () => {
    if (!profile) {
      navigate('/notfound', { replace: true });
    }
  };
  if (params) {
    verifyId();
  }

  const [modalView, setModalView] = useState(false),
    [modalViewActive, setModalViewActive] = useState('');
  const activeModal = (modalView) => {
    setModalView(true);
    setModalViewActive(modalView);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='form-register'>
      <p>Registro {params.registerId}</p>
      <form onSubmit={handlerSubmit}>
        <div className='header-register'>
          <div className='img-profile-register'>
            <div className='img-profile'>
              <img
                src='https://images.unsplash.com/photo-1636922861058-ac8d49cb5147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80'
                alt=''
              />
            </div>
            <button>Cargar foto</button>
          </div>
          <div className='basic-profile'>
            <div className='name'>
              <label htmlFor='name'>Nombre completo</label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Nombre(s) Apellido Paterno Materno'
              />
            </div>
            <div className='birthday'>
              <label htmlFor='birthday'>Fecha de nacimiento</label>
              <input type='date' name='birthday' id='birthday' />
            </div>
            <div className='height'>
              <label htmlFor='height'>Estatura</label>
              <input type='number' name='height' id='height' />
            </div>
            <div className='nationality'>
              <label htmlFor='nationality'>Nacionalidad</label>
              <input type='text' name='nationality' id='nationality' />
            </div>
            <div className='country_birth'>
              <label htmlFor='country_birth'>Pais de nacimiento</label>
              <input type='text' name='country_birth' id='country_birth' />
            </div>
            <div className='place_birth'>
              <label htmlFor='place_birth'>Ent. Fed. Nacim.</label>
              <input type='text' name='place_birth' id='place_birth' />
            </div>
            <div className='gender'>
              <label htmlFor='gender'>Sexo</label>
              <input type='text' name='gender' id='gender' />
            </div>
            <div className='tattoos'>
              <label htmlFor='tattoos'>Tatuajes</label>
              <input type='text' name='tattoos' id='tattoos' />
            </div>
            <div className='date_arrest'>
              <label htmlFor='date_arrest'>Fecha de detencion</label>
              <input type='date' name='date_arrest' id='date_arrest' />
            </div>
            <div className='reason_arrest'>
              <label htmlFor='reason_arrest'>Motivo de detencion</label>
              <input type='text' name='reason_arrest' id='reason_arrest' />
            </div>
          </div>
        </div>
        <div className='description-register'>
          <label htmlFor='description_arrest'>
            Descripcion del detenido y de la detencion
          </label>
          <textarea
            name='description_arrest'
            id='description_arrest'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <div className='btns-register'>
          <button onClick={() => activeModal('Images')}>Cargar fotos</button>
          <button onClick={() => activeModal('Documentos')}>
            Cargar Documentos
          </button>
          {modalView && (
            <Modals view={modalViewActive} closeModal={setModalView} />
          )}
          <button
            type='submit'
            onClick={() => navigate('/', { replace: true })}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
