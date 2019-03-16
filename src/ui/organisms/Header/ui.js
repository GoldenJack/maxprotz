import React, { Fragment } from 'react';
// import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Logo from 'atoms/Logo';
import Avatar from 'atoms/Avatar';
import Wrapper from 'atoms/Wrapper';

const cn = bemHelper('header');

const Header = () => {
  return (
    <div {...cn()}>
      <Wrapper mix={cn('wrapper').className}>
        <Fragment>
          <Logo mix={cn('logo').className} />

          <Avatar mix={cn('user').className} size="default" />
        </Fragment>
      </Wrapper>
    </div>
  );
};

export default Header;
