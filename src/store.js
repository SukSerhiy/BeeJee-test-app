import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import Immutable from 'immutable';
import { sortDirections } from './enums';

const initState = Immutable.fromJS({
  tasks: [],
  totalTaskCount: 0,
  isAuthorized: false,
  sortField: null,
  sortDirection: sortDirections.ASC,
  page: 1
});

export default function configureStore(initialState = initState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}