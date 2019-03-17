const validate = (configFields = {}, value) => {
  if (configFields.length < 1) return;

  const _required = () => {
    return 'Обязательное для заполнения';
  };

  const _match = (matches, matchMsg) => {
    const res = matches.includes(value);
    if (!res) return matchMsg;
    return null;
  };

  const _validate = () => {
    const configs = Object.keys(configFields);
    return configs.map(config => {
      return console.log(config)
    });
  };

  return _validate();
};
