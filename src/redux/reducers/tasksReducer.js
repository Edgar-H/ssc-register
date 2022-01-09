import { types } from '../types/types';

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case types.tasksUpdating:
      return { ...state, listTasks: action.payload };
    default:
      return state;
  }
};
