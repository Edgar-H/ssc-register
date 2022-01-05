import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        employeeNumber: action.payload.employeeNumber,
        lastName: action.payload.lastName,
        name: action.payload.name,
        role: action.payload.role,
        status: action.payload.status,
        isLogged: true,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
