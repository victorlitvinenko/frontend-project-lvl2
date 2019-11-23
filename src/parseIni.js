import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  if (_.isObject(data)) {
    return _.keys(data).reduce((acc, elem) => {
      const newElem = parseIni(data[elem]);
      return { ...acc, [elem]: newElem };
    }, {});
  }
  if (!Number.isNaN(Number(data)) && typeof data !== 'boolean') {
    return Number(data);
  }
  return data;
};

export default (data) => parseIni(ini.parse(data));
