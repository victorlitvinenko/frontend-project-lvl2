import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAst from './ast';
import render from './formatters';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');
const getParserType = (pathToFile) => path.extname(pathToFile).substring(1);

export default (path1, path2, format) => {
  if (fs.existsSync(path1) && fs.existsSync(path2)) {
    const data1 = readFile(path1);
    const data2 = readFile(path2);
    const parserType1 = getParserType(path1);
    const parserType2 = getParserType(path2);
    const config1 = parse(data1, parserType1);
    const config2 = parse(data2, parserType2);

    const ast = getAst(config1, config2);
    return render(ast, format);
  }
  return false;
};
