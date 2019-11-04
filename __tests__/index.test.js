import genDiff from '../src';
import { stringify } from '../src/formatters/nested';

const fs = require('fs');

const extensions = [['json'], ['yml'], ['ini']];
const expectedSimpleNested = fs.readFileSync(`${__dirname}/__fixtures__/simple/resultNested.txt`, 'utf8');
const expectedSimplePlain = fs.readFileSync(`${__dirname}/__fixtures__/simple/resultPlain.txt`, 'utf8');
const expectedSimpleJson = fs.readFileSync(`${__dirname}/__fixtures__/simple/resultJson.txt`, 'utf8');
const expectedNested = fs.readFileSync(`${__dirname}/__fixtures__/resultNested.txt`, 'utf8');
const expectedPlain = fs.readFileSync(`${__dirname}/__fixtures__/resultPlain.txt`, 'utf8');
const expectedJson = fs.readFileSync(`${__dirname}/__fixtures__/resultJson.txt`, 'utf8');

test.each(extensions)(
  'simple genDiff(%s)',
  (ext) => {
    const files = [`${__dirname}/__fixtures__/simple/before.${ext}`, `${__dirname}/__fixtures__/simple/after.${ext}`];
    const resultSimpleNested = genDiff(...files);
    expect(resultSimpleNested).toMatch(expectedSimpleNested);
    const resultSimplePlain = genDiff(...files, 'plain');
    expect(resultSimplePlain).toMatch(expectedSimplePlain);
    const resultSimpleJson = genDiff(...files, 'json');
    expect(resultSimpleJson).toMatch(expectedSimpleJson);
  },
);

test.each(extensions)(
  'genDiff(%s)',
  (ext) => {
    const files = [`${__dirname}/__fixtures__/before.${ext}`, `${__dirname}/__fixtures__/after.${ext}`];
    const resultNested = genDiff(...files);
    expect(resultNested).toMatch(expectedNested);
    const resultPlain = genDiff(...files, 'plain');
    expect(resultPlain).toMatch(expectedPlain);
    const resultJson = genDiff(...files, 'json');
    expect(resultJson).toMatch(expectedJson);
  },
);

test('genDiff(empty)', () => {
  expect(genDiff()).toBeFalsy();
});

test('stringify()', () => {
  expect(stringify('123')).toMatch('123');
});
