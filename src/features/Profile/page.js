import React, { useContext, useState, useEffect } from 'react';
import { Authorization } from 'context';
import { useAnimation } from 'hooks';
import { withValidate } from 'HOC';
import { _required } from 'utils/validate';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Avatar from 'atoms/Avatar';
import Wrapper from 'atoms/Wrapper';
import Button from 'atoms/Button';
import FieldView from 'molecules/FieldView';
import Form from 'molecules/Form';

const cn = bemHelper('profile');

const validateFields = {
  login: [_required],
  firstName: [_required],
  lastName: [_required],
  gender: [_required],
  city: [_required],
  birthday: [_required]
};

const stateFields = {
  login: '',
  firstName: '',
  lastName: '',
  gender: '',
  city: '',
  birthday: ''
};

const Profile = ({
  fields,
  onFieldChange,
  handleSubmit,
  updateAllFields,
  errors
}) => {
  const [edit, setEdit] = useState(false);
  const { currentUser, updateUserProfile } = useContext(Authorization);
  const animation = useAnimation({
    opening: true
  });

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    userFromLocalStorage && updateAllFields(userFromLocalStorage);
  }, [updateAllFields]);

  const onSubmit = () => {
    updateUserProfile(fields);
    setEdit(false);
    localStorage.setItem('user', JSON.stringify(fields));
  };

  return (
    <Wrapper>
      <div {...cn('', animation)}>
        <div {...cn('head')}>
          <div {...cn('avatar-wrapper')}>
            <Avatar size="large" mix={cn('avatar').className} avatar={currentUser.avatar} />
          </div>
        </div>
        <div {...cn('body')}>
          <div {...cn('edit')} onClick={() => setEdit(!edit)} role="none">
            <img {...cn('edit-icon')} src="img/edit.svg" alt="/" />
            <span {...cn('edit-text')}>{!edit ? 'Редактировать' : 'Отмена'}</span>
          </div>
          <Form mix={cn('form').className} onSubmit={handleSubmit(onSubmit)}>
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Логин"
              name="login"
              value={fields.login}
              error={errors.login}
              onChange={onFieldChange}
            />
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Имя"
              name="firstName"
              value={fields.firstName}
              error={errors.firstName}
              onChange={onFieldChange}
            />
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Фамилия"
              name="lastName"
              value={fields.lastName}
              error={errors.lastName}
              onChange={onFieldChange}
            />
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Пол"
              name="gender"
              value={fields.gender}
              error={errors.gender}
              onChange={onFieldChange}
            />
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Город"
              name="city"
              value={fields.city}
              error={errors.city}
              onChange={onFieldChange}
            />
            <FieldView
              mix={cn('field-view').className}
              edit={edit}
              label="Рождение"
              name="birthday"
              value={fields.birthday}
              error={errors.birthday}
              onChange={onFieldChange}
            />
            <div {...cn('buttons')}>
              {edit && <Button mix={cn('button').className} type="submit">Сохранить</Button>}
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default withValidate(Profile, { stateFields, validateFields });
