import React, { useEffect, useContext } from 'react';
import { withValidate } from 'HOC';
import { _required } from 'utils/validate';
import { isEmpty } from 'utils/helper';
import { useAnimation } from 'hooks';
import { Authorization } from 'context';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Form from 'molecules/Form';

const cn = bemHelper('auth');

const propTypes = {
  mix: T.string,
  history: T.object.isRequired,
  fields: T.object.isRequired,
  onFieldChange: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  pushErrorsFromServer: T.func.isRequired,
  updateAllFields: T.func.isRequired,
  errors: T.object.isRequired,
  toggleVisible: T.func.isRequired,
  testUserData: T.object.isRequired
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
  updateAllFields,
  errors,
  toggleVisible,
  testUserData
}) => {
  const { validateAuthUser, setCurrentUser } = useContext(Authorization);

  const animation = useAnimation({
    opening: true,
    error: !isEmpty(errors)
  });

  useEffect(() => {
    updateAllFields(testUserData);
  }, [updateAllFields, testUserData]);

  const onSubmit = () => {
    const immitationFetchRequest = validateAuthUser(fields);
    if (immitationFetchRequest.statusCode !== 200) {
      pushErrorsFromServer(immitationFetchRequest.errors);
    } else {
      setCurrentUser(immitationFetchRequest.body);
      localStorage.setItem('user', JSON.stringify(immitationFetchRequest.body));
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
        <Button type="submit" mix={cn('submit').className}>Продолжить</Button>
        <p {...cn('notation')}>Регистрация недоступна на текущий момент, но вы
          <span onClick={toggleVisible} role="none"> можете использовать демо аккаунты</span>
        </p>
      </Form>
    </div>
  );
};

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

export default withValidate(Auth, { stateFields, validateFields });
