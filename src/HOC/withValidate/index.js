import React, { useCallback, useState, Fragment } from 'react';
import { isEmpty } from 'utils/helper';

export const withValidate = (WrappedComponent, {
  stateFields = {},
  validateFields = {}
}) => ({ ...wrappedComponentProps }) => {
  const [fields, setFields] = useState(stateFields);
  const [errors, setErrors] = useState({});

  const onFieldChange = fieldName => value => {
    if (!(fieldName in fields)) return;
    setFields({ ...fields, [fieldName]: value });
  };

  const checkValidateField = (validateRules, fieldValue) => {
    if (!validateRules) return null;
    return validateRules.reduce((acc, validate) => {
      return acc || validate(fieldValue);
    }, null);
  };

  const _validate = () => {
    const validations = Object.keys(validateFields);
    const validateErrors = {};
    validations.map(validateKey => {
      const validateRules = validateFields[validateKey];
      const validateError = checkValidateField(validateRules, fields[validateKey]);
      if (validateError !== null) validateErrors[validateKey] = validateError;
      return null;
    });
    setErrors(validateErrors);
    return Promise.resolve(validateErrors);
  };

  const updateAllFields = useCallback((newFields) => {
    const updatedFields = {};
    newFields && Object.keys(newFields).forEach(newFieldName => {
      updatedFields[newFieldName] = newFields[newFieldName];
    });
    setFields(f => ({ ...f, ...updatedFields }));
  }, []);

  const handleSubmit = onSubmit => e => {
    e.preventDefault();
    _validate(onSubmit)
      .then(err => isEmpty(err) && onSubmit());
  };

  const pushErrorsFromServer = (errorsFromServer = {}) => {
    setErrors(errorsFromServer);
  };

  return (
    <Fragment>
      <WrappedComponent
        fields={fields}
        errors={errors}
        handleSubmit={handleSubmit}
        onFieldChange={onFieldChange}
        pushErrorsFromServer={pushErrorsFromServer}
        updateAllFields={updateAllFields}
        {...wrappedComponentProps}
      />
    </Fragment>
  );
};
