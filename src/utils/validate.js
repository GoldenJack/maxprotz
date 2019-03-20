export const _required = value => {
  if (!value) return 'Обязательное для заполнения';
  return null;
};

export const _match = (matches, matchMsg) => value => {
  const res = matches.includes(value);
  if (!res) return matchMsg;
  return null;
};
