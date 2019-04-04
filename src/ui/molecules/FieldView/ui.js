import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';

const cn = bemHelper('field-view');

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

export default FieldView;
