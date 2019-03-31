import React, { useContext } from 'react';
import { withValidate } from 'HOC';
import { _required } from 'utils/validate';
import { isEmpty } from 'utils/helper';
import { useAnimation } from 'hooks';
import { Authorization } from 'context';
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

const validateFields = {
  login: [_required],
  password: [_required]
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
  pushErrorsFromServer,
  errors
}) => {
  const { validateAuthUser, setCurrentUser } = useContext(Authorization);

  const animation = useAnimation({
    opening: true,
    error: !isEmpty(errors)
  });

  const onSubmit = () => {
    const immitationFetchRequest = validateAuthUser(fields);
    if (immitationFetchRequest.statusCode !== 200) {
      pushErrorsFromServer(immitationFetchRequest.errors);
    } else {
      setCurrentUser(immitationFetchRequest.body);
      localStorage.setItem('user', immitationFetchRequest.body.login);
      history.push('/');
    }
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
