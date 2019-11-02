import renderNested from './nested';
import renderPlain from './plain';
import renderJson from './json';

export default (elements, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(elements);
    case 'json':
      return renderJson(elements);
    default:
      return renderNested(elements);
  }
};
