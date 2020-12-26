import { LOCALSTORAGE_ACTIONS } from './constants';

/**
 * set login user info to localStorage
 * @param {object} data: {data, token}
 */
export const setUserInfo = data => {
  const { token, user } = data;

  localStorage.setItem(
    LOCALSTORAGE_ACTIONS.LOGIN_USER_DATA,
    JSON.stringify(user)
  );
  localStorage.setItem(LOCALSTORAGE_ACTIONS.LOGIN_USER_TOKEN, token);
};

// user logout & clear localstorage data
export const userLogout = () => {
  localStorage.clear();
};
