
export default function (state = {}, action) {
  switch (action.type) {
    case 'SELECT':
      let selected = state.selected.take(action.idx);
      let newSelected = selected.push(action.value);
      return {
        selects: state.selects,
        selected: newSelected,
      };
    default:
      return state;
  }
}
