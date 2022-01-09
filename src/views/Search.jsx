import React from 'react';
import { useForm } from '../hooks/useForm';
import { performSearch } from '../services/algolia/performSearch';
// import CardProfile from '../components/CardProfile';

const Search = () => {
  const [formValue, handleInputChange] = useForm({
    name: '',
    alias: '',
  });

  const { name, alias } = formValue;

  const filterProfile = (e) => {
    e.preventDefault();
    if (name === '' && alias === '') {
      console.log('please enter a name or alias');
      return null;
    }
    if (name !== '' && alias !== '') {
      console.log('please enter only one field');
      return null;
    }
    if (name !== '') {
      performSearch(name).then((results) => {
        console.log('results name', results);
      });
      // return name;
    }
    if (alias !== '') {
      performSearch(alias).then((results) => {
        console.log('results alias', results);
      });
      // return alias;
    }
  };

  return (
    <div className='search'>
      <p className='txt-headers'>Registros de detenciones</p>
      <form action='' className='form-filter' onSubmit={filterProfile}>
        <p>Filtrar por:</p>
        <div className='form-group'>
          <div className='name'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='nombre apellido apellido'
              value={name}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className='date'>
            <label htmlFor='date'>Fecha de detencion</label>
            <input type='date' name='date' id='date' />
          </div> */}
          <div className='registered'>
            <label htmlFor='alias'>Alias</label>
            <input
              type='text'
              name='alias'
              id='alias'
              value={alias}
              onChange={handleInputChange}
            />
          </div>
          <div className='btn-check'>
            <button type='submit'>Buscar</button>
          </div>
        </div>
      </form>
      {/* <div className='cards-container'>{<CardProfile />}</div> */}
    </div>
  );
};

export default Search;
