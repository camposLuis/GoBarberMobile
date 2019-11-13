import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import subscription from './subscription/reducer';

export default combineReducers({
  auth,
  user,
  subscription,
});
