import React, { useState, useEffect } from 'react';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Avatar from 'atoms/Avatar';
import Button from 'atoms/Button';
import Modal from 'molecules/Modal';

const cn = bemHelper('avatars');

const Avatars = ({
  visible,
  onClose
}) => {
  const [currentAvatar, setCurrentAvatar] = useState('');

  const avatarsOptions = [
    'img/avatars/3d.png',
    'img/avatars/avatar.png',
    'img/avatars/cat.png',
    'img/avatars/dj.png',
    'img/avatars/gangster.png',
  ];

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    setCurrentAvatar(userFromLocalStorage.avatar);
  }, []);

  const setAvatar = () => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...userFromLocalStorage, avatar: currentAvatar }));
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

export default Avatars;