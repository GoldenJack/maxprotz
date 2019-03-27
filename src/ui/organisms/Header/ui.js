import React, { useState, Fragment } from 'react';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Logo from 'atoms/Logo';
import Avatar from 'atoms/Avatar';
import Wrapper from 'atoms/Wrapper';
import Client from 'molecules/Client';

const cn = bemHelper('header');

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div {...cn()}>
      <Wrapper mix={cn('wrapper').className}>
        <Fragment>
          <Logo mix={cn('logo').className} />
          <Avatar mix={cn('user').className} size="default" onClick={() => setVisible(!visible)} />
          <Client visible={visible} />
        </Fragment>
      </Wrapper>
    </div>
  );
};

export default Header;
