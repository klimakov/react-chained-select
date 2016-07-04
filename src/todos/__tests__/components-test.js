import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { List, Map } from 'immutable';
import { TodoList } from 'todos/containers'; // eslint-disable-line import/no-unresolved
import reducer from 'todos/reducer'; // eslint-disable-line import/no-unresolved

describe('TodoList', () => {
  const mockStore = List([
    Map({ id: 0, isDone: true, text: 'make components' }),
    Map({ id: 1, isDone: false, text: 'design actions' }),
    Map({ id: 2, isDone: false, text: 'implement reducer' }),
    Map({ id: 3, isDone: false, text: 'connect components' }),
  ]);
  const store = createStore(reducer, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <TodoList />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () =>
    expect(renderer).to.be.ok
  );

  it('should render with correct value', () => {
    const text = dom.getElementsByTagName('li')[0].getElementsByTagName('strike')[0].textContent;
    expect(text).to.equal(mockStore.get(0).get('text'));
  });
});
