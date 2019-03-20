import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Avatar from 'atoms/Avatar';

const cn = bemHelper('client');

const propTypes = {
  visible: T.bool.isRequired
};

const Client = ({
  visible
}) => {
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div {...cn('', visible ? 'open' : 'close')}>
      <div {...cn('caption')}>
        <Link to="/profile" {...cn('name')}>
          <Avatar size="small" mix={cn('avatar').className} />
          Евгений Казанцев
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

export default Client;
