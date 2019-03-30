import React from 'react';
import { withValidate } from 'HOC';
import { user as userData } from 'data/user';
import { _required, _match } from 'utils/validate';
import { isEmpty } from 'utils/helper';
import { useAnimation } from 'hooks';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';
import Form from 'molecules/Form';

const cn = bemHelper('auth');

const propTypes = {
  mix: T.string
};

const defaultProps = {
  mix: ''
};

const logins = userData.map(({ login }) => login);
const passwords = userData.map(({ password }) => password);

const validateFields = {
  login: [_required, _match(logins, 'Пользователь с таким именем не найден')],
  password: [_required, _match(passwords, 'Неверный пароль')]
};

const stateFields = {
  login: '',
  password: ''
};

const Auth = ({
  mix,
  history,
  fields,
  onFieldChange,
  handleSubmit,
  errors
}) => {
  const animation = useAnimation({
    opening: true,
    error: !isEmpty(errors)
  });

  console.log('animation: =>>>', animation)

  const onSubmit = () => {
    localStorage.setItem('user', JSON.stringify({
      login: fields.login,
      password: fields.password
    }));
    history.push('/');
  };

  return (
    <div {...cn('', animation, mix)}>
      <legend {...cn('caption')}>Авторизация</legend>
      <Form mix={cn('form').className} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Имя пользователя"
          mix={cn('input').className}
          type="text"
          value={fields.login}
          error={errors.login}
          onChange={onFieldChange('login')}
        />
        <Input
          label="Пароль"
          mix={cn('input').className}
          type="password"
          value={fields.password}
          error={errors.password}
          onChange={onFieldChange('password')}
        />
        <button type="submit" {...cn('submit')}>Продолжить</button>
        <p {...cn('notation')}>Если у вас еще нет аккаунта, вы <span>можете завести новый</span></p>
      </Form>
    </div>
  );
};

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

export default withValidate(Auth, { stateFields, validateFields });
