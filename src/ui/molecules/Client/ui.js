import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { useAnimation } from 'hooks';

import bemHelper from 'utils/bem-helper';
import './style.scss';

import Avatar from 'atoms/Avatar';

const cn = bemHelper('client');

const propTypes = {
  visible: T.bool,
  currentUser: T.object
};

const defaultProps = {
  visible: null,
  currentUser: {}
};

const Client = ({
  visible,
  currentUser
}) => {
  const animation = useAnimation({
    toggle: visible
  });

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div {...cn('', animation)}>
      <div {...cn('caption')}>
        <Link to="/profile" {...cn('name')}>
          <Avatar size="small" mix={cn('avatar').className} avatar={currentUser.avatar} />
          { `${currentUser.firstName} ${currentUser.lastName}` }
        </Link>
      </div>
      <span {...cn('logout')} onClick={logout} role="none">
        <img src="img/logout.svg" {...cn('logout-icon')} alt="/" />
        Выход
      </span>
    </div>
  );
};

Client.propTypes = propTypes;
Client.defaultProps = defaultProps;

export default Client;
