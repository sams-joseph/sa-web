import { combineReducers } from 'redux';

import user from './reducers/user';
import product from './reducers/product';
import order from './reducers/order';
import size from './reducers/size';
import design from './reducers/design';

export default combineReducers({
  user,
  product,
  order,
  size,
  design,
});
