import { createStore } from 'redux';
import { fromJS, List } from 'immutable';
import reducer from './reducer';
import { ROOT_CLS, EMPTY_OPTION_STRING } from './constants';


function transformSource(source) {
  const jsMap = source.data.select.map(x => {
    const select = {
      id: x.$.id,
      name: x.$.name,
    };
    const classMap = {};
    x.option.forEach(y => {
      const values = {
        id: y.$.value,
        name: y._,
      };
      const classifiers = y.$.class ? y.$.class.split(' ') : [ROOT_CLS];
      classifiers.forEach(classifier => {
        if (! classMap[classifier]) {
          classMap[classifier] = [];
        }
        classMap[classifier].push(values);
      });
    });

    select.options = [];
    for (const classifier of Object.keys(classMap)) {
      select.options.push({
        classifier: classifier.split('\\'),
        values: classMap[classifier],
      });
    }
    return select;
  });
  return fromJS(jsMap);
}

const source = require('xml!./data/example.xml'); // eslint-disable-line import/no-unresolved

const initStore = {
  selects: transformSource(source),
  selected: List([EMPTY_OPTION_STRING]),
};

export const store = createStore(
  reducer,
  initStore,
  window.devToolsExtension && window.devToolsExtension()
);
