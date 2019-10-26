import getObjects from './parsers';

const fs = require('fs');
const _ = require('lodash');

export default (pathToFile1, pathToFile2) => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    const [object1, object2] = getObjects(pathToFile1, pathToFile2);
    const result = Object.keys(object2).reduce((acc, element) => {
      if (!_.has(object1, element)) {
        return `${acc}  + ${element}: ${object2[element]}\n`;
      }
      return acc;
    }, Object.keys(object1).reduce((acc, element) => {
      if (_.has(object2, element)) {
        if (object1[element] === object2[element]) {
          return `${acc}    ${element}: ${object1[element]}\n`;
        }
        return `${acc}  + ${element}: ${object2[element]}\n  - ${element}: ${object1[element]}\n`;
      }
      return `${acc}  - ${element}: ${object1[element]}\n`;
    }, ''));
    return `{\n${result}}\n`;
  }
  return false;
};
