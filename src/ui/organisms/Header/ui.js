import React, { useState, Fragment, useContext } from 'react';
import { Authorization } from 'context';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Logo from 'atoms/Logo';
import Avatar from 'atoms/Avatar';
import Wrapper from 'atoms/Wrapper';
import Client from 'molecules/Client';

const cn = bemHelper('header');

const Header = () => {
  const [visible, setVisible] = useState(null);
  const { currentUser } = useContext(Authorization);

  return (
    <div {...cn()}>
      <Wrapper mix={cn('wrapper').className}>
        <Fragment>
          <Logo mix={cn('logo').className} />
          <Avatar
            mix={cn('user').className}
            avatar={currentUser.avatar}
            size="default"
            onClick={() => setVisible(!visible)}
          />
          <Client visible={visible} currentUser={currentUser} />
        </Fragment>
      </Wrapper>
    </div>
  );
};

export default Header;
