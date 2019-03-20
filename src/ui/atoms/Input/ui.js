import React, { useState } from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('input');

const propTypes = {
  mix: T.string,
  value: T.string,
  type: T.string,
  label: T.string
};

const defaultProps = {
  mix: '',
  value: '',
  type: 'text',
  label: ''
};

const Input = ({
  mix,
  type,
  value,
  label,
  onChange,
  error
}) => {
  const [focused, setFocused] = useState(false);

  const onFieldChange = e => {
    onChange(e.currentTarget.value);
  };

  return (
    <div {...cn('', { 'focused': focused, 'filled': value !== '', 'has-error': !!error })}>
      <div {...cn('label')}>{ label }</div>
      <input
        {...cn('field', '', mix)}
        type={type}
        value={value}
        onChange={onFieldChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <span {...cn('error-msg')}>{error}</span>
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;