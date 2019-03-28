import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
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
  id,
  title,
  shortDescription,
  originalUrl,
  imageUrl
}) => {
  return (
    <div className={mix}>
      <div {...cn()}>
        <div {...cn('image-wrap')}>
          <img {...cn('image')} src={imageUrl} alt="/" />
          <span {...cn('wrap-original')}>
            <a
              {...cn('link-original')}
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Перейти к оригиналу
            </a>
          </span>
        </div>
        <div {...cn('data')}>
          <Link to={`/news/${id}`} {...cn('title')}>{title}</Link>
          <p {...cn('description')}>{ shortDescription }</p>
        </div>
      </div>
    </div>
  );
};

Novetly.propTypes = propTypes;
Novetly.defaultProps = defaultProps;

export default Novetly;
