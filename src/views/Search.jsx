import React from 'react';
import CardProfile from '../components/CardProfile';

const Search = () => {
  return (
    <div className='search'>
      <p className='txt-headers'>Registros de detenciones</p>
      <form action='' className='form-filter'>
        <p>Filtrar por:</p>
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
            <label htmlFor='date'>Fecha de detencion</label>
            <input type='date' name='date' id='date' />
          </div>
          <div className='registered'>
            <label htmlFor='registered'>No. Registro</label>
            <input type='number' name='registered' id='registered' />
          </div>
          <div className='btn-check'>
            <button>Buscar</button>
          </div>
        </div>
      </form>
      <div className='cards-container'>{<CardProfile />}</div>
    </div>
  );
};

export default Search;
