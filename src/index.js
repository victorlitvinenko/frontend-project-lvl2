import fs from 'fs';
import { parse, getFileType } from './parsers';
import getAst from './ast';
import render from './formatters';

export default (pathToFile1, pathToFile2, format = 'nested') => {
  if (fs.existsSync(pathToFile1) && fs.existsSync(pathToFile2)) {
    const fileContent1 = fs.readFileSync(pathToFile1, 'utf8');
    const fileType1 = getFileType(pathToFile1);
    const config1 = parse(fileContent1, fileType1);
    const fileContent2 = fs.readFileSync(pathToFile2, 'utf8');
    const fileType2 = getFileType(pathToFile2);
    const config2 = parse(fileContent2, fileType2);
    const ast = getAst(config1, config2);
    return render(ast, format);
  }
  return false;
};
