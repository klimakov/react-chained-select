import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';

const EMPTY_OPTION = "--";
const ROOT_CLS = '__root'; //FIXME: find better place for constant (this constant was copy-pasted from store.js)

function renderOptions(select, selected) {
  const options = select.get('options');
  const filteredOpts = options.filter( opt => {
    let cls = opt.get('classifier');
    return (cls.contains(ROOT_CLS) || cls.isSubset(selected));
  });
  const flattenedOpts = filteredOpts.flatMap( opt => opt.get('values') );
  const augmentedOpts = flattenedOpts.unshift(
    Map({id: EMPTY_OPTION, name: EMPTY_OPTION})
  );
  const renderingOptions = augmentedOpts.map( value => {
    return (
      <option value={ value.get('id') } key={ value.get('id') }>
        { value.get('name') }
      </option>
    )
  });
  return renderingOptions.toJS();
}

function handleSelectChange(idx, toSelect) {
  return  (e) => {
    toSelect(idx, e.target.value);
  }
}


export function ChainedSelect({ selects, selected, toSelect }) {
  if (selected.isEmpty()) {
    selected = List([EMPTY_OPTION]);
  }
  const lastSelected = (selected.last() === EMPTY_OPTION) ? 0: 1;
  const selectsCount = Math.min(selected.count() + lastSelected, selects.count());
  const viewableSelects = selects.take( selectsCount );
  const renderingSelects = viewableSelects.map( (select, idx) => {
    return (
      <select
        key={ idx }
        value={ selected.get(idx) }
        onChange={ handleSelectChange(idx, toSelect) }
      >
        { renderOptions(select, selected) }
      </select>
    )
  }).toJS();
  return (
    <div>
      { renderingSelects }
    </div>
  );
}

ChainedSelect.propTypes = {
  selects: React.PropTypes.instanceOf(List).isRequired,
  selected: React.PropTypes.instanceOf(List).isRequired,
  toSelect: PropTypes.func.isRequired,
};
