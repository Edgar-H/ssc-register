import { types } from '../types/types';

const initialState = {
  isLoading: false,
  msgError: null,
  msgSuccess: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiStartLoading:
      return {
        ...state,
        isLoading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        isLoading: false,
      };
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case types.uiSetSuccess:
      return {
        ...state,
        msgSuccess: action.payload,
      };
    case types.uiRemoveSuccess:
      return {
        ...state,
        msgSuccess: null,
      };
    default:
      return state;
  }
};
