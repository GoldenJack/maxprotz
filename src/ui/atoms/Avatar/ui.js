import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('avatar');

const propTypes = {
  mix: T.string,
  size: T.oneOf(['large', 'default', 'small'])
};

const defaultProps = {
  mix: '',
  size: 'default'
};

const Avatar = ({
  mix,
  size
}) => {
  return (
    <img {...cn('', size, mix)} src="img/user.svg" alt="/" />
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
