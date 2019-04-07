import React, { Fragment } from 'react';
import T from 'prop-types';
import { useNovetly, useAnimation } from 'hooks';
import { Link } from 'react-router-dom';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Wrapper from 'atoms/Wrapper';
import Banner from './ui/atoms/Banner';

const cn = bemHelper('novetly-page');

const propTypes = {
  match: T.object.isRequired
};

const Novetly = ({
  match: { params: { id } }
}) => {
  const { novetly: { title, imageUrl, description } } = useNovetly(id);
  const animation = useAnimation({
    opening: true
  });

  return (
    <Fragment>
      <Banner mix={cn('banner').className} title={title} image={imageUrl} />
      <Wrapper mix={cn('wrapper').className}>
        <Link to="/" {...cn('back-link')}>
          <img {...cn('back-icon')} src="img/back.svg" alt="/" />
          <span {...cn('back-text')}>Вернуться к новостям</span>
        </Link>
        <div {...cn('', animation)}>
          <img {...cn('image')} src={imageUrl} alt="/" align="left" />
          {/* eslint-disable-next-line react/no-danger */}
          <div {...cn('description')} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </Wrapper>
    </Fragment>
  );
};

Novetly.propTypes = propTypes;

export default Novetly;
