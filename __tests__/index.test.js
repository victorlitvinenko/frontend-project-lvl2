import genDiff from '../src';

const fs = require('fs');

const extensions = [['json'], ['yml'], ['ini']];
const formats = ['nested', 'plain', 'json'];
const path = `${__dirname}/__fixtures__/`;
const getExpectedFile = (format) => (fs.readFileSync(`${__dirname}/__fixtures__/${format}Result.txt`, 'utf8'));

test.each(extensions)(
  'genDiff(%s)',
  (ext) => {
    formats.forEach((format) => {
      const result = genDiff(`${path}before.${ext}`, `${path}after.${ext}`, format);
      expect(result).toMatch(getExpectedFile(format));
    });
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});
