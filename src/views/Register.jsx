import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/profiles';
import Modals from '../components/Modals';

const Register = () => {
  let { registerId } = useParams();
  console.log(registerId);
  let navigate = useNavigate();
  const profile = getProfile(parseInt(registerId));
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
  if (registerId) {
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
      <p className='txt-headers'>Registro {registerId}</p>
      <form onSubmit={handlerSubmit}>
        <div className='header-register'>
          <div className='img-profile-register'>
            <div className='img-profile'>
              <img
                src='https://images.unsplash.com/photo-1639100618065-358723b7961d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                alt=''
              />
            </div>
            <button>Cargar foto</button>
          </div>
          <div className='basic-profile'>
            <div className='row-register'>
              <div className='name col-s-100 col-m-80'>
                <label htmlFor='name'>Nombre completo</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Nombre(s) Apellido Paterno Materno'
                />
              </div>
              <div className='alias col-s-100 col-m-20'>
                <label htmlFor='alias'>alias</label>
                <input type='text' name='alias' id='alias' />
              </div>
            </div>
            <div className='row-register'>
              <div className='birthday  col-s-100 col-m-35 col-l-25'>
                <label htmlFor='birthday'>Fecha de nac.</label>
                <input type='date' name='birthday' id='birthday' />
              </div>
              <div className='height col-s-100 col-m-25'>
                <label htmlFor='height'>Estatura</label>
                <input type='number' name='height' id='height' />
              </div>
              <div className='gender col-s-100 col-m-25'>
                <label htmlFor='gender'>Sexo</label>
                <select name='gender' id='gender'>
                  <option value='Hombre'>Hombre</option>
                  <option value='Mujer'>Mujer</option>
                </select>
                <input type='text' name='gender' id='gender' />
              </div>
              <div className='tattoos col-s-100 col-m-25'>
                <label htmlFor='tattoos'>tatuajes</label>
                <input type='text' name='tattoos' id='tattoos' />
              </div>
            </div>
            <div className='row-register'>
              <div className='nationality col-s-100'>
                <label htmlFor='nationality'>Nacionalidad</label>
                <input type='text' name='nationality' id='nationality' />
              </div>
              <div className='country_birth col-s-100'>
                <label htmlFor='country_birth'>Pais de nacimiento</label>
                <input type='text' name='country_birth' id='country_birth' />
              </div>
              <div className='place_birth col-s-100'>
                <label htmlFor='place_birth'>Ent. Fed. Nacim.</label>
                <input type='text' name='place_birth' id='place_birth' />
              </div>
            </div>

            <div className='row-register'>
              <div className='date_arrest col-s-100 col-m-35 col-l-25'>
                <label htmlFor='date_arrest'>Fecha detencion</label>
                <input type='date' name='date_arrest' id='date_arrest' />
              </div>
              <div className='reason_arrest col-s-100 col-m-75'>
                <label htmlFor='reason_arrest'>Motivo de detencion</label>
                <input type='text' name='reason_arrest' id='reason_arrest' />
              </div>
            </div>
          </div>
        </div>
        <div className='description-register'>
          <label htmlFor='description_arrest col-s-100'>
            Descripcion del detenido y de la detencion
          </label>
          <textarea
            name='description_arrest'
            id='description_arrest'
            cols='30'
            rows='10'
            className='col-s-100'
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
            className='btn-submit'
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
