import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { TodoList } from './containers';
import { store } from './store';

render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('app')
);
