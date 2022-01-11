import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { performSearch } from '../services/algolia/performSearch';
import CardProfile from '../components/CardProfile';
import { today } from '../assets/date';

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [resultsSearch, setResultsSearch] = useState([]);
  const [error, setError] = useState();
  const [results, setResults] = useState('');

  useEffect(() => {
    performSearch(today()).then((res) => {
      if (res > 0) {
        setResults('');
        setResultsSearch(res);
      } else {
        setResults('Sin registros el día de hoy');
      }
    });
  }, []);

  const onSubmit = (data) => {
    const { name, date, alias } = data;
    setError('');

    if (name === '' && alias === '' && date === '') {
      return setError('Debes ingresar al menos un campo');
    }

    if (name !== '') {
      performSearch(name).then((res) => {
        setResults('');
        setResultsSearch(res);
      });
    }

    if (date !== '') {
      console.log(date);
      performSearch(date).then((res) => {
        setResults('');
        setResultsSearch(res);
      });
    }

    if (alias !== '') {
      performSearch(alias).then((res) => {
        setResults('');
        setResultsSearch(res);
      });
    }
  };

  return (
    <div className='search'>
      <p className='txt-headers'>Registros de detenciones</p>
      <form className='form-filter' onSubmit={handleSubmit(onSubmit)}>
        <p>Filtrar por:</p>
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
            <label htmlFor='date'>Fecha de detencion</label>
            <input type='date' name='date' id='date' {...register('date')} />
          </div>
          <div className='registered'>
            <label htmlFor='alias'>Alias</label>
            <input type='text' name='alias' id='alias' {...register('alias')} />
          </div>
          <div className='btn-check'>
            <button type='submit'>Buscar</button>
          </div>
        </div>
      </form>
      {resultsSearch.length > 0 && (
        <p className='text-coincidence'>
          {resultsSearch.length}{' '}
          {resultsSearch.length > 1 ? 'Coincidencias' : 'Coincidencia'}
        </p>
      )}
      <div className='cards-container'>
        {results !== '' && <p className='results mt-6'>{results}</p>}
        {resultsSearch.length > 0 && (
          <CardProfile resultsSearch={resultsSearch} />
        )}
      </div>
    </div>
  );
};

export default Search;
