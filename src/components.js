import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';

const EMPTY_OPTION = "--";
const ROOT_CLS = '__root'; //FIXME: find better place for constant (this constant was copy-pasted from store.js)

function renderOptions(select, selected) {
  let options = select.get('options');
  let filteredOpts = options.filter( opt => {
    let cls = opt.get('classifier');
    return (cls.contains(ROOT_CLS) || cls.isSubset(selected));
  });
  let flattenedOpts = filteredOpts.flatMap( opt => opt.get('values') );
  let augmentedOpts = flattenedOpts.unshift(
    Map({id: EMPTY_OPTION, name: EMPTY_OPTION})
  );
  let renderingOptions = augmentedOpts.map( value => {
    return (
      <option value={ value.get('id') } key={ value.get('id') }>
        { value.get('name') }
      </option>
    )
  });
  return renderingOptions.toJS();
}

function handleSelectChange(idx) {
  return  (e) => {
    console.log(idx);
    console.log(e.target.value);
  }
}


export function ChainedSelect({ selects, selected }) {
  selected = List(['audi', 'a5']); // FIXME
  if (selected.isEmpty()) {
    selected = List([EMPTY_OPTION]);
  }
  let selectsCount = selected.count();
  let viewableSelects = selects.take( selectsCount );
  let list = viewableSelects.map( (select, idx) => {
    return (
      <select
        key={ idx }
        value={ selected.get(idx) }
        onChange={ handleSelectChange(idx) }
      >
        { renderOptions(select, selected) }
      </select>
    )
  }).toJS();
  return (
    <div>
      {list}
    </div>
  );
}

ChainedSelect.propTypes = {
  selects: React.PropTypes.instanceOf(List).isRequired,
  selected: React.PropTypes.instanceOf(List).isRequired,
};
