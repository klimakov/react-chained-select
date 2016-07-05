import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { ROOT_CLS, EMPTY_OPTION_STRING } from './constants';

const EMPTY_OPTION = Map({ id: EMPTY_OPTION_STRING, name: EMPTY_OPTION_STRING });

function renderOptions(select, selected) {
  const options = select.get('options');
  const filteredOpts = options.filter(opt => {
    const cls = opt.get('classifier');
    return (cls.contains(ROOT_CLS) || cls.isSubset(selected));
  });
  const flattenedOpts = filteredOpts.flatMap(opt => opt.get('values'));

  const augmentedOpts = flattenedOpts.unshift(
    EMPTY_OPTION
  );
  const renderingOptions = augmentedOpts.map(value =>
    <option value={value.get('id')} key={value.get('id')}>
      {value.get('name')}
    </option>
  );
  return renderingOptions.toJS();
}

function handleSelectChange(idx, toSelect) {
  return (e) => {
    toSelect(idx, e.target.value);
  };
}

export function ChainedSelect({ selects, selected, toSelect }) {
  const lastSelected = (selected.last() === EMPTY_OPTION_STRING) ? 0 : 1;
  const selectsCount = Math.min(selected.count() + lastSelected, selects.count());
  const viewableSelects = selects.take(selectsCount);
  const renderingSelects = viewableSelects.map((select, idx) =>
    <select
      key={idx}
      value={selected.get(idx)}
      onChange={handleSelectChange(idx, toSelect)}
    >
      {renderOptions(select, selected)}
    </select>
  ).toJS();
  return (
    <div>
      {renderingSelects}
    </div>
  );
}

ChainedSelect.propTypes = {
  selects: React.PropTypes.instanceOf(List).isRequired,
  selected: React.PropTypes.instanceOf(List).isRequired,
  toSelect: PropTypes.func.isRequired,
};
