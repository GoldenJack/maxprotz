/**
 * @public
 * @param {String} value: Check for value
 * Returns boolean or error text
 */
export const _required = value => {
  if (!value) return 'Обязательное для заполнения';
  return null;
};


/**
 * @public
 * @param {Array} matches: List of data
 * @param {String} matchMsg: Return message in case of error
 * @param {value} matches: Value comparison list
 * Returns boolean or error text
 */
export const _match = (matches, matchMsg) => value => {
  const res = matches.includes(value);
  if (!res) return matchMsg;
  return null;
};
