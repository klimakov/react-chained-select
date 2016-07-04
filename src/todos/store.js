import { List } from 'immutable';
import { createStore } from 'redux';
import reducer from './reducer';

const emptyStore = List([]);

export const store = createStore(
  reducer,
  emptyStore,
  window.devToolsExtension && window.devToolsExtension()
);
