import React from 'react';
import { useUsers } from 'hooks';

import Wrapper from 'atoms/Wrapper';


const Profile = () => {
  // console.log(getUserProfile())
  // console.log(getUserProfile(JSON.parse(localStorage.getItem('user'))).login)
  return (
    <Wrapper>
      <div>Profile</div>
    </Wrapper>
  );
};

export default Profile;