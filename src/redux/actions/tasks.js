import { types } from '../types/types';

export const updateTasks = (listTasks) => ({
  type: types.tasksUpdating,
  payload: listTasks,
});
