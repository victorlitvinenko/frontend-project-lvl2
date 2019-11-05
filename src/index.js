import parse from './parsers';
import render from './formatters';

const fs = require('fs');

export default (pathToFile1, pathToFile2, format = 'nested') => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    const ast = parse(pathToFile1, pathToFile2);
    return render(ast, format);
  }
  return false;
};
