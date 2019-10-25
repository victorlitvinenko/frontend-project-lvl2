import genDiff from '../src';

const fs = require('fs');

test('genDiff', () => {
  const result = genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`);
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
  expect(result).toMatch(expected);
  expect(genDiff()).toBe(false);
});
