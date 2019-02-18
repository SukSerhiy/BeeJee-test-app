import { combineReducers } from 'redux-immutable';
import isAuthorized from './isAuthorizedReducer';
import totalTaskCount from './totalTaskCountReducer';
import tasks from './tasksReducer';
import sortField from './sortFieldReducer';
import sortDirection from './sortDirectionReducer';
import page from './pageReducer.js';

export default combineReducers({
  isAuthorized,
  totalTaskCount,
  tasks,
  sortField,
  sortDirection,
  page
});