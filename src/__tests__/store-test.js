import "babel-polyfill";
import React from 'react';
import { expect } from 'chai';
import { store } from '../store'; // eslint-disable-line import/no-unresolved

describe('Store for React Chained Select', () => {

  it('should contain "selected" element', () => {
    const state = store.getState();
    expect(state).to.have.property('selected');
  });

  it('should contain "selects" element', () => {
    const state = store.getState();
    expect(state).to.have.property('selects');
  });

  it('should load data from example.xml', () => {
    const state = store.getState();
    const firstSelect = state.selects.first();
    const name = firstSelect.get('name');
    expect(name).to.be.equal('mark§ ');
  });
});
