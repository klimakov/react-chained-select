import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ChainedSelect } from './containers';
import { store } from './store';

// console.log(store.getState());

render(
  <Provider store={store}>
    <ChainedSelect />
  </Provider>,
  document.getElementById('app')
);

