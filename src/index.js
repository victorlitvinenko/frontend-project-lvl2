import { getObjects, parse, render } from './parsers';

const fs = require('fs');
// const _ = require('lodash');

export default (pathToFile1, pathToFile2) => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    const [object1, object2] = getObjects(pathToFile1, pathToFile2);
    return render(parse(object1, object2));
  }
  return false;
};
