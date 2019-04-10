import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';

const cn = bemHelper('form');

const propTypes = {
  mix: T.string,
  children: T.array.isRequired,
  onSubmit: T.func.isRequired
};

const defaultProps = {
  mix: ''
};

const Form = ({
  mix,
  children,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} {...cn('', '', mix)}>
      { children.map(child => child) }
    </form>
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
