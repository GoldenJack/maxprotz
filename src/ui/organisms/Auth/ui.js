import React, { useEffect, useState } from 'react';
import { user as userData } from 'data/user';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';

const cn = bemHelper('auth');

const propTypes = {
  mix: T.string
};

const defaultProps = {
  mix: ''
};

const logins = userData.map(({ login }) => login);
const passwords = userData.map(({ password }) => password);

// const configFields = {
//   login: { required: true, match: logins, matchMsg: 'Пользователь с таким именем не найден' },
//   password: { required: true, match: passwords },
// };

const Auth = ({
  mix,
  history
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [animation, setAnimation] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (!login && !password) return setErrors({ login: 'Обязательное', password: 'Обязательное' });
    if (login !== userData.login) return setErrors({ login: 'Пользователя с таким именем не существует' });
    if (password !== userData.password) return setErrors({ password: 'Неверный пароль' });
    localStorage.setItem('user', JSON.stringify({ login, password }));
    history.push('/');
  };

  useEffect(() => {
    setAnimation('has-error');
  }, [errors]);

  useEffect(() => {
    setTimeout(() => setAnimation(''), 1000);
  }, [animation]);

  return (
    <div {...cn('', !!errors && animation, mix)}>
      <legend {...cn('caption')}>Авторизация</legend>
      <form {...cn('form')} onSubmit={onSubmit}>
        <Input
          label="Имя пользователя"
          mix={cn('input').className}
          type="text"
          value={login}
          error={errors.login}
          onChange={setLogin}
        />
        <Input
          label="Пароль"
          mix={cn('input').className}
          type="password"
          value={password}
          error={errors.password}
          onChange={setPassword}
        />
        <button type="submit" {...cn('submit')}>Продолжить</button>
        <p {...cn('notation')}>Если у вас еще нет аккаунта, вы <span>можете завести новый</span></p>
      </form>
    </div>
  );
};

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

export default Auth;
