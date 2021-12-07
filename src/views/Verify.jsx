import React from 'react';
import { Link } from 'react-router-dom';
import CardProfile from '../components/CardProfile';
import '../styles/verify.scss';

const Verify = () => {
  const result = true;
  return (
    <div className='register'>
      <h5>Registrar nueva detención</h5>
      <form action='' className='form-container'>
        <div className='form-group'>
          <div className='name'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' name='name' id='name' />
          </div>
          <div className='date'>
            <label htmlFor='date'>Fecha de nacimiento</label>
            <input type='date' name='date' id='date' />
          </div>
          <div className='btn-check'>
            <button>Verificar</button>
          </div>
        </div>
      </form>
      {result ? (
        <>
          <p>6 Coincidencias</p>
          <div className='cards-container'>
            <CardProfile />
          </div>
          <div className='btn-new'>
            <button>Nuevo registro</button>
          </div>
        </>
      ) : (
        <>
          <div className='null-result'>
            <p>
              <i className='fas fa-times'></i> Sin antecedentes
            </p>
          </div>
          <div className='btn-new'>
            <Link to='/register'>
              <button>Registrar</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
