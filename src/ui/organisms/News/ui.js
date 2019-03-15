import React from 'react';
import { news } from 'data/news';
import bemHelper from 'utils/bem-helper';
import './style.scss';

import Wrapper from 'atoms/Wrapper';
import Novetly from 'molecules/Novelty';

const cn = bemHelper('news');

const News = () => {
  return (
    <Wrapper mix={cn('wrapper').className}>
      {news && news.map(novetly => (
        <Novetly mix={cn('novetly').className} key={novetly.title} {...novetly} />
      ))}
    </Wrapper>
  );
};

export default News;
