import { useDispatch, useSelector } from 'react-redux';
import { updateTasks } from '../redux/actions/tasks';
import { finishLoading, startLoading } from '../redux/actions/ui';
import { deleteTask } from '../services/firebase/tasks/deletTask';
import { finishTask } from '../services/firebase/tasks/finishTask';

export const Task = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ui);
  const { listTasks } = useSelector((state) => state.tasks);

  const deletItem = async (task) => {
    dispatch(startLoading());
    await deleteTask(listTasks, uid.uid, task).then((res) => {
      dispatch(updateTasks(res));
      dispatch(finishLoading());
    });
  };

  const finish = async (task) => {
    dispatch(startLoading());
    await finishTask(listTasks, uid.uid, task).then((res) => {
      dispatch(updateTasks(res));
      dispatch(finishLoading());
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {listTasks.map((task) => (
            <div className='task' key={task.id}>
              <h3>{task.title}.</h3>
              <p>{task.description}</p>
              <div>
                <p>
                  Caduca a la {task.time} {task.date}
                </p>
                <div className='btns'>
                  <button onClick={() => deletItem(task)}>Eliminar</button>
                  <button onClick={() => finish(task)}>Terminada</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
