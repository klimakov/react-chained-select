import { connect } from 'react-redux';
import * as components from './components';
import { toSelect } from './actions';

const mapStateToProps = (state) => ({
  selected: state.selected,
  selects: state.selects,
});

const mapDispatchToProps = (dispatch) => ({
  toSelect: (idx, value) => dispatch(toSelect(idx,value)),
});

export const ChainedSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(components.ChainedSelect);
