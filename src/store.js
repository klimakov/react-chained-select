import { createStore } from 'redux';
import { fromJS, List } from 'immutable';
import reducer from './reducer';
import { ROOT_CLS, EMPTY_OPTION_STRING,
  ID_FIELD, NAME_FIELD,
  CLASSIFIER_FIELD, VALUES_FIELD, OPTIONS_FIELD } from './constants';

function transformSource(source) {
  const jsMap = source.data.select.map(x => {
    const select = {
      [ID_FIELD]: x.$.id,
      [NAME_FIELD]: x.$.name,
      [OPTIONS_FIELD]: [],
    };
    const classMap = {};
    x.option.forEach(y => {
      const values = {
        [ID_FIELD]: y.$.value,
        [NAME_FIELD]: y._,
      };
      const classifiers = y.$.class ? y.$.class.split(' ') : [ROOT_CLS];
      classifiers.forEach(classifier => {
        if (! classMap[classifier]) {
          classMap[classifier] = [];
        }
        classMap[classifier].push(values);
      });
    });

    for (const classifier of Object.keys(classMap)) {
      select[OPTIONS_FIELD].push({
        [CLASSIFIER_FIELD]: classifier.split('\\'),
        [VALUES_FIELD]: classMap[classifier],
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
