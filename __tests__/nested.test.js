import { stringify } from '../src/formatters/nested';

test('stringify()', () => {
  expect(stringify('123')).toMatch('123');
});
