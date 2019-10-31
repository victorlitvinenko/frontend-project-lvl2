import parse from './parsers';
import render from './formatters';

const fs = require('fs');

export default (pathToFile1, pathToFile2, format = 'nested') => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    return render(parse(pathToFile1, pathToFile2), format);
  }
  return false;
};
