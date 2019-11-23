import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    process: (first, second, fn) => ({ children: fn(first, second) }),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: (first) => ({ value: first }),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ valueBefore: first, value: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first) => ({ value: first }),
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => ({ value: second }),
  },
];

const getAst = (config1 = {}, config2 = {}) => {
  const configsKeys = _.union(_.keys(config1), _.keys(config2)).sort();
  return configsKeys.map((key) => {
    const { type, process } = keyTypes.find(
      (item) => item.check(config1, config2, key),
    );
    const { valueBefore, value, children } = process(config1[key], config2[key], getAst);
    return {
      name: key, type, valueBefore, value, children,
    };
  });
};

export default getAst;
