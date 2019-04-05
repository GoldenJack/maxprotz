import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('button');

const propTypes = {
  mix: T.string,
  style: T.oneOf(['default']),
  type: T.string,
  children: T.string,
  effect: T.func,
};

const defaultProps = {
  mix: '',
  style: 'default',
  type: 'button',
  children: 'Отправить',
  effect: () => {}
};

const Button = ({
  mix,
  style,
  type,
  effect,
  title,
  children
}) => {
  return (
    <button
      {...cn('', style, mix)}
      type={type}
      title={title}
      onClick={effect}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
