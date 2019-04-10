import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';

const cn = bemHelper('field-view');

const propTypes = {
  mix: T.string,
  value: T.string,
  type: T.string,
  label: T.string,
  onChange: T.func.isRequired,
  error: T.string,
  edit: T.bool,
  name: T.string
};

const defaultProps = {
  mix: '',
  value: '',
  type: 'text',
  label: '',
  error: '',
  edit: false,
  name: ''
};

const FieldView = ({
  mix,
  edit,
  name,
  value,
  label,
  error,
  onChange,
  ...props
}) => {
  return (
    <div {...cn('', { 'edited': edit }, mix)}>
      <h4 {...cn('name')}>{label}:</h4>
      <Input
        mix={cn('input').className}
        mixWrapper={cn('input-wrapper').className}
        type="text"
        value={value}
        error={error}
        onChange={onChange(name)}
        disabled={!edit}
        {...props}
      />
    </div>
  );
};

FieldView.propTypes = propTypes;
FieldView.defaultProps = defaultProps;

export default FieldView;
