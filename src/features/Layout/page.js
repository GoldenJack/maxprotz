import React, { Fragment, useState } from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import Basic from 'templates/Basic';

const propTypes = {
  children: T.array.isRequired
};

const Layout = ({
  children,
}) => {
  const [auth, setAuth] = useState(false);
  const user = localStorage.getItem('user');
  !auth && user && setAuth(true);

  return (
    <Fragment>
      { auth ? (
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
