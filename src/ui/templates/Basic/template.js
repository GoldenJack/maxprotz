import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Header from 'organisms/Header';

const cn = bemHelper('theme');
const propTypes = {
  children: T.oneOfType([
    T.array,
    T.object
  ]).isRequired
};

const Basic = ({
  children
}) => {
  return (
    <div {...cn()}>
      <Header />
      <div {...cn('body')}>
        {children}
      </div>
    </div>
  );
};

Basic.propTypes = propTypes;

export default Basic;
