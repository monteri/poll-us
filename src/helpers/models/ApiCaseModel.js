import _ from 'lodash';

function transformKeys(data, transformer) {
  if (Array.isArray(data)) {
    return data.map(item => transformKeys(item, transformer));
  }
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((result, key) => {
      const value = data[key];
      const camelCaseKey = transformer(key);
      result[camelCaseKey] = transformKeys(value, transformer);

      return result;
    }, {});
  }

  return data;
}

class ApiCaseModel {
  constructor(data) {
    this.data = data;
  }

  getSnake() {
    return transformKeys(this.data, _.snakeCase);
  }

  getCamel() {
    return transformKeys(this.data, _.camelCase);
  }
}

export default ApiCaseModel;
