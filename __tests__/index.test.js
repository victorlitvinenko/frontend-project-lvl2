import genDiff from '../src';
import { stringify } from '../src/formatters/nested';

const fs = require('fs');

const extensions = [['json'], ['yml'], ['ini']];
const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
const expectedPlain = fs.readFileSync(`${__dirname}/__fixtures__/resultPlain.txt`, 'utf8');

test.each(extensions)(
  'genDiff(%s)',
  (ext) => {
    const files = [`${__dirname}/__fixtures__/before.${ext}`, `${__dirname}/__fixtures__/after.${ext}`];
    const result = genDiff(...files);
    expect(result).toMatch(expected);
    const resultPlain = genDiff(...files, 'plain');
    expect(resultPlain).toMatch(expectedPlain);
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});

test('stringify()', () => {
  expect(stringify('123')).toMatch('123');
});
