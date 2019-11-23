import errors from 'errno';
import renderNested from './nested';
import renderPlain from './plain';
import renderJson from './json';

export default (elements, format = 'nested') => {
  switch (format) {
    case 'plain':
      return renderPlain(elements);
    case 'json':
      return renderJson(elements);
    case 'nested':
      return renderNested(elements);
    default:
      throw new Error(errors.code.ESRCH);
  }
};
