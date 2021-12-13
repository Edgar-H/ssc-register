import { Link } from 'react-router-dom';
import CardProfile from '../components/CardProfile';

const Verify = () => {
  const result = true;
  return (
    <div className='register'>
      <h5 className='txt-headers'>Registrar nueva detención</h5>
      <form action='' className='form-filter'>
        <div className='form-group'>
          <div className='name'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='nombre apellido apellido'
            />
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
            <Link to='/register'>
              <button>Nuevo registro</button>
            </Link>
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
