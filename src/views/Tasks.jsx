import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../components/Task';
import { TaskSchema } from '../helpers/TaskSchema';
import { updateTasks } from '../redux/actions/tasks';
import { removeError, removeSuccess } from '../redux/actions/ui';
import { getTasks } from '../services/firebase/tasks/getTasks';
import { newTask } from '../services/firebase/tasks/newTask';

const Tasks = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { listTasks } = useSelector((state) => state.tasks);
  console.log(listTasks);

  useEffect(() => {
    getTasks(uid.uid).then((res) => {
      if (res !== null) {
        dispatch(updateTasks(res));
        dispatch(removeError());
        dispatch(removeSuccess());
      }
    });
  }, [uid, dispatch]);

  const handleSaveTasks = (values) => {
    console.log('uwu');
    newTask(values, uid.uid).then(() =>
      getTasks(uid.uid).then((res) => dispatch(updateTasks(res)))
    );
  };

  return (
    <div className='tasks-container'>
      <p className='txt-headers'>Tareas</p>
      <Formik
        initialValues={{
          title: '',
          date: '',
          hours: '',
          description: '',
          priority: '',
        }}
        validationSchema={TaskSchema}
        onSubmit={(values) => {
          console.log('onSubmit', values);
          handleSaveTasks(values);
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <>
              {touched.title && (
                <div className='errors-message'>{errors.title}</div>
              )}
              {touched.date && (
                <div className='errors-message'>{errors.date}</div>
              )}
              {touched.time && (
                <div className='errors-message'>{errors.hours}</div>
              )}
              {touched.description && (
                <div className='errors-message'>{errors.description}</div>
              )}
            </>
            <div className='header-task'>
              <div className='col-s-100 col-md-70'>
                <label htmlFor='title'>Titulo</label>
                <Field
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Lorem ipsum dolor sit.'
                />
              </div>
              <div className='date col-s-100 col-md-20'>
                <label htmlFor='date'>Fecha</label>
                <Field type='date' name='date' id='date' />
              </div>
              <div className='col-s-100 col-md-10'>
                <label htmlFor='hours'>Hora</label>
                <Field type='time' name='hours' id='hours' />
              </div>
              <div className='col-s-100 col-md-10'>
                <label htmlFor='priority'>Prioridad</label>
                <Field as='select' name='priority' id='priority'>
                  <option value='3'>Baja</option>
                  <option value='2'>Media</option>
                  <option value='1'>Alta</option>
                </Field>
              </div>
            </div>
            <div className='description'>
              <label htmlFor='description'>Descripción</label>
              <Field
                name='description'
                id='description'
                as='textarea'
                className='col-s-100'
                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, urna eget consectetur consectetur, nisi nisl aliquam nunc, eget aliquet nunc nisi euismod nunc. Nulla facilisi. Nulla facilisi.'
              />
            </div>
            <div className='btn-content'>
              <button type='submit'>Guardar</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className='task-items'>
        {listTasks !== null ? <Task /> : <p>No hay tareas</p>}
      </div>
    </div>
  );
};

export default Tasks;
