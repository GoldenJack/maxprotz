/**
 * This is slightly improved copy of react-bem-helper repository.
 * You can find documentation here: https://www.npmjs.com/package/react-bem-helper
 * This module has two differences:
 *   1. When second parameter is object with boolean values, it behaves in same manner. When values
 *      aren't boolean, it returns them as key_value pair modifiers.
 *   2. It converts numbers to strings automatically (except 0).
 * */

function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && obj);
}

function isString(string) {
  return typeof string === 'string';
}

function isFunction(func) {
  return typeof func === 'function';
}

function isBoolean(bool) {
  return typeof bool === 'boolean';
}

function stringToArray(string) {
  return string.toString().split(/\s+/g).filter((c) => {
    return c.length !== 0;
  });
}

function objectToArray(object) {
  return Object.keys(object).reduce((array, key) => {
    let predicate = object[key];

    if (isFunction(predicate)) {
      predicate = predicate();
    }

    if (isBoolean(predicate)) {
      return predicate ? array.concat(stringToArray(key)) : array;
    } else {
      const modifier = object[key] ? isString(object[key]) ? `${key}_${object[key]}` : key : '';
      return array.concat(stringToArray(modifier));
    }
  }, []);
}

function listToArray(list) {
  if (isString(list) && list !== '') {
    return stringToArray(list);
  } else if (list && list.length) {
    return list.reduce((array, string) => {
      return string ? array.concat(stringToArray(string)) : array;
    }, []);
  } else if (isObject(list)) {
    return objectToArray(list);
  } else {
    return [];
  }
}

function withDefaults(defaults) {
  return function (options) {
    if (isString(options)) {
      options = { name: options };
    }

    const rootDefaults = {
      prefix: '',
      modifierDelimiter: '--',
      outputIsString: false,
    };

    // Copy options on top of defaults
    options = Object.assign(rootDefaults, defaults, options);

    const blockName = options.prefix + options.name;
    const modifierDelimiter = options.modifierDelimiter;
    const outputIsString = options.outputIsString;

    return function (first, modifiers, extraClassNames) {
      let element;

      // This means the first parameter is not the element, but a configuration variable
      if (isObject(first)) {
        element = first.element;
        modifiers = first.modifiers || first.modifier;
        extraClassNames = first.extra;
      } else {
        element = first;
      }

      const rootName = element ? `${blockName}__${element}` : blockName;
      const className = [rootName]
        .concat(
          listToArray(modifiers).map((modifier) => {
            return rootName + modifierDelimiter + modifier;
          })
        )
        .concat(listToArray(extraClassNames))
        .join(' ')
        .trim();

      if (outputIsString) {
        return className;
      } else {
        return { className };
      }
    };
  };
}

const BEMHelper = withDefaults({});

BEMHelper.withDefaults = withDefaults;
module.exports = BEMHelper;
