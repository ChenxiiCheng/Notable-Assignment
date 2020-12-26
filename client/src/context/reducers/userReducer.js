import { DATA_ACTIONS, USER_ACTIONS } from '../../utils/constants';

export const userReducer = (state, action) => {
  switch (action.type) {
    case DATA_ACTIONS.DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.data,
      };
    case DATA_ACTIONS.DATA_FAILED:
      return {
        loading: false,
        error: action.error,
        data: [],
      };
    case USER_ACTIONS.LOGIN_ATTEMPT:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case USER_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case USER_ACTIONS.LOGIN_FAILED:
      return {
        loading: false,
        error: action.error,
        data: [],
      };
    case USER_ACTIONS.LOGOUT:
      return {
        loading: false,
        error: null,
        data: [],
      };
    default:
      return state;
  }
};
