import { useCallback, useEffect, useState } from 'react';
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

  const getUserByName = userName => {
    return users.filter(user => user.login === userName)[0];
  };

  const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const setUserToLocalStorage = newCurrentUserData => {
    localStorage.setItem('user', JSON.stringify(newCurrentUserData));
  };

  // server imitation update data (PUT)
  const updateUserProfile = useCallback(newCurrentUserData => {
    const auth = getUserFromLocalStorage();
    if (newCurrentUserData) {
      setCurrentUser(newCurrentUserData);
      setUserToLocalStorage(newCurrentUserData);
    } else if (auth) {
      setCurrentUser(auth);
      setUserToLocalStorage(auth);
    } else {
      setCurrentUser({});
    }
  }, []);

  useEffect(() => {
    updateUserProfile();
  }, [updateUserProfile]);

  return {
    currentUser,
    getUserByName,
    setCurrentUser,
    validateAuthUser,
    updateUserProfile,
    getUserFromLocalStorage
  };
};
