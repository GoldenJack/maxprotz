import React, { Fragment } from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';

import Basic from 'templates/Basic';

const propTypes = {
  children: T.array.isRequired
};

const Layout = ({
  children
}) => {
  const checkLocalStorage = localStorage.getItem('user');

  return (
    <Fragment>
      { checkLocalStorage ? (
        <Basic>
          {children}
        </Basic>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </Fragment>
  );
};

Layout.propTypes = propTypes;

export default Layout;
