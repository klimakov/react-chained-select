import { connect } from 'react-redux';
import * as components from './components';
import { select } from './actions';

const mapStateToProps = (state) => ({
  selected: state.selected,
  selects: state.selects,
});


export const ChainedSelect = connect(
  mapStateToProps,
  { select }
)(components.ChainedSelect);
