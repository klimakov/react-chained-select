
export default function (state = {}, action) {
  switch (action.type) {
    case 'SELECT':
      const selected = state.selected.take(action.idx);
      const newSelected = selected.push(action.value);
      return {
        selects: state.selects,
        selected: newSelected,
      };
    default:
      return state;
  }
}
