import React from 'react';
import T from 'prop-types';
import bemHelper from 'utils/bem-helper';
import './style.scss';

const cn = bemHelper('novetly');

const propTypes = {
  title: T.string.isRequired,
  description: T.string.isRequired,
  originalUrl: T.string.isRequired,
  imageUrl: T.string
};

const defaultProps = {
  imageUrl: ''
};

const Novetly = ({
  title,
  description,
  originalUrl,
  imageUrl
}) => {
  return (
    <div {...cn()}>
      <h3 {...cn('title')}>{title}</h3>
      <img {...cn('image')} src={imageUrl} alt="/" />
      <p {...cn('description')}>{description}</p>
      <a
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        {...cn('original-url')}
      >
        Оригинальный источник
      </a>
    </div>
  );
};

Novetly.propTypes = propTypes;
Novetly.defaultProps = defaultProps;

export default Novetly;
