import React from 'react';
import T from 'prop-types';
import { useAnimation } from 'hooks';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('modal');

const propTypes = {
  mix: T.string,
  children: T.oneOfType([
    T.object,
    T.array
  ]).isRequired,
  visible: T.bool.isRequired,
  position: T.oneOf(['right', 'center'])
};

const defaultProps = {
  mix: '',
  position: 'right'
};

const Modal = ({
  mix,
  children,
  visible,
  position
}) => {
  const animation = useAnimation({
    toggle: visible
  });

  return (
    <div {...cn('', { animation, position }, mix)}>
      {children}
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
