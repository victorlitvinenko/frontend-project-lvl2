import { getAst } from '../src/parsers';

test('parse()', () => {
  expect(getAst()).toEqual([]);
});
