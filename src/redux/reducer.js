import { combineReducers } from 'redux';
import articles from './reducers/articles';
import authUser from './reducers/authUser';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  articles,
  authUser,
  router: routerReducer
});
