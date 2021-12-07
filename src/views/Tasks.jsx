import React from 'react';
import '../styles/tasks.scss';

const Tasks = () => {
  return (
    <div className='tasks-container'>
      <p>Tareas</p>
      <form action='' className='tasks-form'>
        <div className='header-task'>
          <div>
            <label htmlFor='title-task'>Titulo</label>
            <input
              type='text'
              name='title-task'
              id='title-task'
              placeholder='Lorem ipsum dolor sit.'
            />
          </div>
          <div className='date-task'>
            <label htmlFor='date-task'>Fecha</label>
            <input type='date' name='date-task' id='date-task' />
          </div>
          <div>
            <label htmlFor='time-task'>Hora</label>
            <input type='time' name='time-task' id='time-task' />
          </div>
        </div>
        <div className='description'>
          <label htmlFor='desciption-task'>Descripcion</label>
          <textarea
            name='desciption-task'
            id='desciption-task'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <button>Guardar</button>
      </form>
      <div className='task-items'>
        <div className='task'>
          <h3>Lorem ipsum dolor sit.</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            incidunt eligendi optio obcaecati aperiam veniam laborum at nisi
            temporibus, quidem ea velit, voluptates quaerat, enim numquam
            commodi. Eligendi, culpa ab!
          </p>
          <div>
            <p>Caduca a la 11:11 a.m. 28/02/2022</p>
            <div className='btns'>
              <button>Eliminar</button>
              <button>Editar</button>
              <button>Terminada</button>
            </div>
          </div>
        </div>
        <div className='task'>
          <h3>Lorem ipsum dolor sit.</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            incidunt eligendi optio obcaecati aperiam veniam laborum at nisi
            temporibus, quidem ea velit, voluptates quaerat, enim numquam
            commodi. Eligendi, culpa ab!
          </p>
          <div>
            <p>Caduca a la 11:11 a.m. 28/02/2022</p>
            <div className='btns'>
              <button>Eliminar</button>
              <button>Editar</button>
              <button>Terminada</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
