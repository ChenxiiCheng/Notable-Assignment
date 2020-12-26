import { axios } from '../../utils/axios';
import { endpoint } from '../../utils/config';
import { DATA_ACTIONS, USER_ACTIONS } from '../../utils/constants';
import { setUserInfo, userLogout } from '../../utils/user';

export const getAllPhysicians = dispatch => {
  axios
    .get(`${endpoint}user/all`)
    .then(res => {
      console.log('---', res);
      if (res.status === 200) {
        dispatch(dataSuccess({ ...res?.data?.data, status: 'SUCCESS' }));
      } else {
        dispatch(dataFailed({ error: 'Wrong' }));
      }
    })
    .catch(error => {
      console.log('error', error);
      dispatch(dataFailed({ error: 'Wrong' }));
    });
};

/**
 * User login
 * @param {function} dispatch
 * @param {string} username
 * @param {string} password
 */
export const userLogin = (dispatch, username, password) => {
  dispatch(loginAttempt());

  const data = { username, password };
  if (data) {
    axios
      .post(`${endpoint}/login/`, data)
      .then(result => {
        if (result.status === 200) {
          setUserInfo(result.data);
          axios.defaults.headers = {
            Authorization: `Bearer ${result.data.token}`,
          };
          dispatch(loginSuccess({ ...result.data, status: 'SUCCESS' }));
        } else dispatch(loginFailed({ error: 'Wrong' }));
      })
      .catch(error => {
        console.error(error);
        dispatch(loginFailed({ error }));
      });
  } else dispatch(loginFailed({ error: 'Wrong' }));
};

/**
 * User logout
 * @param {function} dispatch
 */
export const userLogoutAction = dispatch => {
  axios.defaults.headers = {};
  userLogout();
  dispatch(logout());
};

const dataSuccess = () => ({
  type: DATA_ACTIONS.DATA_SUCCESS,
  loading: false,
});

const dataFailed = () => ({
  type: DATA_ACTIONS.DATA_FAILED,
  loading: false,
});

const loginAttempt = () => ({
  type: USER_ACTIONS.LOGIN_ATTEMPT,
  loading: true,
});

const loginSuccess = data => ({
  type: USER_ACTIONS.LOGIN_SUCCESS,
  loading: false,
  data: data,
});

const loginFailed = error => ({
  type: USER_ACTIONS.LOGIN_FAILED,
  loading: false,
  error: error,
});

const logout = () => ({
  type: USER_ACTIONS.LOGOUT,
  loading: false,
  data: [],
});
