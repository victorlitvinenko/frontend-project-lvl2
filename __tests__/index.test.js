import genDiff from '../src';

const fs = require('fs');

const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');

test.each([['json'], ['yml'], ['ini']])(
  'genDiff(%s)',
  (ext) => {
    const result = genDiff(`${__dirname}/__fixtures__/before.${ext}`, `${__dirname}/__fixtures__/after.${ext}`);
    expect(result).toMatch(expected);
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});
