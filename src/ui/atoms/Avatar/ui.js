import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('avatar');

const propTypes = {
  mix: T.string,
  size: T.oneOf(['large', 'medium', 'default', 'small']),
  avatar: T.string,
  onClick: T.func
};

const defaultProps = {
  mix: '',
  size: 'default',
  avatar: 'img/user.svg',
  onClick: () => {}
};

const Avatar = ({
  mix,
  size,
  avatar,
  onClick
}) => {
  return (
    <img {...cn('', size, mix)} src={avatar} alt="/" onClick={onClick} role="none" />
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
