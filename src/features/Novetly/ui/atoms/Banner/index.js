import React from 'react';
import T from 'prop-types';
import { useAnimation } from 'hooks';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('banner');

const propTypes = {
  mix: T.string,
  title: T.string,
  image: T.string,
};

const defaultProps = {
  mix: '',
  image: '',
  title: ''
};

const Banner = ({
  mix,
  title,
  image
}) => {
  const animation = useAnimation({
    opening: true
  });
  return (
    <div {...cn('', animation, mix)} style={{ backgroundImage: `url(${image})` }}>
      <span {...cn('overlay')} />
      <h2 {...cn('caption')}>{ title }</h2>
    </div>
  );
};

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
