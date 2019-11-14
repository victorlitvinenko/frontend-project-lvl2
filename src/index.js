import fs from 'fs';
import parse from './parsers';
import getAst from './ast';
import render from './formatters';

export default (pathToFile1, pathToFile2, format = 'nested') => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    const config1 = parse(pathToFile1);
    const config2 = parse(pathToFile2);
    const ast = getAst(config1, config2);
    return render(ast, format);
  }
  return false;
};
