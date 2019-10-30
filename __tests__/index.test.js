import genDiff from '../src';
import { render, stringify } from '../src/parsers';

const fs = require('fs');

const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
const expectedNested = fs.readFileSync(`${__dirname}/__fixtures__/nested/result.txt`, 'utf8');

test.each([['json'], ['yml'], ['ini']])(
  'genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/before.${ext}`, `${__dirname}/__fixtures__/after.${ext}`);
    expect(result).toMatch(expected);
  },
);

test.each([['json'], ['yml'], ['ini']])(
  'Nested genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/nested/before.${ext}`, `${__dirname}/__fixtures__/nested/after.${ext}`);
    expect(result).toMatch(expectedNested);
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});

test('render without normal status', () => {
  expect(render([{ status: 'empty' }])).toMatch('{\n}');
});

test('stringify', () => {
  expect(stringify('123')).toMatch('123');
  expect(stringify({})).toMatch('{\n}');
});
