import { combineReducers } from 'redux';

import user from './reducers/user';
import product from './reducers/product';
import order from './reducers/order';

export default combineReducers({
  user,
  product,
  order,
});
