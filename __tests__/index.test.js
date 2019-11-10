import fs from 'fs';
import genDiff from '../src';

const extensionsWithFormats = [
  ['json', 'nested'], ['json', 'plain'], ['json', 'json'],
  ['yml', 'nested'], ['yml', 'plain'], ['yml', 'json'],
  ['ini', 'nested'], ['ini', 'plain'], ['ini', 'json'],
];
const fixturesPath = `${__dirname}/__fixtures__/`;
const getExpectedResult = (format) => (fs.readFileSync(`${__dirname}/__fixtures__/${format}Result.txt`, 'utf8'));

test.each(extensionsWithFormats)(
  'genDiff(%s), format=%s',
  (ext, format) => {
    const result = genDiff(`${fixturesPath}before.${ext}`, `${fixturesPath}after.${ext}`, format);
    expect(result).toMatch(getExpectedResult(format));
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});
