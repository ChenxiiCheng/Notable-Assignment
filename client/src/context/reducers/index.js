import { userReducer } from './userReducer';

const mainReducer = ({ user }, action) => {
  return {
    user: userReducer(user, action),
  };
};

export default mainReducer;
