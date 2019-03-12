import React, { useState } from 'react';
import bemHelper from '../../../utils/bem-helper';
import './style.scss';

const cn = bemHelper('theme');

const Basic = ({
  children
}) => {
  const [theme, setTheme] = useState('basic');
  const toggleTheme = () => {
    theme === 'basic' ? setTheme('night') : setTheme('basic');
  };

  return (
    <div {...cn('', theme)} onClick={toggleTheme}>
      {children}
    </div>
  )
};

export default Basic;