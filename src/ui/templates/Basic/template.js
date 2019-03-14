import React, { useState } from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Header from 'organisms/Header';

const cn = bemHelper('theme');
const propTypes = {
  children: T.object.isRequired
};

const Basic = ({
  children
}) => {
  const [theme, setTheme] = useState('basic');
  const toggleTheme = () => {
    theme === 'basic' ? setTheme('night') : setTheme('basic');
  };

  return (
    <div {...cn('', theme)} onClick={toggleTheme} role="none">
      <Header />
      {children}
    </div>
  );
};

Basic.propTypes = propTypes;

export default Basic;
