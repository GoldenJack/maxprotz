import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('novetly');

const propTypes = {
  mix: T.string,
  title: T.string.isRequired,
  shortDescription: T.string.isRequired,
  originalUrl: T.string.isRequired,
  imageUrl: T.string
};

const defaultProps = {
  mix: '',
  imageUrl: ''
};

const Novetly = ({
  mix,
  title,
  shortDescription,
  imageUrl
}) => {
  return (
    <div className={mix}>
      <div {...cn()}>
        <div {...cn('image-wrap')}>
          <img {...cn('image')} src={imageUrl} alt="/" />
        </div>
        <div {...cn('data')}>
          <h3 {...cn('title')}>{title}</h3>
          {/* eslint-disable-next-line react/no-danger */}
          <p {...cn('description')} dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </div>
      </div>
    </div>
  );
};

Novetly.propTypes = propTypes;
Novetly.defaultProps = defaultProps;

export default Novetly;
