import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('banner');

const propTypes = {
  mix: T.string.isRequired,
  image: T.string.isRequired,
  title: T.string.isRequired,
};

const Banner = ({
  mix,
  title,
  image
}) => (
  <div {...cn('', '', mix)} style={{ backgroundImage: `url(${image})` }}>
    <span {...cn('overlay')} />
    <h2 {...cn('caption')}>{ title }</h2>
  </div>
);

Banner.propTypes = propTypes;

export default Banner;
