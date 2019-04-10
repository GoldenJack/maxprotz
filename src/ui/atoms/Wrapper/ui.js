import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('wrapper');

const propTypes = {
  mix: T.string,
  children: T.oneOfType([
    T.object,
    T.array
  ]).isRequired
};

const defaultProps = {
  mix: ''
};

const Wrapper = ({ mix, children }) => {
  return (
    <div {...cn('', '', mix)}>
      {children}
    </div>
  );
};

Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;

export default Wrapper;
