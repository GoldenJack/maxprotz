import React, { useContext, useState, useEffect } from 'react';
import T from 'prop-types';
import { Authorization } from 'context';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Avatar from 'atoms/Avatar';
import Button from 'atoms/Button';
import Modal from 'molecules/Modal';

const cn = bemHelper('avatars');

const propTypes = {
  visible: T.bool,
  onClose: T.func
};

const defaultProps = {
  visible: false,
  onClose: () => {}
};

const Avatars = ({
  visible,
  onClose
}) => {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const { updateUserProfile, getUserFromLocalStorage } = useContext(Authorization);

  const avatarsOptions = [
    'img/avatars/3d.png',
    'img/avatars/avatar.png',
    'img/avatars/cat.png',
    'img/avatars/dj.png',
    'img/avatars/gangster.png',
  ];

  useEffect(() => {
    setCurrentAvatar(getUserFromLocalStorage().avatar);
  }, [getUserFromLocalStorage]);

  const setAvatar = () => {
    updateUserProfile({ ...getUserFromLocalStorage(), avatar: currentAvatar });
    onClose();
  };

  return (
    <Modal
      mix={cn('modal').className}
      visible={visible}
      position="center"
    >
      <div {...cn('title')}>
        <h3 {...cn('caption')}>Вы можете сменить свой образ:</h3>
        <img {...cn('close')} src="img/close.svg" onClick={onClose} role="none" alt="/" />
      </div>
      <div {...cn('avatars-options')}>
        {avatarsOptions.map(avatar => (
          <Avatar
            key={avatar}
            size="medium"
            mix={cn(currentAvatar === avatar ? 'avatar avatars__avatar--active' : 'avatar').className}
            avatar={avatar}
            onClick={() => setCurrentAvatar(avatar)}
          />
        ))}
      </div>
      <div {...cn('buttons')}>
        <Button effect={setAvatar}>Применить</Button>
      </div>
    </Modal>
  );
};

Avatars.propTypes = propTypes;
Avatars.defaultProps = defaultProps;

export default Avatars;
