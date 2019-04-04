import React, { useState } from 'react';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Modal from 'molecules/Modal';
import Auth from 'organisms/Auth';

const cn = bemHelper('login');


const Login = ({
  history
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [testUserData, setTestUserData] = useState({});
  const toggleVisible = () => setVisibleModal(!visibleModal);

  return (
    <div {...cn()}>
      <Auth history={history} toggleVisible={toggleVisible} testUserData={testUserData} />
      <Modal mix={cn('modal').className} visible={visibleModal}>
        <h6 {...cn('attention')}>Регистрация невозможна, используйте следующий данные для входа (можно кликать по данным):</h6>
        <div
          {...cn('auth-data')}
          title="Кликните по области для автозаполнения формы"
          onClick={() => setTestUserData({ login: 'admin', password: '12345' })}
          role="none"
        >
          <p {...cn('label')}>Логин: <span {...cn('value')}>admin</span></p>
          <p {...cn('label')}>Пароль: <span {...cn('value')}>12345</span></p>
        </div>
        <div
          {...cn('auth-data')}
          title="Кликните по области для автозаполнения формы"
          onClick={() => setTestUserData({ login: 'root', password: '123' })}
          role="none"
        >
          <p {...cn('label')}>Логин: <span {...cn('value')}>root</span></p>
          <p {...cn('label')}>Пароль: <span {...cn('value')}>123</span></p>
        </div>
        <span onClick={toggleVisible} role="none">Click</span>
      </Modal>
    </div>
  );
};

export default Login;
