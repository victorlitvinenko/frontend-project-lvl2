import genDiff from '../src';

const fs = require('fs');

const formats = [
  ['json', 'nested'], ['json', 'plain'], ['json', 'json'],
  ['yml', 'nested'], ['yml', 'plain'], ['yml', 'json'],
  ['ini', 'nested'], ['ini', 'plain'], ['ini', 'json'],
];
const path = `${__dirname}/__fixtures__/`;
const getExpectedFile = (format) => (fs.readFileSync(`${__dirname}/__fixtures__/${format}Result.txt`, 'utf8'));

test.each(formats)(
  'genDiff(%s), format=%s',
  (ext, format) => {
    const result = genDiff(`${path}before.${ext}`, `${path}after.${ext}`, format);
    expect(result).toMatch(getExpectedFile(format));
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});
