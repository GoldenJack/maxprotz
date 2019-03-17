import React from 'react';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Auth from 'organisms/Auth';

const cn = bemHelper('login');


const Login = ({
  history
}) => {
  return (
    <div {...cn()}>
      <Auth history={history} />
    </div>
  );
};

export default Login;
