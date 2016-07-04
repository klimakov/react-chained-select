import { createStore } from 'redux';
import { fromJS, List } from 'immutable';
import reducer from './reducer';

const ROOT_CLS = '__root';
const source = require('xml!./data/example.xml');

function transformSource(source) {
  let jsMap = source.data.select.map( x => {
      let select = {
        id: x.$.id,
        name: x.$.name
      };
      let classMap = {};
      x.option.forEach( y => {
        let values = {
          id: y.$.value,
          name: y._,
        };
        let classifiers = y.$.class ? y.$.class.split(' ') : [ROOT_CLS];
        classifiers.forEach( classifier => {
          if (! classMap[classifier]) {
            classMap[classifier] = [];
          }
          classMap[classifier].push(values);
        })
      });

      select.options = [];
      for (let classifier of Object.keys(classMap)) {
        select.options.push({
          classifier: classifier.split("\\"),
          values: classMap[classifier],
        })
      }
      return select;
  });
  return fromJS(jsMap);
}

const initStore = {
  selects: transformSource(source),
  selected: List(),
};

export const store = createStore(
  reducer,
  initStore,
  window.devToolsExtension && window.devToolsExtension()
);
