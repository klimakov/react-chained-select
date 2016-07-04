import { List, Map } from 'immutable';

export default function (state = {}, action) {
  switch (action.type) {
    case 'SELECT':
      return state.selected.set(action.idx, action.value);
    default:
      return state;
  }
}
