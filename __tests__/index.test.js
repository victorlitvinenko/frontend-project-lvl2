import genDiff from '../src';
import { stringify } from '../src/formatters/nested';

const fs = require('fs');

const extensions = [['json'], ['yml'], ['ini']];
const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
const expectedNested = fs.readFileSync(`${__dirname}/__fixtures__/nested/result.txt`, 'utf8');
const expectedPlain = fs.readFileSync(`${__dirname}/__fixtures__/nested/resultPlain.txt`, 'utf8');

test.each(extensions)(
  'genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/before.${ext}`, `${__dirname}/__fixtures__/after.${ext}`);
    expect(result).toMatch(expected);
  },
);

test.each(extensions)(
  'Nested genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/nested/before.${ext}`, `${__dirname}/__fixtures__/nested/after.${ext}`);
    expect(result).toMatch(expectedNested);
  },
);

test.each(extensions)(
  'Plain genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/nested/before.${ext}`, `${__dirname}/__fixtures__/nested/after.${ext}`, 'plain');
    expect(result).toMatch(expectedPlain);
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});

test('stringify', () => {
  expect(stringify('123')).toMatch('123');
});
