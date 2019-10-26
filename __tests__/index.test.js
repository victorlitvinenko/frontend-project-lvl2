import genDiff from '../src';

const fs = require('fs');

test('genDiff', () => {
  const jsonResult = genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`);
  const yamlResult = genDiff(`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`);
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
  expect(jsonResult).toMatch(expected);
  expect(yamlResult).toMatch(expected);
  expect(genDiff()).toBeFalsy();
});
