import React, { useEffect, useReducer, useState, Fragment } from 'react';
import { isEmpty } from 'utils/helper';

export const withValidate = (WrappedComponent, {
  stateFields = {},
  validateFields = {}
}) => ({ ...wrappedComponentProps }) => {
  const [fields, setFields] = useState(stateFields);
  const [errors, setErrors] = useState({});
  const [allowed, setAllowed] = useState(false);

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

  const _validate = cb => {
    const validations = Object.keys(validateFields);
    const validateErrors = {};
    validations.map(validateKey => {
      const validateRules = validateFields[validateKey];
      const validateError = checkValidateField(validateRules, fields[validateKey]);
      if (validateError !== null) validateErrors[validateKey] = validateError;
      return null;
    });
    isEmpty(validateErrors) && cb();
    setErrors(validateErrors);
  };

  const handleSubmit = onSubmit => e => {
    e.preventDefault();
    _validate(onSubmit);
  };

  return (
    <Fragment>
      <WrappedComponent
        fields={fields}
        errors={errors}
        handleSubmit={handleSubmit}
        onFieldChange={onFieldChange}
        {...wrappedComponentProps}
      />
    </Fragment>
  );
};
