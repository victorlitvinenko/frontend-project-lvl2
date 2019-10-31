import formatNested from './nested';
import formatPlain from './plain';

export default (elements, format) => {
  switch (format) {
    case 'plain':
      return formatPlain(elements);
    default:
      return formatNested(elements);
  }
};
