import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CardProfile from '../components/CardProfile';
import { performSearch } from '../services/algolia/performSearch';

const Verify = () => {
  const result = true;

  const { register, handleSubmit } = useForm();
  const [resultsSearch, setResultsSearch] = useState([]);
  const [error, setError] = useState();
  const [verify, setVerify] = useState(false);

  const onSubmit = (data) => {
    const { name, date } = data;

    setError('');

    if (name === '' && date === '') {
      return setError('Debes ingresar al menos un campo');
    }

    if (name !== '') {
      performSearch(name).then((res) => {
        setVerify(true);
        setResultsSearch(res);
      });
    }

    if (date !== '') {
      console.log(date);
      performSearch(date).then((res) => {
        setVerify(true);
        setResultsSearch(res);
      });
    }
  };

  return (
    <div className='register'>
      <h5 className='txt-headers'>Verificar registro</h5>
      <form className='form-filter' onSubmit={handleSubmit(onSubmit)}>
        {error && <p className='error'>{error}</p>}
        <div className='form-group'>
          <div className='name'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              placeholder='nombre apellido apellido'
              {...register('name')}
            />
          </div>
          <div className='date'>
            <label htmlFor='date'>Fecha de nacimiento</label>
            <input type='date' name='date' id='date' {...register('date')} />
          </div>
          <div className='btn-check'>
            <button type='submit'>Verificar</button>
          </div>
        </div>
      </form>
      {verify && (
        <>
          {resultsSearch.length > 0 ? (
            <>
              {resultsSearch.length > 0 && (
                <p>
                  {resultsSearch.length}{' '}
                  {resultsSearch.length > 1 ? 'Coincidencias' : 'Coincidencia'}
                </p>
              )}
              <div className='cards-container'>
                <CardProfile resultsSearch={resultsSearch} />
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
        </>
      )}
    </div>
  );
};

export default Verify;
