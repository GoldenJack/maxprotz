import { useState } from 'react';
import { isEmpty } from 'utils/helper';
import { user as users } from 'data/user';

export const useUsers = () => {
  const [currentUser, setCurrentUser] = useState({});

  // server imitation validation (POST)
  const validateAuthUser = ({ login: loginField, password: passwordField }) => {
    const authUser = users.filter(({ login }) => login === loginField);
    if (isEmpty(authUser)) {
      return {
        statusCode: 404,
        errors: { login: 'Пользователь с таким именем не найден' },
        body: {}
      };
    } else if (authUser[0].password !== passwordField) {
      return {
        statusCode: 404,
        errors: { password: 'Неправильный пароль' },
        body: {}
      };
    } else {
      return {
        statusCode: 200,
        errors: {},
        body: { ...authUser[0] }
      };
    }
  };

  // server imitation update data (PUT)
  const updateUserProfile = newData => {
    setCurrentUser(newData);
  };

  const getUserByName = userName => {
    return users.filter(user => user.login === userName)[0];
  };

  return {
    currentUser,
    getUserByName,
    setCurrentUser,
    validateAuthUser,
    updateUserProfile
  };
};
