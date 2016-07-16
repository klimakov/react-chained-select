import { SELECT } from './actions';

export default function (state = {}, action) {
  switch (action.type) {
    case SELECT:
      return {
        selects: state.selects,
        selected: state.selected.take(action.idx).push(action.value),
      };
    default:
      return state;
  }
}
