import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    process: (first, second, fn) => [null, null, fn(first, second)],
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: (first) => [null, _.identity(first)],
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => [first, second],
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first) => [null, _.identity(first)],
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => [null, _.identity(second)],
  },
];

const getAst = (config1 = {}, config2 = {}) => {
  const configsKeys = _.union(_.keys(config1), _.keys(config2)).sort();
  return configsKeys.map((key) => {
    const { type, process } = keyTypes.find(
      (item) => item.check(config1, config2, key),
    );
    const [oldValue, value, children] = process(config1[key], config2[key], getAst);
    return {
      name: key, type, oldValue, value, children,
    };
  });
};

export default getAst;
